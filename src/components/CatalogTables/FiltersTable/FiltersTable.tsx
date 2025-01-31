import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, SelectProps, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import { MatchOption, OrOption, QueryOptions } from '@/types/queries';

import styles from './FiltersTable.module.css';

const { Text } = Typography;

const FiltersTable = ({
  options = [],
  search_fields,
  refetch,
  variables,
  selectField,
}: {
  options: SelectProps['options'];
  search_fields: string[];
  refetch: any;
  variables: QueryOptions;
  selectField: string;
}) => {
  const [search, setSearch] = useState('');
  const [match, setMatch] = useState<MatchOption[]>();
  const [or, setOr] = useState<OrOption[]>();
  const [selects, setSelects] = useState<string[] | undefined>();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charsCount = e.target.value.length;
    /** According to analyse, trigger search only with 3 chars (or 0 to reset) */
    if (charsCount === 0 || charsCount > 2) {
      setSearch(e.target.value);
    }
  };
  const onKeyUpSearch = (e: any) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };
  const onChangeSelect = (values: string[]) => {
    setSelects(values);
  };

  //TODO: fix the combined filters: match with or
  useEffect(() => {
    /** add all selects fields as AND match */
    const or = selects?.length
      ? selects.map((value) => ({ field: selectField, value, useFuzzy: true, useWildcard: true }))
      : undefined;
    setOr(or);
  }, [selectField, selects]);

  useEffect(() => {
    /** add all search_fields with ES fuzzy and wildcard */
    const match = search
      ? search_fields.map((field) => ({ field, value: `*${search}*`, useFuzzy: true, useWildcard: true }))
      : undefined;

    setMatch(match);
  }, [search, search_fields]);

  useEffect(() => {
    const _variables = { ...variables, match, or };
    refetch(_variables);
  }, [refetch, match, or, search_fields, variables]);

  return (
    <div className={styles.filtersRow}>
      <div className={styles.filter}>
        <Text>{intl.get('screen.catalog.resources.search')}</Text>
        <Input
          placeholder={intl.get('screen.catalog.resources.searchPlaceholder')}
          onChange={debounce(onChangeSearch, 500)}
          onKeyUp={onKeyUpSearch}
          suffix={<SearchOutlined className={styles.icon} />}
          allowClear
        />
      </div>
      <div className={styles.filter}>
        <Text>{intl.get('screen.catalog.resources.select')}</Text>
        <Select
          mode='multiple'
          placeholder={intl.get('screen.catalog.resources.selectPlaceholder')}
          onChange={onChangeSelect}
          options={options}
          allowClear
        />
      </div>
    </div>
  );
};

export default FiltersTable;
