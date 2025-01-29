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
}

export interface ITableTEntity {
  tab_id: number;
  tab_name: string;
  tab_description_en: string;
  tab_description_fr: string;
  stat_etl: IStatETL;
}

export interface IVariableEntity {
  var_id: number;
  var_last_update: number;
  var_created_at: Date;
  var_name: string;
  var_path: string;
  var_value_type: string;
  var_default: boolean;
  var_is_path: boolean;
  var_is_scale_to_fit: boolean;
  var_is_composite: boolean;
  var_is_array: boolean;
  var_is_required: boolean;
  var_is_optional: boolean;
  var_description_en: string;
  var_description_fr: string;
  var_source_type: ISourceType;
  stat_etl: IStatETL;
  tables: ITableTEntity[];
}

export interface IResourceEntity {
  rs_id: number;
  rs_system_collection_starting_year: number;
  rs_type: string;
  rs_dict_current_version: string;
  rs_last_update: number;
  rs_description_en: string;
  rs_description_fr: string;
  rs_name: string;
  rs_code: string;
  rs_is_project: boolean;
  stat_etl: IStatETL;
  variables: IVariableEntity[];
  tables: ITableTEntity[];
}
