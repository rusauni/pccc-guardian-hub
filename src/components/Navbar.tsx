
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Newspaper, Book, Folder, FileText, Video, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
import SearchBar from './SearchBar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const mainNavigation = [
  { name: 'Trang chủ', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
  { name: 'Tin tức PCCC', href: '/tin-tuc', icon: <Newspaper className="h-4 w-4 mr-2" /> },
  { 
    name: 'Hướng dẫn', 
    href: '#',
    icon: <Book className="h-4 w-4 mr-2" />,
    submenu: [
      { name: 'Hướng dẫn cộng đồng', href: '/huong-dan-cong-dong' },
      { name: 'Hướng dẫn nghiệp vụ', href: '/huong-dan-nghiep-vu' }
    ]
  },
  { name: 'Thủ tục hành chính', href: '/thu-tuc-hanh-chinh', icon: <Folder className="h-4 w-4 mr-2" /> },
  { 
    name: 'Tài liệu', 
    href: '#',
    icon: <FileText className="h-4 w-4 mr-2" />,
    submenu: [
      { name: 'Văn bản pháp quy', href: '/van-ban-phap-quy' },
      { name: 'Nghiên cứu - Trao đổi', href: '/nghien-cuu-trao-doi' }
    ]
  },
  { name: 'Video kỹ năng PCCC', href: '/video', icon: <Video className="h-4 w-4 mr-2" /> },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchIconOnly, setIsSearchIconOnly] = useState(false);
  const location = useLocation();
  
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
          <Link to="/" className="flex items-center space-x-2 mr-6">
            <img 
              src="/placeholder.svg" 
              alt="PCCC Logo" 
              className="h-8 w-8" 
            />
            <span className="font-bold hidden sm:inline-block">PCCC40</span>
          </Link>
          
          <nav className="hidden lg:flex flex-1 space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {mainNavigation.map((item) => 
                  item.submenu ? (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger className="h-10">
                        <span className="flex items-center">
                          {item.icon}
                          {item.name}
                        </span>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-1 p-2">
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
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          {isSearchIconOnly ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
          ) : (
            <div className="w-64">
              <SearchBar />
            </div>
          )}
          
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="fixed inset-0 flex">
            <div className="w-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                  <img src="/placeholder.svg" alt="PCCC Logo" className="h-8 w-8" />
                  <span className="font-bold inline-block">PCCC40</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              
              {/* Search bar in mobile menu */}
              <div className="p-4">
                <SearchBar />
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ) : (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground">
                        {item.icon}
                        {item.name}
                      </div>
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
                            onClick={() => setMobileMenuOpen(false)}
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
      )}
    </header>
  );
};

export default Navbar;
