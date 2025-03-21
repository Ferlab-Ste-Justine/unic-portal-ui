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
  extra?: React.ReactNode;
  title: React.ReactNode | string;
  children: React.ReactNode;
}

export interface IEntityDescriptions {
  descriptions: IEntityDescriptionsItem[];
}
export interface IEntityCardHeader {
  type: string;
  name: React.ReactNode | string;
  entityType: string;
}
