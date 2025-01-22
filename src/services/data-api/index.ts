import config from '@/config';
import { sendRequest } from '@/lib/axios';
import { IStatistics } from '@/store/global/types';

const { DATA_API_URL } = config;

const fetchStats = () =>
  sendRequest<IStatistics>({
    method: 'GET',
    url: `${DATA_API_URL}/stats`,
  });

export const DataApi = {
  fetchStats,
};
