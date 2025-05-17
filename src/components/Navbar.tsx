
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 flex items-center justify-between py-4">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="PCCC Logo" className="h-10 w-10" />
            <span className="ml-2 text-xl font-bold text-pccc-primary">PCCC News</span>
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-pccc-primary transition duration-300"
            >
              {item.name}
            </Link>
          ))}
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
                        className="block py-2 font-semibold text-gray-900 hover:text-pccc-primary transition duration-300"
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
