import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { store } from '@/store';
import { globalActions } from '@/store/global';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';
import { VARIABLES_TAB_KEY } from '@/utils/constants';

const getVariablesDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => {
  return [
    {
      label: intl.get('entities.number_variables'),
      value: tableEntity?.stat_etl?.variable_count ? (
        <Link
          href={`/catalog#${VARIABLES_TAB_KEY}`}
          onClick={() =>
            store.dispatch(
              globalActions.setFilters([
                { key: 'table.tab_name', values: [tableEntity.tab_name], tabKey: VARIABLES_TAB_KEY },
                {
                  key: 'resource.rs_name',
                  values: [tableEntity.resource?.rs_name || ''],
                  tabKey: VARIABLES_TAB_KEY,
                },
              ]),
            )
          }
        >
          {tableEntity?.stat_etl?.variable_count}
        </Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
  ];
};
export default getVariablesDescriptions;
