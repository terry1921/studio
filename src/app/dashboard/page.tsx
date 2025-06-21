'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { TopicSuggester } from '@/components/topic-suggester';

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6">
            <div className="w-full max-w-2xl space-y-8">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-2 text-center w-full items-center flex flex-col">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <Skeleton className="h-10 w-24 mt-4" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-8">
        <Card>
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Dashboard</CardTitle>
            <CardDescription>Welcome to your creative space.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
                <p className="font-semibold text-lg">{user.displayName || 'No display name'}</p>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </CardContent>
        </Card>

        {userData?.role === 'admin' && (
            <TopicSuggester />
        )}
      </div>
    </div>
  );
}
