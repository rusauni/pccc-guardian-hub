
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavItem } from './types';
import SearchToggle from './SearchToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  mainNavigation: NavItem[];
}

const MobileMenu = ({ isOpen, onClose, mainNavigation }: MobileMenuProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="fixed inset-0 flex">
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <img src="/placeholder.svg" alt="PCCC Logo" className="h-8 w-8" />
              <span className="font-bold inline-block">PCCC40</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          
          {/* Search toggle in mobile menu */}
          <div className="p-4">
            <SearchToggle isSearchIconOnly={false} />
          </div>
          
          <div className="mt-2 p-4 space-y-1">
            {mainNavigation.map((item) => 
              !item.submenu ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-accent" 
                      : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                  )}
                  onClick={onClose}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ) : (
                <div key={item.name} className="space-y-1">
                  {/* Make parent menu item clickable */}
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-accent" 
                        : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                    )}
                    onClick={onClose}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                  <div className="pl-8 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-md transition-colors",
                          location.pathname === subItem.href
                            ? "text-primary bg-accent" 
                            : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
                        )}
                        onClick={onClose}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
