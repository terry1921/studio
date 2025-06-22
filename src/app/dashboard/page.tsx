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
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Icons.logo className="w-6 h-6" />
          <span>Content Shelf</span>
        </Link>
        <div className="ml-auto">
          {user && <Button onClick={handleLogout} variant="destructive">Logout</Button>}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        {loading || !user ? (
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
                </CardContent>
            </Card>
          </div>
        ) : (
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
                </CardContent>
            </Card>

            {userData?.role === 'admin' && (
                <TopicSuggester />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
