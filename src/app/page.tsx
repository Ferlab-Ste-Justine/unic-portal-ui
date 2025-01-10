'use client';
import SubmissionPage from '@/components/SubmissionPage';
import { useLang } from '@/store/global';

const RootPage = () => {
  //TODO: understand why we need to force useLang to be reloaded here because its already done in provider
  useLang();
  return <SubmissionPage />;
};

export default RootPage;
