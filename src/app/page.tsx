'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function UnlockPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setIsAuthenticated, unlockBackground } = useAppContext();
  const [password, setPassword] = React.useState('');
  const [isUnlocking, setIsUnlocking] = React.useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);

    // Simulate network delay
    setTimeout(() => {
      if (password === '1234') {
        toast({
          title: 'Success',
          description: 'Guardian Lock unlocked.',
        });
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Authentication Failed',
          description: 'The password you entered is incorrect.',
        });
        setIsUnlocking(false);
      }
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
      {unlockBackground.startsWith('https://') && (
        <Image
          src={unlockBackground}
          alt="Unlock screen background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      )}
      <div
        className={cn(
          'absolute inset-0 z-10',
          !unlockBackground.startsWith('https://') && unlockBackground,
          unlockBackground.startsWith('https://') && 'bg-black/30 backdrop-blur-sm'
        )}
      ></div>
      <Card className="w-full max-w-sm z-20 shadow-2xl">
        <form onSubmit={handleUnlock}>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/20 text-primary p-3 rounded-full w-fit">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-headline mt-4">
              Guardian Lock
            </CardTitle>
            <CardDescription>
              Enter your password to unlock your apps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isUnlocking}>
              {isUnlocking ? 'Unlocking...' : 'Unlock'}
              <Lock className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/forgot-password">Forgot Password?</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
