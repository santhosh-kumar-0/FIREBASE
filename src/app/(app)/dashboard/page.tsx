'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { mockAppsData } from '@/lib/apps';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [apps, setApps] = useState(mockAppsData);
  const { toast } = useToast();

  const toggleLock = (id: number) => {
    setApps((prevApps) =>
      prevApps.map((app) => {
        if (app.id === id) {
          const updatedApp = { ...app, locked: !app.locked };
          toast({
            title: `${updatedApp.name} ${updatedApp.locked ? 'Locked' : 'Unlocked'}`,
            description: `Access to ${updatedApp.name} is now ${
              updatedApp.locked ? 'restricted' : 'allowed'
            }.`,
            duration: 2000,
          });
          return updatedApp;
        }
        return app;
      })
    );
  };

  return (
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
          Select which applications you want to secure with Guardian Lock.
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
                className={`transition-all duration-300 ${
                  app.locked
                    ? 'border-primary shadow-lg shadow-primary/20'
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
                  <Switch
                    checked={app.locked}
                    onCheckedChange={() => toggleLock(app.id)}
                    aria-label={`Lock ${app.name}`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
