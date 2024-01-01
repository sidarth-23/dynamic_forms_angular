export interface GroupItem {
  key: string;
  title: string;
  type?: string;
  group?: GroupItem[];
}

export interface RootObject {
  key: string;
  title: string;
  group: GroupItem[];
}[]
