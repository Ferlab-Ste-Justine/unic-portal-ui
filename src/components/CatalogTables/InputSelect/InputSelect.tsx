import { Select, SelectProps, Tag, Typography } from 'antd';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useGlobals } from '@/store/global';
import { globalActions } from '@/store/global';
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
  currentTabKey: string;
}) => {
  const dispatch = useDispatch();
  const global = useGlobals();
  const selects = useMemo(
    () => global.filters.find((filter) => filter.key === selectField && filter.tabKey === currentTabKey)?.values || [],
    [currentTabKey, global.filters, selectField],
  );

  const setSelects = useCallback(
    (selects: string[]) => {
      const otherFilters = global.filters.filter(
        (filter) => filter.tabKey !== currentTabKey && filter.key !== selectField,
      );
      const newFilters = [...otherFilters, { key: selectField, values: selects, tabKey: currentTabKey }];
      dispatch(globalActions.setFilters(newFilters));
    },
    [currentTabKey, dispatch, global.filters, selectField],
  );

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
    } else {
      setSelects(selects ? [selects] : []);
    }
  };

  const handleSelect = useCallback((selects: string[]) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** call handleSelect when selects changes */
  useEffect(() => {
    handleSelect(selects);
  }, [handleSelect, selects]);

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
