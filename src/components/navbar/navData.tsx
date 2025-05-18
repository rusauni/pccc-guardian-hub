
import { Home, Newspaper, Book, Folder, FileText, Video } from 'lucide-react';
import { NavItem } from './types';

export const mainNavigation: NavItem[] = [
  { name: 'Trang chủ', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
  { name: 'Tin tức PCCC', href: '/tin-tuc-pccc', icon: <Newspaper className="h-4 w-4 mr-2" /> },
  { 
    name: 'Hướng dẫn', 
    href: '/huong-dan', // Changed from '#' to a valid URL
    icon: <Book className="h-4 w-4 mr-2" />,
    submenu: [
      { name: 'Hướng dẫn cộng đồng', href: '/huong-dan-cong-dong' },
      { name: 'Hướng dẫn nghiệp vụ', href: '/huong-dan-nghiep-vu' }
    ]
  },
  { name: 'Thủ tục hành chính', href: '/thu-tuc-hanh-chinh', icon: <Folder className="h-4 w-4 mr-2" /> },
  { 
    name: 'Tài liệu', 
    href: '/tai-lieu', // Changed from '#' to a valid URL
    icon: <FileText className="h-4 w-4 mr-2" />,
    submenu: [
      { name: 'Văn bản pháp quy', href: '/van-ban-phap-quy' },
      { name: 'Nghiên cứu - Trao đổi', href: '/nghien-cuu-trao-doi' }
    ]
  },
  { name: 'Video kỹ năng PCCC', href: '/video', icon: <Video className="h-4 w-4 mr-2" /> },
];
