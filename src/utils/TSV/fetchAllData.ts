import { DocumentNode, FieldNode, OperationDefinitionNode } from 'graphql/index';

import client from '@/lib/graphql/ApolloClient';
import { QueryOptions } from '@/types/queries';

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
      variables: { ...variables, search_after: searchAfter, size: 10000 },
    });

    const hits: any[] = data?.[queryName]?.hits || [];
    allData = allData.concat(hits);
    searchAfter = hits.length ? hits[hits.length - 1].search_after : null;
  } while (searchAfter);

  return allData;
};

export default fetchAllData;
