import React from 'react';

export interface IEntityDescriptionsItem {
  label: React.ReactNode;
  value?: React.ReactNode | string;
  separator?: boolean;
}

export interface IEntityCard {
  id?: string;
  loading: boolean;
  noDataLabel?: string;
  title: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
}

export interface IEntityDescriptions {
  descriptions: IEntityDescriptionsItem[];
}
