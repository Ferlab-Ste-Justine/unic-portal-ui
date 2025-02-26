import { Select, SelectProps, Tag, Typography } from 'antd';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useState } from 'react';

import { QueryOptions } from '@/types/queries';
import getTagColorByType from '@/utils/getTagColorByType';

import styles from './InputSelect.module.css';
const { Text } = Typography;

const InputSelect = ({
  operator,
  options = [],
  selectField,
  title,
  placeholder,
  handleSetVariables,
  variables,
  mode,
  showSearch = true,
}: {
  operator: 'match' | 'or';
  options: SelectProps['options'];
  selectField: string;
  title: string;
  placeholder: string;
  handleSetVariables: any;
  variables: QueryOptions;
  mode?: SelectProps['mode'];
  showSearch?: boolean;
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
        color={getTagColorByType(value, 'var(--blue-8)')}
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
    if (Array.isArray(selects)) {
      setSelects(selects);
      handleSelect(selects);
    } else {
      setSelects(selects ? [selects] : []);
      handleSelect(selects ? [selects] : []);
    }
  };

  const handleSelect = (selects: string[]) => {
    /** add all selects fields as OR */

    const values = selects?.length ? selects.map((value) => ({ field: selectField, value })) : [];
    /** Keep the fields that are not the same as the selectField to replace only the ones that are by new Values */
    const otherFieldsOnOperator = variables?.[operator]?.filter((element) => element.field !== selectField) || [];

    const _variables = {
      ...variables,
      [operator]: [...otherFieldsOnOperator, ...values],
    };
    handleSetVariables(_variables);
  };

  /** reset selects when variables is reset by parent component fn handleClearFilters */
  useEffect(() => {
    if (!variables?.or?.length && !variables?.match?.length) {
      setSelects([]);
    }
  }, [variables]);

  return (
    <div className={styles.filter}>
      <Text className={styles.title}>{title}</Text>
      <Select
        showSearch={showSearch}
        mode={mode}
        placeholder={placeholder}
        onChange={onChangeSelect}
        options={options}
        allowClear
        showArrow={mode === 'multiple'}
        tagRender={tagRender}
        value={selects}
      />
    </div>
  );
};

export default InputSelect;
