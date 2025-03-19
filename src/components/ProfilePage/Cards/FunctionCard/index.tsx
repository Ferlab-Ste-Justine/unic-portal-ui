import { Checkbox, Form, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useUser } from '@/store/user';
import { updateUser } from '@/store/user/thunks';
import { IOption } from '@/store/user/types';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import formStyles from '../form.module.css';
import { sortOptionsLabelsByName } from '../utils';

enum FORM_FIELDS {
  ROLES = 'roles',
}

const initialChangedValues = {
  [FORM_FIELDS.ROLES]: false,
};

const FunctionCard = ({ roleOptions = [] }: { roleOptions: IOption[] }) => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  const roleOptionsSorted = sortOptionsLabelsByName(roleOptions, 'roleAffiliation');

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.ROLES]: userInfo?.roles || [],
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, roleOptions, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.roleAffiliation.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const roles = values[FORM_FIELDS.ROLES];
          // @ts-expect-error - unknown action
          dispatch(updateUser({ data: { roles } }));
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.ROLES}
          label={intl.get('screen.profileSettings.cards.roleAffiliation.iama')}
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>{intl.get('screen.profileSettings.cards.checkAll')}</span>
            <Space direction='vertical'>
              {roleOptionsSorted.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default FunctionCard;
