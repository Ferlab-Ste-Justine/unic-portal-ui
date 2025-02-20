import { Select, SelectProps, Tag, Typography } from 'antd';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useState } from 'react';

import { QueryOptions } from '@/types/queries';
import getTagColorByType from '@/utils/getTagColorByType';

import styles from './InputSelect.module.css';
const { Text } = Typography;

const InputSelect = ({
  options = [],
  selectField,
  title,
  placeholder,
  handleSetVariables,
  variables,
}: {
  options: SelectProps['options'];
  selectField: string;
  title: string;
  placeholder: string;
  handleSetVariables: any;
  variables: QueryOptions;
}) => {
  const [selects, setSelects] = useState<string[]>([]);

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={getTagColorByType(value)}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const onChangeSelect = (selects: string[]) => {
    setSelects(selects);
    handleSelect(selects);
  };

  const handleSelect = (selects: string[]) => {
    /** add all selects fields as OR */
    const or = selects?.length ? selects.map((value) => ({ field: selectField, value })) : undefined;
    const variables = { or };
    handleSetVariables(variables);
  };

  /** reset selects when variables is reset by parent component fn handleClearFilters */
  useEffect(() => {
    if (!variables?.or?.length) {
      setSelects([]);
    }
  }, [variables]);

  return (
    <div className={styles.filter}>
      <Text className={styles.title}>{title}</Text>
      <Select
        mode='multiple'
        placeholder={placeholder}
        onChange={onChangeSelect}
        options={options}
        allowClear
        showArrow
        tagRender={tagRender}
        value={selects}
      />
    </div>
  );
};

export default InputSelect;
