import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfo } from './personal-info';
import { FarmDetails } from './farm-details';
import { NotificationSettings } from './notification-settings';
import { SecuritySettings } from './security-settings';
import { User, Sprout, Bell, Shield } from 'lucide-react';

export function ProfileView() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="mr-2 h-4 w-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="farm">
            <Sprout className="mr-2 h-4 w-4" />
            Farm Details
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo />
        </TabsContent>

        <TabsContent value="farm">
          <FarmDetails />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}