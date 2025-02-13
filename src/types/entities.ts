export interface IStatETL {
  project_count: number;
  domain_count: number;
  source_system_count: number;
  variable_count: number;
  table_count: number;
}

export interface ISourceType {
  rs_id: number;
  rs_name: string;
  rs_code: string;
  published: boolean;
  stat_etl: IStatETL;
}

export interface ITableEntity {
  tab_id: number;
  tab_name: string;
  tab_label_en: string;
  tab_label_fr: string;
  resource: IResourceEntity;
  tab_entity_type: string;
  tab_domain: string;
  stat_etl: IStatETL;
  tab_created_at: string;
  tab_last_update: string;
}

export interface IVariableEntity {
  var_id: number;
  var_last_update: number;
  var_created_at: number;
  var_name: string;
  var_path: string;
  var_value_type: string;
  stat_etl: IStatETL;
  table: ITableEntity;
  resource: IResourceEntity;
  var_label_fr: string;
  var_label_en: string;
  var_from_source_systems: ISourceType[];
}

export interface IResourceEntity {
  rs_id: number;
  rs_system_collection_starting_year: number;
  rs_type: string;
  rs_title: string;
  rs_dict_current_version: string;
  rs_last_update: number;
  rs_description_en: string;
  rs_description_fr: string;
  rs_name: string;
  rs_code: string;
  rs_project_pi: string;
  rs_project_erb_id: string;
  rs_is_project: boolean;
  rs_project_approval_date: number;
  stat_etl: IStatETL;
  variables: IVariableEntity[];
  tables: ITableEntity[];
}

export interface ISourceSystem {
  published: boolean;
  rs_code: string;
  rs_id: string;
  rs_name: string;
  stat_etl: IStatETL;
}

export interface ISourceSystem {
  published: boolean;
  rs_code: string;
  rs_id: string;
  rs_name: string;
  stat_etl: IStatETL;
}
