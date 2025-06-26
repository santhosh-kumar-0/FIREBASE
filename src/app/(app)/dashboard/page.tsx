'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { mockAppsData, type App } from '@/lib/apps';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import FaceLock from '@/components/FaceLock';
import { Lock } from 'lucide-react';

const PasswordUnlock = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [password, setPassword] = React.useState('');
  const [isUnlocking, setIsUnlocking] = React.useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);

    setTimeout(() => {
      if (password === '1234') {
        onSuccess();
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
    <form onSubmit={handleUnlock}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="password-dialog">Password</Label>
          <Input
            id="password-dialog"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isUnlocking}>
          {isUnlocking ? 'Unlocking...' : 'Unlock'}
          <Lock className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </form>
  );
};

export default function DashboardPage() {
  const [apps, setApps] = useState(mockAppsData);
  const [unlockRequest, setUnlockRequest] = useState<App | null>(null);
  const { toast } = useToast();
  const { lockType } = useAppContext();

  const toggleLock = (id: number) => {
    const appToToggle = apps.find((app) => app.id === id);
    if (!appToToggle) return;

    const newLockedState = !appToToggle.locked;

    toast({
      title: `${appToToggle.name} ${
        newLockedState ? 'Locked' : 'Unlocked'
      }`,
      description: `Access to ${appToToggle.name} is now ${
        newLockedState ? 'restricted' : 'allowed'
      }.`,
      duration: 2000,
    });
    
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id === id) {
          return { ...app, locked: newLockedState };
        }
        return app;
      })
    );
  };

  const handleAppClick = (app: App) => {
    if (app.locked) {
      setUnlockRequest(app);
    } else {
      toast({
        title: `Opening ${app.name}`,
        description: `${app.name} is not locked.`,
        duration: 2000,
      });
      // In a real app, you would navigate to the app here
    }
  };

  const handleUnlockSuccess = () => {
    toast({
      title: 'Success!',
      description: `Unlocked ${unlockRequest?.name}. Opening app...`,
    });
    setUnlockRequest(null);
  };

  const renderLockMethod = () => {
    if (!unlockRequest) return null;

    switch (lockType) {
      case 'face':
        return (
          <div className="p-6 pt-2">
            <FaceLock onSuccess={handleUnlockSuccess} />
          </div>
        );
      case 'password':
      default:
        return <PasswordUnlock onSuccess={handleUnlockSuccess} />;
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold font-headline mb-2">
            Your Applications
          </h1>
          <p className="text-muted-foreground mb-6">
            Select which applications you want to secure with Guardian Lock. Click an app to open it.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence>
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card
                  onClick={() => handleAppClick(app)}
                  className={`transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-primary/50 ${
                    app.locked
                      ? 'border-primary shadow-md shadow-primary/20'
                      : 'border-border'
                  }`}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      {app.name}
                    </CardTitle>
                    <app.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {app.locked ? 'Locked' : 'Unlocked'}
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                       <Switch
                        checked={app.locked}
                        onCheckedChange={() => toggleLock(app.id)}
                        aria-label={`Lock ${app.name}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={!!unlockRequest} onOpenChange={(open) => !open && setUnlockRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock {unlockRequest?.name}</DialogTitle>
            <DialogDescription>
              {lockType === 'face' 
                ? 'Position your face in the frame to unlock.' 
                : 'Enter your password to continue.'}
            </DialogDescription>
          </DialogHeader>
          {renderLockMethod()}
        </DialogContent>
      </Dialog>
    </>
  );
}
