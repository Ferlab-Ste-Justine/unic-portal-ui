'use client';
import { useParams, useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';

const useHash = () => {
  const router = useRouter();
  const params = useParams();
  const getCurrentHash = useMemo(
    () => () => (typeof window !== 'undefined' ? window.location.hash.replace(/^#!?/, '') : ''),
    [],
  );
  const [hash, _setHash] = useState<string>(getCurrentHash());

  const setHash = (newHash: string) => {
    let updatedUrl = window.location.href;
    updatedUrl = queryString.stringifyUrl({ url: updatedUrl.split('#')[0], fragmentIdentifier: newHash });

    _setHash(newHash);
    router.replace(updatedUrl);
  };

  useEffect(() => {
    const currentHash = getCurrentHash();
    _setHash(currentHash);
  }, [getCurrentHash, params]);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = getCurrentHash();
      _setHash(currentHash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [getCurrentHash]);

  return { hash, setHash };
};

export default useHash;
