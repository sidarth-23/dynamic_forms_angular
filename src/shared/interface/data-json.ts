export interface GroupItem {
  key: string;
  title: string;
  type?: string;
  options?: {value: string, label: string}[];
  group?: GroupItem[];
}

export interface RootObject {
  key: string;
  title: string;
  group: GroupItem[];
}[]
