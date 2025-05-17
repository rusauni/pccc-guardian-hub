
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSupabase } from '@/contexts/SupabaseContext';
import AuthWrapper from '@/components/auth/AuthWrapper';
import UserProfile from '@/components/auth/UserProfile';
import AuthForms from '@/components/auth/AuthForms';

const AuthDemo = () => {
  const { user } = useSupabase();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Supabase Self-Host Demo</h1>
          
          <div className="max-w-md mx-auto mb-8">
            {user ? (
              <UserProfile />
            ) : (
              <AuthForms />
            )}
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Nội dung bảo vệ</h2>
            
            <AuthWrapper
              fallback={
                <div className="bg-muted p-6 rounded-lg text-center">
                  <p className="mb-4">Bạn cần đăng nhập để xem nội dung này.</p>
                </div>
              }
            >
              <div className="bg-background border p-6 rounded-lg">
                <p className="mb-4">Đây là nội dung chỉ dành cho người dùng đã đăng nhập.</p>
                <p>Bạn đang đăng nhập với email: <strong>{user?.email}</strong></p>
              </div>
            </AuthWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthDemo;
