import { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Breadcrumbs } from '../Breadcrumbs';

interface DetailPageLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
}

const DetailPageLayout = ({ children, showBreadcrumbs = true }: DetailPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="flex-grow py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DetailPageLayout;
