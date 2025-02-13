import React from 'react';

export interface IEntityDescriptions {
  descriptions: IEntityDescriptionsItem[];
  id?: string;
  loading: boolean;
  noDataLabel?: string;
  title: string;
}

export interface IEntityDescriptionsItem {
  label: React.ReactNode;
  value?: React.ReactNode | string;
  separator?: boolean;
}
