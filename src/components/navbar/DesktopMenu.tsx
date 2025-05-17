
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem } from './types';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DesktopMenuProps {
  navigation: NavItem[];
}

const DesktopMenu = ({ navigation }: DesktopMenuProps) => {
  const location = useLocation();

  // Create a map of names to avoid duplicates
  const uniqueNavMap = new Map<string, NavItem>();
  
  // Only add items that aren't already in the map
  navigation.forEach(item => {
    if (!uniqueNavMap.has(item.name)) {
      uniqueNavMap.set(item.name, item);
    }
  });

  // Convert map back to array
  const uniqueNavigation = Array.from(uniqueNavMap.values());

  return (
    <nav className="hidden lg:flex flex-1 space-x-1">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">
          {uniqueNavigation.map((item) => 
            item.submenu ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === item.href && "bg-accent text-accent-foreground",
                  "h-10"
                )}>
                  <span className="flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-[220px]">
                  {item.submenu.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link
                        to={subItem.href}
                        className={cn(
                          "w-full",
                          location.pathname === subItem.href && "bg-accent text-accent-foreground"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavigationMenuItem key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === item.href && "bg-accent text-accent-foreground",
                    "h-10"
                  )}
                >
                  <span className="flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                </Link>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopMenu;
