import { SearchOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import { MatchOption, QueryOptions } from '@/types/queries';

import styles from './InputSearch.module.css';

const { Text } = Typography;

//TODO: FREE SEARCH IS FOR UNICWEB-36
// const search_fields = [
//   'rs_code',
//   'rs_description_en',
//   'rs_description_fr',
//   'rs_name',
//   'rs_project_pi',
//   'rs_projet_erb',
//   'rs_title',
// ];
const InputSearch = ({
  search_fields,
  refetch,
  variables,
}: {
  search_fields: string[];
  refetch: any;
  variables: QueryOptions;
}) => {
  const [search, setSearch] = useState('');
  const [match, setMatch] = useState<MatchOption[]>();

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

  useEffect(() => {
    /** add all search_fields with ES fuzzy and wildcard */
    const match = search
      ? search_fields.map((field) => ({ field, value: `*${search}*`, useFuzzy: true, useWildcard: true }))
      : undefined;

    setMatch(match);
  }, [search, search_fields]);

  useEffect(() => {
    const _variables = { ...variables, match };
    refetch(_variables);
  }, [refetch, match, search_fields, variables]);

  return (
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
  );
};

export default InputSearch;
