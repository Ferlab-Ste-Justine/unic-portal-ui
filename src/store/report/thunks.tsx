import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql';
import intl from 'react-intl-universal';

import client from '@/lib/graphql/ApolloClient';
import { globalActions } from '@/store/global';
import { QueryOptions } from '@/types/queries';
import formatDate from '@/utils/formatDate';

const showErrorReportNotif = (thunkApi: any) =>
  thunkApi.dispatch(
    globalActions.displayNotification({
      type: 'error',
      message: intl.get('global.report.error.title'),
      description: intl.get('global.report.error.message'),
      duration: 5,
    }),
  );

const downloadTSV = async (data: Record<string, any>[], filename: string) => {
  if (!data.length) return;

  const headers = Object.keys(data[0]);
  const tsvRows = data.map((row) => headers.map((header) => String(row[header] ?? '')).join('\t'));
  const tsvContent = [headers.join('\t'), ...tsvRows].join('\n');
  const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

const fetchAllData = async (query: DocumentNode, variables: QueryOptions) => {
  let allData: any[] = [];
  let searchAfter = null;

  // Get the query name dynamically from the first field in the selection set
  const operationDefinition = query.definitions.find(
    (def) => def.kind === 'OperationDefinition',
  ) as OperationDefinitionNode;
  const queryName = (operationDefinition?.selectionSet?.selections[0] as FieldNode)?.name?.value;

  do {
    const { data } = await client.query({
      query,
      variables: { ...variables, search_after: searchAfter, size: 10 },
    });

    const hits: any[] = data?.[queryName]?.hits || [];
    allData = allData.concat(hits);
    searchAfter = hits.length ? hits[hits.length - 1].search_after : null;
  } while (searchAfter);

  return allData;
};

const formatDataForTSV = (data: any[], columns: any[]): Record<string, any>[] => {
  return data.map((item) => {
    const formattedItem: Record<string, any> = {};

    columns.forEach(({ key, label, renderDownload }) => {
      if (renderDownload && typeof renderDownload === 'function') {
        /** render custom function if exists */
        formattedItem[label] = renderDownload(item);
      } else if (Array.isArray(item[key])) {
        /** split array into string */
        formattedItem[label] = item[key].join(',');
      } else {
        /** render default value */
        formattedItem[label] = item[key] ?? '-';
      }
    });

    return formattedItem;
  });
};

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
    const formattedData = formatDataForTSV(data, columns);
    const formattedDate = formatDate(new Date());
    const formattedFileName = `unic-${tableName}-${formattedDate}.tsv`;
    await downloadTSV(formattedData, formattedFileName);

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
