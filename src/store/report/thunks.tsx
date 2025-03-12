import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentNode } from 'graphql';
import intl from 'react-intl-universal';
import fetchAllData from 'src/utils/TSV/fetchAllData';

import { globalActions } from '@/store/global';
import { QueryOptions } from '@/types/queries';
import formatDate from '@/utils/formatDate';
import download from '@/utils/TSV/download';
import formatData from '@/utils/TSV/formatData';

const showErrorReportNotif = (thunkApi: any) =>
  thunkApi.dispatch(
    globalActions.displayNotification({
      type: 'error',
      message: intl.get('global.report.error.title'),
      description: intl.get('global.report.error.message'),
      duration: 5,
    }),
  );

const fetchTsvReport = createAsyncThunk<
  void,
  {
    tableName: string;
    columns: { key: string; label: string; renderDownload?: () => string }[];
    variables: QueryOptions;
    query: DocumentNode;
  },
  { rejectValue: string }
>('global.report/generate/tsv', async ({ tableName, columns, variables, query }, thunkAPI) => {
  const messageKey = 'global.report_pending';
  try {
    thunkAPI.dispatch(
      globalActions.displayMessage({
        type: 'loading',
        key: messageKey,
        content: intl.get('global.report.inProgress.fetchReport'),
        duration: 0,
      }),
    );

    const data = await fetchAllData(query, variables);
    const formattedData = formatData(data, columns);
    const formattedDate = formatDate(new Date());
    const formattedFileName = `unic-${tableName}-${formattedDate}.tsv`;
    await download(formattedData, formattedFileName);

    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'success',
        message: intl.get('global.report.onSuccess.title'),
        description: intl.get('global.report.onSuccess.fetchReport'),
      }),
    );
  } catch (error) {
    console.log('fetchTsvReport catch error==', error);
    thunkAPI.dispatch(globalActions.destroyMessages([messageKey]));
    showErrorReportNotif(thunkAPI);
  }
});

export { fetchTsvReport };
