
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const UserProfile = () => {
  const { user, loading, signOut } = useSupabase();

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-40" />
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Thông tin người dùng</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.user_metadata?.avatar_url || ''} />
          <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold">
          {user.user_metadata?.full_name || user.email?.split('@')[0]}
        </h3>
        <p className="text-gray-500">{user.email}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={signOut}>
          Đăng xuất
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
