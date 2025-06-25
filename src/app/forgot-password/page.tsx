'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Recovery Initiated',
      description:
        "If your answer is correct, a password reset link will be sent to your account's email (simulation).",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <div className="mx-auto bg-accent/20 text-accent-foreground p-3 rounded-full w-fit">
              <KeyRound className="h-10 w-10" />
            </div>
            <CardTitle className="text-2xl font-headline mt-4">
              Forgot Password?
            </CardTitle>
            <CardDescription>
              Answer your security question to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="security-question">Security Question</Label>
              <Input
                id="security-question"
                value="What is your favorite pet's name?"
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-answer">Your Answer</Label>
              <Input
                id="security-answer"
                placeholder="Enter your answer"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
            <Button variant="ghost" size="sm" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Unlock
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
