'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

export default function FaceLock({ onSuccess }: { onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions to use Face ID.',
        });
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate face verification
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden border bg-muted">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        {hasCameraPermission === null && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )}
      </div>

      {hasCameraPermission === false && (
        <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
            Please allow camera access in your browser settings to use this feature.
            </AlertDescription>
        </Alert>
      )}

      <Button onClick={handleVerify} disabled={!hasCameraPermission || isVerifying} className="w-full">
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
          </>
        ) : (
          'Verify My Face'
        )}
      </Button>
    </div>
  );
}
