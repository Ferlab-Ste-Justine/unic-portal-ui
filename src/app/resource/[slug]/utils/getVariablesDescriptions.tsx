import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { Tooltip } from 'antd';
import Link from 'next/link';
import intl from 'react-intl-universal';

import { IEntityDescriptionsItem } from '@/components/EntityPage/types/entityPage';
import { store } from '@/store';
import { globalActions } from '@/store/global';
import { LANG } from '@/types/constants';
import { IResourceEntity } from '@/types/entities';
import { VARIABLES_TAB_KEY } from '@/utils/constants';

import styles from '../page.module.css';

const extractVariableCounts = (resourceEntity?: IResourceEntity) => {
  const variablesCountsMap = new Map<string, number>();

  resourceEntity?.variables?.forEach((v) =>
    v.var_from_source_systems?.forEach((s) => variablesCountsMap.set(s.rs_name, s.stat_etl?.variable_count)),
  );

  return [...variablesCountsMap].sort((v1, v2) => v2[1] - v1[1]);
};

const getVariablesDescriptions = (lang: LANG, resourceEntity?: IResourceEntity): IEntityDescriptionsItem[] => {
  const variablesCounts = extractVariableCounts(resourceEntity);

  return [
    {
      label: intl.get('entities.number_variables'),
      value: resourceEntity?.stat_etl?.variable_count ? (
        <div>
          <Link
            href={`/catalog#${VARIABLES_TAB_KEY}`}
            onClick={() =>
              store.dispatch(
                globalActions.setFilters([
                  { key: 'resource.rs_name', values: [resourceEntity.rs_name], tabKey: VARIABLES_TAB_KEY },
                ]),
              )
            }
          >
            {resourceEntity?.stat_etl?.variable_count}
          </Link>
          {` (${intl.get('global.in')} ${resourceEntity?.stat_etl?.table_count} ${intl.get('entities.table.tables')})`}
        </div>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    ...(resourceEntity?.rs_type !== 'source_system'
      ? [
          {
            label: (
              <>
                {intl.get('screen.home.hospitalSystems.title')}
                <Tooltip arrowPointAtCenter placement='topLeft' title={intl.get('entities.source_system.tooltip')}>
                  <InfoCircleOutlined className={styles.tooltipIcon} />
                </Tooltip>
              </>
            ),
            value: (
              <div className={styles.variables}>
                {variablesCounts.length > 0
                  ? variablesCounts.map((value, key) => (
                      <span className={styles.hospitalSystem} key={key}>
                        <div>{`${value[0]} (`}</div>
                        <Link
                          href={`/catalog#${VARIABLES_TAB_KEY}`}
                          onClick={() =>
                            store.dispatch(
                              globalActions.setFilters([
                                {
                                  key: 'var_from_source_systems.rs_code',
                                  values: [value[0]],
                                  tabKey: VARIABLES_TAB_KEY,
                                },
                                {
                                  key: 'resource.rs_name',
                                  values: [resourceEntity?.rs_name || ''],
                                  tabKey: VARIABLES_TAB_KEY,
                                },
                              ]),
                            )
                          }
                        >{`${value[1]}`}</Link>
                        <div>{')'}</div>
                      </span>
                    ))
                  : TABLE_EMPTY_PLACE_HOLDER}
              </div>
            ),
          },
        ]
      : []),
  ];
};
export default getVariablesDescriptions;
