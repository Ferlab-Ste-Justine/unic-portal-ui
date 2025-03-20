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
import { hasOtherField, IOption, lowerAll, OTHER_KEY, removeOtherKey, sortOptionsLabelsByName } from '../utils';

enum FORM_FIELDS {
  RESEARCH_DOMAIN = 'research_domain',
  OTHER_RESEARCH_DOMAIN = 'other_research_domain',
}

const initialChangedValues = {
  [FORM_FIELDS.RESEARCH_DOMAIN]: false,
  [FORM_FIELDS.OTHER_RESEARCH_DOMAIN]: false,
};

const ResearchDomainCard = ({ researchDomainOptions }: { researchDomainOptions: IOption[] }) => {
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

  const researchDomainOptionsSorted = sortOptionsLabelsByName(researchDomainOptions, 'researchDomain');

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.RESEARCH_DOMAIN]: hasOtherField(lowerAll(userInfo?.research_domains ?? []), researchDomainOptions)
        .length
        ? [...lowerAll(userInfo?.research_domains ?? []), OTHER_KEY]
        : lowerAll(userInfo?.research_domains ?? []),
      [FORM_FIELDS.OTHER_RESEARCH_DOMAIN]: hasOtherField(userInfo?.research_domains ?? [], researchDomainOptions)[0],
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, researchDomainOptions, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.researchDomain.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <BaseForm
        form={form}
        onHasChanged={setHasChanged}
        initialValues={initialValues}
        hasChangedInitialValue={hasChanged}
        onFinish={(values: any) => {
          const otherField = hasOtherField(values[FORM_FIELDS.RESEARCH_DOMAIN], researchDomainOptions);
          const research_domains = removeOtherKey(
            values[FORM_FIELDS.RESEARCH_DOMAIN].filter((val: string) => !otherField.includes(val)),
            values[FORM_FIELDS.OTHER_RESEARCH_DOMAIN],
          );
          // @ts-expect-error - unknown action
          dispatch(updateUser({ data: { research_domains }, displayNotification: true }));
        }}
      >
        <Form.Item
          className={formStyles.withCustomHelp}
          name={FORM_FIELDS.RESEARCH_DOMAIN}
          label={intl.get('screen.profileSettings.cards.researchDomain.label')}
          required={false}
          rules={[{ required: true }]}
        >
          <Checkbox.Group className={formStyles.checkBoxGroup}>
            <span className={formStyles.help}>{intl.get('screen.profileSettings.cards.checkAll')}</span>
            <Space direction='vertical'>
              {researchDomainOptionsSorted.map((option) => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
              <Checkbox value={'other'}>{intl.get('screen.profileSettings.cards.researchDomain.other')}</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues[FORM_FIELDS.RESEARCH_DOMAIN] !== currentValues[FORM_FIELDS.RESEARCH_DOMAIN]
          }
        >
          {({ getFieldValue }) =>
            getFieldValue(FORM_FIELDS.RESEARCH_DOMAIN)?.includes(OTHER_KEY) && (
              <Form.Item
                className={formStyles.dynamicField}
                name={FORM_FIELDS.OTHER_RESEARCH_DOMAIN}
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

export default ResearchDomainCard;
