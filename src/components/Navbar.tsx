
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Tin tức PCCC', href: '/tin-tuc' },
  { name: 'Hướng dẫn cộng đồng', href: '/huong-dan-cong-dong' },
  { name: 'Văn bản pháp quy', href: '/van-ban-phap-quy' },
  { name: 'Thủ tục hành chính', href: '/thu-tuc-hanh-chinh' },
  { name: 'Hướng dẫn nghiệp vụ', href: '/huong-dan-nghiep-vu' },
  { name: 'Nghiên cứu - Trao đổi', href: '/nghien-cuu-trao-doi' },
  { name: 'Video kỹ năng PCCC', href: '/video' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center">
            <img 
              src="/placeholder.svg" 
              alt="PCCC Logo" 
              className="h-10 w-10" 
            />
            <span className="ml-2 text-xl font-bold text-pccc-primary">PCCC News</span>
          </Link>
        </div>
        
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link to={item.href}>
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        location.pathname === item.href || 
                        (item.href !== '/' && location.pathname.startsWith(item.href)) 
                          ? "bg-pccc-light text-pccc-primary" 
                          : "text-gray-700 hover:text-pccc-primary"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="fixed inset-0 flex">
            <div className="w-full">
              <div className="flex items-center justify-between p-4">
                <Link to="/" className="flex items-center">
                  <img src="/placeholder.svg" alt="PCCC Logo" className="h-10 w-10" />
                  <span className="ml-2 text-xl font-bold text-pccc-primary">PCCC News</span>
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="divide-y divide-gray-200">
                  <div className="space-y-2 py-6 px-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "block py-2 font-semibold transition duration-300",
                          location.pathname === item.href || 
                          (item.href !== '/' && location.pathname.startsWith(item.href))
                            ? "text-pccc-primary"
                            : "text-gray-900 hover:text-pccc-primary"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
