
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

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
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/placeholder.svg" 
            alt="PCCC Logo" 
            className="h-8 w-8" 
          />
          <span className="font-bold inline-block">PCCC News</span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href)) 
                  ? "text-primary bg-accent" 
                  : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center justify-end space-x-2 md:hidden">
          <button
            type="button"
            className={buttonVariants({
              variant: "ghost",
              size: "icon"
            })}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
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
                  <span className="font-bold inline-block">PCCC News</span>
                </Link>
                <button
                  type="button"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon"
                  })}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <div className="mt-2 p-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                      location.pathname === item.href || 
                      (item.href !== '/' && location.pathname.startsWith(item.href))
                        ? "text-primary bg-accent" 
                        : "text-foreground/60 hover:text-foreground/80 hover:bg-accent/50"
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
      )}
    </header>
  );
};

export default Navbar;
