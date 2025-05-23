import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { mainNavigation } from './navbar/navData';
import { NavItem, NavSubItem } from './navbar/types';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Generate breadcrumb items based on the current path
  const breadcrumbItems = generateBreadcrumbItems(pathnames, mainNavigation);
  
  if (pathnames.length === 0) return null; // Don't show breadcrumbs on home page
  
  return (
    <div className="container mx-auto px-4 py-2 border-b">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home is always the first item */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          {/* Dynamically generated breadcrumb items */}
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {/* Add separator after each item except the last one */}
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Helper function to generate breadcrumb items
function generateBreadcrumbItems(pathnames: string[], navigation: NavItem[]): Array<{name: string, href: string}> {
  const result: Array<{name: string, href: string}> = [];
  
  // Build breadcrumb path based on current route
  let currentPath = '';
  
  // For news posts, only show 'Trang chủ > Tin tức PCCC'
  if (pathnames[0] === 'tin-tuc-pccc' || (pathnames[0] === 'tin-tuc' && pathnames.length > 1)) {
    // Add News category
    const newsItem = navigation.find(item => item.href === '/tin-tuc-pccc');
    if (newsItem) {
      result.push({ name: newsItem.name, href: '/tin-tuc-pccc' });
    }
    return result;
  }
  
  // Special case for 'Văn bản pháp quy' to ensure consistent breadcrumbs
  if (pathnames.length === 1 && pathnames[0] === 'van-ban-phap-quy') {
    // Find the 'Tài liệu' navigation item
    const taiLieuItem = navigation.find(item => item.name === 'Tài liệu');
    if (taiLieuItem) {
      // Add 'Tài liệu' to breadcrumbs
      result.push({ name: taiLieuItem.name, href: taiLieuItem.href });
      
      // Find the 'Văn bản pháp quy' submenu item
      if (taiLieuItem.submenu) {
        const vanBanItem = taiLieuItem.submenu.find(sub => sub.href === '/van-ban-phap-quy');
        if (vanBanItem) {
          result.push({ name: vanBanItem.name, href: vanBanItem.href });
        }
      }
      return result;
    }
  }
  
  // Default handling for other routes
  for (const segment of pathnames) {
    currentPath += `/${segment}`;
    
    // Find matching navigation item
    let matchingItem: NavItem | NavSubItem | undefined;
    
    // Check main navigation items
    matchingItem = navigation.find(item => item.href === currentPath);
    
    // If not found in main items, check submenu items
    if (!matchingItem) {
      for (const item of navigation) {
        if (item.submenu) {
          const subItem = item.submenu.find(sub => sub.href === currentPath);
          if (subItem) {
            matchingItem = subItem;
            
            // If this is a submenu item, also add its parent to breadcrumbs if not already there
            const parentPath = item.href !== '#' ? item.href : undefined;
            if (parentPath && !result.some(r => r.href === parentPath)) {
              // Insert parent before current item
              result.push({ name: item.name, href: parentPath });
            }
            break;
          }
        }
      }
    }
    
    if (matchingItem) {
      result.push({ name: matchingItem.name, href: currentPath });
    }
  }
  
  return result;
}
