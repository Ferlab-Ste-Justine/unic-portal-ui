import { QueryOptions } from '@/types/queries';

/** Way to update current field on variables via newVariables and keep others via old variables */
export const mergeVariables = (variables: QueryOptions, newVariables: QueryOptions, searchFields: string[]) => {
  try {
    const otherMatch = variables.match?.filter((match) => !searchFields.includes(match.field)) || [];
    const currentMatch = newVariables?.match?.filter((match) => searchFields.includes(match.field)) || [];
    const match = [...otherMatch, ...currentMatch];
    const otherOr = variables.or?.filter((or) => !searchFields.includes(or.field)) || [];
    const currentOr = newVariables?.or?.filter((or) => searchFields.includes(or.field)) || [];
    const or = [...otherOr, ...currentOr];
    const otherOrGroups =
      variables.orGroups?.filter((orGroups) => orGroups.some((or) => !searchFields.includes(or.field))) || [];
    const currentOrGroups =
      newVariables?.orGroups?.filter((orGroups) => orGroups.some((or) => searchFields.includes(or.field))) || [];
    const orGroups = [...otherOrGroups, ...currentOrGroups];
    return { ...variables, match, or, orGroups };
  } catch (error) {
    console.error('[mergeVariables] error', error);
    return variables;
  }
};
