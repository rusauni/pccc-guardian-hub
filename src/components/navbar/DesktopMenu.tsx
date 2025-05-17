
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem } from './types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import React from 'react';

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
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger className="h-10">
                  <span className="flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-1 p-2 bg-popover rounded-md">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={subItem.href}
                            className={cn(
                              "block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              location.pathname === subItem.href && "bg-accent text-accent-foreground"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
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
