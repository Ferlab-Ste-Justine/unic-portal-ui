'use client';
import { useLang } from '@/store/global';

const RootPage = () => {
  //TODO: understand why we need to force useLang to be reloaded here because its already done in provider
  useLang();
  return (
    <div>
      <h1>Hello world</h1>
      <p>This is the root page</p>
    </div>
  );
};

export default RootPage;
