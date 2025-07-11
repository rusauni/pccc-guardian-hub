
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
            <BreadcrumbItem key={index}>
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
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
