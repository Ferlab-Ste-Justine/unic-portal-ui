import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';

export type TUser = {
  id: string;
  keycloak_id: string;
  first_name: string;
  last_name: string;
  era_commons_id?: string;
  nih_ned_id?: string;
  email?: string;
  public_email?: string;
  external_individual_fullname?: string;
  external_individual_email?: string;
  roles?: string[];
  affiliation?: string;
  research_domains?: string[];
  portal_usages?: string[];
  creation_date: Date;
  updated_date: Date;
  consent_date?: Date;
  accepted_terms: boolean;
  understand_disclaimer: boolean;
  completed_registration: boolean;
  commercial_use_reason: string;
  config: any;
  linkedin?: string;
  profile_image_key?: string | null;
  locale?: string;
  title?: string;
};

export type TUserInsert = Omit<TUser, 'id' | 'keycloak_id' | 'creation_date' | 'update_date'>;
export type TUserUpdate = Partial<TUserInsert>;

export type initialState = {
  userInfo: TUser | null;
  isLoading: boolean;
  isUpdating: boolean;
  error?: string;
};

export enum PaginationViewPerQuery {
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
  OneHundred = 100,
}

export type TUserTableConfig = {
  columns?: TColumnStates;
  viewPerQuery?: PaginationViewPerQuery;
};

export type TUserConfig = {
  catalog?: {
    tables?: {
      resources?: TUserTableConfig;
      tables?: TUserTableConfig;
      variables?: TUserTableConfig;
    };
  };
};

export interface IOption {
  label: string;
  value: string;
}

export interface IUserOptions {
  roleOptions: IOption[];
  researchDomainOptions: IOption[];
}
