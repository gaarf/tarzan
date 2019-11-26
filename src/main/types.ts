import { JsonObject } from 'type-fest';

export type Preferences = {
  theme: string;
};

export type TarzanNode = {
  id?: number;
  label: string;
  description?: string;
  data?: JsonObject;
  items?: TarzanNode[] | null;
};

export type TarzanTaxonomy = {
  version?: number;
  items: TarzanNode[];
};

