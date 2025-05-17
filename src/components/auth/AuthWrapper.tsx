
import { useSupabase } from '@/contexts/SupabaseContext';
import AuthForms from './AuthForms';
import UserProfile from './UserProfile';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthWrapperProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthWrapper = ({ children, fallback }: AuthWrapperProps) => {
  const { user, loading } = useSupabase();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }
  
  if (!user) {
    return fallback || <AuthForms />;
  }
  
  return <>{children}</>;
};

export default AuthWrapper;
