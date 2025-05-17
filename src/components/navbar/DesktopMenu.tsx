
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
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';

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
              <NavigationMenuItem key={item.name} className="relative">
                <HoverCard openDelay={0} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center">
                      {/* Make parent menu item clickable */}
                      <Link 
                        to={item.href} 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === item.href && "bg-accent text-accent-foreground",
                          "h-10 flex items-center"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    align="start" 
                    className="w-[220px] p-0"
                    sideOffset={8}
                  >
                    <div className="flex flex-col w-full">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            "px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm mx-1 my-1",
                            location.pathname === subItem.href && "bg-accent text-accent-foreground"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
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
