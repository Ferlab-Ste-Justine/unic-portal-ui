import { Select, SelectProps, Tag, Typography } from 'antd';
import queryString from 'query-string';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useState } from 'react';

import useHash from '@/lib/hooks/useHash';
import { QueryOptions } from '@/types/queries';
import getTagColorByType from '@/utils/getTagColorByType';

import styles from './InputSelect.module.css';

const { Text } = Typography;
const { Option } = Select;

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
  currentTabKey,
}: {
  operator: 'match' | 'or' | 'orGroups';
  options: SelectProps['options'];
  selectField: string;
  title: string;
  placeholder: string;
  handleSetVariables: any;
  variables: QueryOptions;
  mode?: SelectProps['mode'];
  showSearch?: boolean;
  currentTabKey?: string;
}) => {
  const [selects, setSelects] = useState<string[]>([]);
  const { hash, setHash } = useHash();
  const tabFromHash = hash.split('?')?.[0]; // query params if present
  const isDisplayOnTab = tabFromHash === currentTabKey;
  const hashParams = hash.split('?')[1];

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
        className={styles.tag}
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
    const values = selects?.length ? selects.map((value) => ({ field: selectField, value })) : [];
    /** Keep the fields that are not the same as the selectField to replace only the ones that are by new Values */

    let operatorVariables = [];
    if (operator === 'orGroups') {
      const otherFieldsOnOperator =
        variables?.[operator]?.filter((group) => {
          const isCurrentFieldGroup = group.some((element) => element.field === selectField);
          return !isCurrentFieldGroup;
        }) || [];
      operatorVariables = values?.length ? [...otherFieldsOnOperator, values] : otherFieldsOnOperator;
    } else {
      const otherFieldsOnOperator = variables?.[operator]?.filter((element) => element.field !== selectField) || [];
      operatorVariables = [...otherFieldsOnOperator, ...values];
    }

    /** update variables current operator and keep others */
    const _variables = {
      ...variables,
      [operator]: operatorVariables,
    };
    handleSetVariables(_variables, [selectField]);
  };

  /** Reset selects when variables are cleared by parent */
  useEffect(() => {
    if (!variables?.or?.length && !variables?.match?.length && !variables?.orGroups?.length) {
      setSelects([]);
    }
  }, [variables]);

  /** useEffect to handle filter selections from the URL */
  useEffect(() => {
    /** isDisplayOnTab is used to only apply filters on the wanted tab */
    if (hashParams && isDisplayOnTab) {
      const hashParamsObj = queryString.parse(hashParams) as Record<string, string | string[]>;
      /** Convert the parsed values into an array of selected filters:
       * "resource.rs_name=viewpoint&table.tab_name=accounts" into an object:
       * { "resource.rs_name": "viewpoint", "table.tab_name": "accounts" }
       */
      Object.entries(hashParamsObj).forEach(([key, value]) => {
        if (key === selectField) {
          selects.push(...(Array.isArray(value) ? value : [value]));
        }
      });
      setSelects(selects);
      handleSelect(selects);
      setHash('');
    }
    /** need to keep handleSelect out of dependencies */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashParams, selectField]);

  return (
    <div className={styles.filter}>
      <Text className={styles.title}>{title}</Text>
      <Select
        showSearch={showSearch}
        mode={mode}
        placeholder={placeholder}
        onChange={onChangeSelect}
        options={mode === 'tags' ? undefined : options}
        allowClear
        showArrow={(mode === 'multiple' || mode === 'tags') && !selects?.length}
        tagRender={tagRender}
        value={selects}
      >
        {options?.map(({ value, label }) => (
          <Option key={value} value={value} label={label}>
            <Tag color={getTagColorByType(value as string, 'var(--blue-8)')}>{label}</Tag>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default InputSelect;
