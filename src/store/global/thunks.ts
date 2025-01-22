import { createAsyncThunk } from '@reduxjs/toolkit';

import { DataApi } from '@/services/data-api';
import { RootState } from '@/store/types';

import { IStatistics } from './types';

const fetchStats = createAsyncThunk<IStatistics, void, { rejectValue: string; state: RootState }>(
  'data/fetch/stats',
  async () => {
    const { data } = await DataApi.fetchStats();

    return data!;
  },
  {
    condition: (_, { getState }) => {
      const { global } = getState();

      return global.stats === undefined;
    },
  },
);

export { fetchStats };
