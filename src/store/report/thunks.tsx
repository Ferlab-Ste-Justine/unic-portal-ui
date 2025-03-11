import { createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import intl from 'react-intl-universal';

import client from '@/lib/graphql/ApolloClient';
import { globalActions } from '@/store/global';
import { QueryOptions } from '@/types/queries';

const showErrorReportNotif = (thunkApi: any) =>
  thunkApi.dispatch(
    globalActions.displayNotification({
      type: 'error',
      message: intl.get('api.report.error.title'),
      description: intl.get('api.report.error.message'),
      duration: 5,
    }),
  );

const downloadTSV = async (data: Record<string, any>[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const tsvRows = data.map((row) => headers.map((header) => String(row[header] ?? '')).join('\t'));

  console.log('downloadTSV data==', data);
  console.log('downloadTSV headers==', headers);

  const tsvContent = [headers.join('\t'), ...tsvRows].join('\n');
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

const fetchAllData = async (GQL_QUERY: any, variables: QueryOptions) => {
  let allData: any[] = [];
  let searchAfter = null;

  do {
    const { data } = await client.query({
      query: GQL_QUERY,
      variables: { ...variables, search_after: searchAfter, size: 10000 },
    });

    const hits = data?.getResources?.hits || [];
    allData = allData.concat(hits);
    searchAfter = hits.length ? hits[hits.length - 1].search_after : null;
  } while (searchAfter);

  return allData;
};

const fetchTsvReport = createAsyncThunk<
  void,
  {
    tableName: string;
    columns: { key: string; label: string }[];
    variables: QueryOptions;
    GQL_QUERY: any;
  },
  { rejectValue: string }
>('report/generate/tsv', async ({ tableName, columns, variables, GQL_QUERY }, thunkAPI) => {
  const messageKey = 'report_pending';
  try {
    const data = await fetchAllData(GQL_QUERY, variables);
    console.log('fetchTsvReport data length ==', data?.length);
    console.log('fetchTsvReport columns==', columns);

    const formattedData = data.map((item) => {
      return columns.reduce(
        (acc, column) => {
          acc[column.key] = item[column.key] ?? '';
          acc[column.label] = item[column.label] ?? '';
          acc.value = item[column.key] ?? '';
          return acc;
        },
        {} as Record<string, any>,
      );
    });
    console.log('fetchTsvReport formattedData==', formattedData);

    const formattedDate = format(new Date(), 'yyyy-MM-dd');
    const formattedFileName = `unic-${tableName}-${formattedDate}.tsv`;

    await downloadTSV(formattedData, formattedFileName);
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
  } catch {
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

export { fetchTsvReport };
