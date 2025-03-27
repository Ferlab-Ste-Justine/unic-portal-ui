import { Checkbox, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useUser } from '@/store/user';
import { updateUser } from '@/store/user/thunks';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import formStyles from '../form.module.css';
import { hasOtherField, IOption, lowerAll, OTHER_KEY, removeOtherKey } from '../utils';

enum FORM_FIELDS {
  ROLES = 'roles',
  OTHER_ROLES = 'other_roles',
}

const initialChangedValues = {
  [FORM_FIELDS.ROLES]: false,
  [FORM_FIELDS.OTHER_ROLES]: false,
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

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.ROLES]: hasOtherField(lowerAll(userInfo?.roles ?? []), roleOptions).length
        ? [...lowerAll(userInfo?.roles ?? []), OTHER_KEY]
        : lowerAll(userInfo?.roles ?? []),
      [FORM_FIELDS.OTHER_ROLES]: hasOtherField(userInfo?.roles ?? [], roleOptions)[0],
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
          const otherField = hasOtherField(values[FORM_FIELDS.ROLES], roleOptions);
          const roles = removeOtherKey(
            values[FORM_FIELDS.ROLES].filter((val: string) => !otherField.includes(val)),
            values[FORM_FIELDS.OTHER_ROLES],
          );
          // @ts-expect-error - unknown action
          dispatch(updateUser({ data: { roles }, displayNotification: true }));
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
              {roleOptions.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {intl.get(`screen.profileSettings.cards.roleAffiliation.${option.value}`)}
                </Checkbox>
              ))}
              <Checkbox value={'other'}>{intl.get('screen.profileSettings.cards.roleAffiliation.other')}</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.ROLES] !== currentValues[FORM_FIELDS.ROLES]
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(FORM_FIELDS.ROLES)?.includes(OTHER_KEY) && (
              <Form.Item
                className={formStyles.dynamicField}
                name={FORM_FIELDS.OTHER_ROLES}
                label={intl.get('screen.profileSettings.cards.pleaseDescribe')}
                required={false}
                rules={[{ required: true, validateTrigger: 'onSubmit' }]}
              >
                <Input />
              </Form.Item>
            )
          }
        </Form.Item>
      </BaseForm>
    </BaseCard>
  );
};

export default FunctionCard;
