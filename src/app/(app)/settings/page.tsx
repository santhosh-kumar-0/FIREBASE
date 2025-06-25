'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppContext, type LockType } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const backgroundOptions = [
  { id: 'bg-background', name: 'Default', value: 'bg-background' },
  {
    id: 'bg1',
    name: 'Abstract Blue',
    value: 'https://placehold.co/1920x1080/64B5F6/E3F2FD.png',
    hint: 'abstract blue'
  },
  {
    id: 'bg2',
    name: 'Geometric Purple',
    value: 'https://placehold.co/1920x1080/CE93D8/FFFFFF.png',
    hint: 'geometric purple'
  },
  {
    id: 'bg3',
    name: 'Night Sky',
    value: 'https://placehold.co/1920x1080/263238/FFFFFF.png',
    hint: 'night sky'
  },
];

export default function SettingsPage() {
  const { unlockBackground, setUnlockBackground, lockType, setLockType } = useAppContext();
  const { toast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been updated (simulation).",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-headline mb-6">Settings</h1>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Card>
          <CardHeader>
            <CardTitle>Customize Unlock Screen</CardTitle>
            <CardDescription>
              Choose a background for your unlock screen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {backgroundOptions.map((bg) => (
                <div
                  key={bg.id}
                  className="relative cursor-pointer group"
                  onClick={() => setUnlockBackground(bg.value)}
                >
                  <div
                    className={cn("w-full h-24 rounded-lg border-2 transition-all",
                      unlockBackground === bg.value ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-transparent'
                    )}
                  >
                  {bg.value.startsWith('https://') ? (
                    <Image
                      src={bg.value}
                      alt={bg.name}
                      data-ai-hint={bg.hint}
                      width={200}
                      height={112}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-md bg-background border flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">{bg.name}</span>
                    </div>
                  )}
                  </div>

                  {unlockBackground === bg.value && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                   <p className="text-sm text-center mt-2 text-muted-foreground group-hover:text-foreground">{bg.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="font-semibold">Unlock Method</Label>
              <RadioGroup
                  value={lockType}
                  onValueChange={(value) => setLockType(value as LockType)}
                  className="mt-2"
              >
                  <div className="flex items-center space-x-3">
                      <RadioGroupItem value="password" id="r1" />
                      <Label htmlFor="r1" className="font-normal">Password</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                      <RadioGroupItem value="face" id="r2" />
                      <Label htmlFor="r2" className="font-normal">Face ID</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pattern" id="r3" disabled />
                      <Label htmlFor="r3" className="font-normal text-muted-foreground">Pattern (coming soon)</Label>
                  </div>
              </RadioGroup>
            </div>
            <Separator />
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <p className="font-semibold">Change Password</p>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}
