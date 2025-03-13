import React from 'react';

export interface IEntityDescriptionsItem {
  label: React.ReactNode;
  value?: React.ReactNode | string;
  separator?: boolean;
}

export interface IEntityCard {
  loading: boolean;
  noDataLabel?: string;
  title: string;
  children: React.ReactNode;
}

export interface IEntityDescriptions {
  descriptions: IEntityDescriptionsItem[];
}
