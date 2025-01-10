export interface IStudy {
  createdBy: string;
  lastUpdatedBy: string | null;
  creationDate: string;
  lastUpdateDate: string | null;
  id: number;
  code: string;
  dataSubmissions: IDataSubmission[];
  isUserAuthorized: boolean;
}

export interface IDataSubmission {
  createdBy: string;
  lastUpdatedBy: string | null;
  creationDate: string;
  lastUpdateDate: string | null;
  id: number;
  studyId: number;
  dictionaryVersion: string;
  statusReport: string | null;
  completed: boolean;
}

export interface ISubmissionFile {
  fileName: string;
  lastModified: Date;
  size: number;
  userId: string;
}

export interface IValidationError {
  errorType: string;
  index: number;
  fieldName: string;
  message: string;
  info: any;
}

export interface ITableError {
  key: number;
  line: number;
  field: string;
  error: string;
}

export enum SubmissionFilesNames {
  SAMPLE_REGISTRATION = 'sample_registration.tsv',
  STUDY = 'study.tsv',
  PARTICIPANT = 'participant.tsv',
  BIOSPECIMEN = 'biospecimen.tsv',
  FAMILY = 'family.tsv',
  DIAGNOSIS = 'diagnosis.tsv',
  PHENOTYPE = 'phenotype.tsv',
  TREATMENT = 'treatment.tsv',
  FOLLOW_UP = 'follow_up.tsv',
  DATASET = 'dataset.tsv',
  EXPOSURE = 'exposure.tsv',
  FAMILY_HISTORY = 'family_history.tsv',
}
