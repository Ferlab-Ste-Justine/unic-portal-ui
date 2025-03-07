import { SearchOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';

import { QueryOptions } from '@/types/queries';

import styles from './InputSearch.module.css';

const { Text } = Typography;

const InputSearch = ({
  searchFields,
  handleSetVariables,
  variables,
  title,
  placeholder,
}: {
  searchFields: string[];
  handleSetVariables: any;
  variables: QueryOptions;
  title: string;
  placeholder: string;
}) => {
  const [search, setSearch] = useState('');

  const handleSearch = (_search: string) => {
    /** add all searchFields as OR with wildcard on */
    const or = _search ? searchFields.map((field) => ({ field, value: `*${_search}*`, useWildcard: true })) : [];
    const _variables = { ...variables, or };
    handleSetVariables(_variables);
  };

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPressEnter = () => {
    debouncedHandleSearch.cancel(); // Cancel debounce on Enter
    handleSearch(search);
  };

  useEffect(() => {
    const charsCount = search.length;
    const hasSearchInVariables = variables?.or?.some(({ field }) => searchFields.includes(field));
    /** According to analyse, trigger search only with 3 chars (or 0 to reset) and after 500ms */
    if ((charsCount === 0 && hasSearchInVariables) || charsCount > 2) {
      debouncedHandleSearch(search);
    }
    return () => {
      debouncedHandleSearch.cancel(); // Clear pending debounce on unmount or rerender
    };
    /** Need to skip deps but search to avoid loop */
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /** Reset search when variables are cleared by parent */
  useEffect(() => {
    if (!variables?.orGroups?.length && !variables?.match?.length && !variables?.or?.length) {
      setSearch('');
    }
  }, [variables]);

  return (
    <div className={styles.filter}>
      <Text className={styles.title}>{title}</Text>
      <Input
        placeholder={placeholder}
        onChange={onChangeSearch}
        onPressEnter={onPressEnter}
        suffix={<SearchOutlined className={styles.icon} />}
        allowClear
        value={search}
      />
    </div>
  );
};

export default InputSearch;
