import ProLabel from '@ferlab/ui/core/components/ProLabel';
import { Alert, Col, Form, Input, Row, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import { useUser } from '@/store/user';
import { updateUser } from '@/store/user/thunks';

import BaseCard from '../BaseCard';
import BaseForm from '../BaseForm';
import styles from './index.module.css';
import ProfileImageUpload from './ProfileImageUpload';

export const LINKEDIN_REGEX = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)\/*/iu;

enum FORM_FIELDS {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  TITLE = 'title',
  AFFILIATION = 'affiliation',
  EMAIL = 'email',
  LINKEDIN = 'linkedin',
}

const initialChangedValues = {
  [FORM_FIELDS.FIRST_NAME]: false,
  [FORM_FIELDS.LAST_NAME]: false,
  [FORM_FIELDS.TITLE]: false,
  [FORM_FIELDS.AFFILIATION]: false,
  [FORM_FIELDS.EMAIL]: false,
  [FORM_FIELDS.LINKEDIN]: false,
};

const IdentificationCard = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { user } = useAuth();
  const [hasChanged, setHasChanged] = useState<Record<FORM_FIELDS, boolean>>(initialChangedValues);
  const initialValues = useRef<Record<FORM_FIELDS, any>>();

  console.log('userInfo==', userInfo);

  const isValueChanged = () => Object.values(hasChanged).some((val) => val);

  const onDiscardChanges = () => {
    setHasChanged(initialChangedValues);
    form.setFieldsValue(initialValues.current);
  };

  const token: { identity_provider: string } = jwtDecode(user?.accessToken || '');
  const provider = token?.identity_provider || '';
  const providerCapitalized = `${provider?.charAt(0)?.toUpperCase()}${provider?.slice(1)}`;
  const email = userInfo?.email;

  // @ts-expect-error - unknown action
  const onFinish = (values) => dispatch(updateUser({ data: values, displayNotification: true }));

  useEffect(() => {
    initialValues.current = {
      [FORM_FIELDS.FIRST_NAME]: userInfo?.first_name,
      [FORM_FIELDS.LAST_NAME]: userInfo?.last_name,
      [FORM_FIELDS.TITLE]: userInfo?.title,
      [FORM_FIELDS.AFFILIATION]: userInfo?.affiliation,
      [FORM_FIELDS.EMAIL]: userInfo?.email,
      [FORM_FIELDS.LINKEDIN]: userInfo?.linkedin,
    };
    form.setFieldsValue(initialValues.current);
    setHasChanged(initialChangedValues);
  }, [form, userInfo]);

  return (
    <BaseCard
      form={form}
      title={intl.get('screen.profileSettings.cards.identification.title')}
      isValueChanged={isValueChanged()}
      onDiscardChanges={onDiscardChanges}
    >
      <Space size={24} direction='vertical' className={styles.identificationCardContent}>
        <Alert
          showIcon
          type='info'
          message={intl.getHTML('screen.profileSettings.cards.identification.alert', {
            provider: providerCapitalized,
            email,
          })}
        />
        <Row gutter={24}>
          <Col span={16}>
            <BaseForm
              form={form}
              initialValues={initialValues}
              hasChangedInitialValue={hasChanged}
              onHasChanged={setHasChanged}
              onFinish={onFinish}
            >
              <Form.Item
                name={FORM_FIELDS.FIRST_NAME}
                label={<ProLabel title={intl.get('screen.profileSettings.cards.identification.firstName')} />}
                rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
                required={false}
              >
                <Input placeholder={intl.get('screen.profileSettings.cards.identification.yourFirstName')}></Input>
              </Form.Item>
              <Form.Item
                name={FORM_FIELDS.LAST_NAME}
                label={<ProLabel title={intl.get('screen.profileSettings.cards.identification.lastName')} />}
                rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
                required={false}
              >
                <Input placeholder={intl.get('screen.profileSettings.cards.identification.yourLastName')}></Input>
              </Form.Item>

              <Form.Item
                name={FORM_FIELDS.TITLE}
                label={<ProLabel title={intl.get('screen.profileSettings.cards.identification.title2')} />}
                rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
                required={false}
                requiredMark='optional'
              >
                <Input placeholder={intl.get('screen.profileSettings.cards.identification.yourTitle')}></Input>
              </Form.Item>
              <Form.Item
                name={FORM_FIELDS.AFFILIATION}
                label={<ProLabel title={intl.get('screen.profileSettings.cards.identification.institution')} />}
                rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
                required={false}
              >
                <Input placeholder={intl.get('screen.profileSettings.cards.identification.yourInstitution')}></Input>
              </Form.Item>
              <Form.Item
                name={FORM_FIELDS.EMAIL}
                label={<ProLabel title={intl.get('screen.profileSettings.cards.identification.institutionEmail')} />}
                rules={[{ required: true, type: 'string', validateTrigger: 'onSubmit' }]}
                required={false}
              >
                <Input
                  placeholder={intl.get('screen.profileSettings.cards.identification.yourInstitutionEmail')}
                ></Input>
              </Form.Item>

              <Form.Item
                className='noMargin'
                name={FORM_FIELDS.LINKEDIN}
                label={<ProLabel title='LinkedIn' />}
                rules={[
                  {
                    validateTrigger: 'onSubmit',
                    pattern: LINKEDIN_REGEX,
                    message: intl.get('screen.profileSettings.cards.identification.linkedinUrl'),
                  },
                ]}
                required={false}
                requiredMark='optional'
              >
                <Input placeholder='https://www.linkedin.com/in/username'></Input>
              </Form.Item>
            </BaseForm>
          </Col>
          <Col span={8} className={styles.profileImageCol}>
            <ProfileImageUpload />
          </Col>
        </Row>
      </Space>
    </BaseCard>
  );
};

export default IdentificationCard;
