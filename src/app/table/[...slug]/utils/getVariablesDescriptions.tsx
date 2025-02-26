import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/EntityDescription/types/entityPage';
import { LANG } from '@/types/constants';
import { ITableEntity } from '@/types/entities';

const getVariablesDescriptions = (lang: LANG, tableEntity?: ITableEntity): IEntityDescriptionsItem[] => {
  return [
    {
      label: intl.get('entities.number_variables'),
      value: tableEntity?.stat_etl?.variable_count ? (
        <Link
          href={''} //TODO fix URL
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
