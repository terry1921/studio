'use client';

import Link from 'next/link';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function AuthButton() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-28" />;
    }

    if (user) {
        return (
            <Link href="/dashboard">
                <Button variant="outline" aria-label="Dashboard">
                    <LayoutDashboard />
                    Dashboard
                </Button>
            </Link>
        )
    }

    return (
        <Link href="/login">
            <Button variant="outline" aria-label="Login">
              <LogIn />
              Login
            </Button>
        </Link>
    )
}
