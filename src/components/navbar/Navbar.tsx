
import { useState, useEffect } from 'react';
import NavLogo from './NavLogo';
import DesktopMenu from './DesktopMenu';
import SearchToggle from './SearchToggle';
import MobileMenuToggle from './MobileMenuToggle';
import MobileMenu from './MobileMenu';
import { ThemeToggle } from '../theme/ThemeToggle';
import { mainNavigation } from './navData';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchIconOnly, setIsSearchIconOnly] = useState(false);
  
  useEffect(() => {
    // Function to handle resize and determine if we should show search icon only
    const handleResize = () => {
      setIsSearchIconOnly(window.innerWidth < 1024);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center flex-1">
          <NavLogo />
          <DesktopMenu navigation={mainNavigation} />
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <SearchToggle isSearchIconOnly={isSearchIconOnly} />
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-2 md:hidden">
            <SearchToggle isSearchIconOnly={false} />
            <ThemeToggle />
            <MobileMenuToggle onToggle={() => setMobileMenuOpen(true)} />
          </div>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        mainNavigation={mainNavigation}
      />
    </header>
  );
};

export default Navbar;
