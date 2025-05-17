
import { ReactNode } from 'react';

export interface NavSubItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon?: ReactNode;
  submenu?: NavSubItem[];
}
