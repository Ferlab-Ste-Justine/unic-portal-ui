import { SearchOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useState } from 'react';

import { QueryOptions } from '@/types/queries';

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
  handleSetVariables,
  variables,
  title,
  placeholder,
}: {
  search_fields: string[];
  handleSetVariables: any;
  variables: QueryOptions;
  title: string;
  placeholder: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const charsCount = e.target.value.length;
    /** According to analyse, trigger search only with 3 chars (or 0 to reset) */
    if (charsCount === 0 || charsCount > 2) {
      setSearch(e.target.value);
      handleSearch(e.target.value);
    }
  };
  const onKeyUpSearch = (e: any) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
      handleSearch(e.target.value);
    }
  };

  const handleSearch = (_search: string) => {
    /** add all search_fields with ES fuzzy and wildcard */
    const match = _search
      ? search_fields.map((field) => ({ field, value: `*${_search}*`, useFuzzy: true, useWildcard: true }))
      : undefined;

    const _variables = { ...variables, match };

    handleSetVariables(_variables);
  };

  /** reset selects when variables is reset by parent component fn handleClearFilters */
  // useEffect(() => {
  //   if (!variables?.match?.length) {
  //     setSearch('');
  //   }
  // }, [variables]);

  return (
    <div className={styles.filter}>
      <Text className={styles.title}>{title}</Text>
      <Input
        placeholder={placeholder}
        onChange={debounce(onChangeSearch, 500)}
        onKeyUp={onKeyUpSearch}
        suffix={<SearchOutlined className={styles.icon} />}
        allowClear
      />
    </div>
  );
};

export default InputSearch;
