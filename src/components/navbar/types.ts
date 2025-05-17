
import { ReactNode } from 'react';

export interface SubMenuItem {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon: ReactNode;
  submenu?: SubMenuItem[];
}
