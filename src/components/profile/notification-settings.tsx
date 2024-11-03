import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    systemUpdates: true,
    weatherAlerts: true,
    moistureAlerts: true,
    forumMentions: true,
    marketingEmails: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: 'Notification settings updated',
      description: 'Your preferences have been saved.',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to receive updates and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important alerts via email
                </p>
              </div>
              <Switch
                checked={settings.emailAlerts}
                onCheckedChange={() => handleToggle('emailAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get instant updates in your browser
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications about system changes and maintenance
                </p>
              </div>
              <Switch
                checked={settings.systemUpdates}
                onCheckedChange={() => handleToggle('systemUpdates')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weather Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important weather updates and warnings
                </p>
              </div>
              <Switch
                checked={settings.weatherAlerts}
                onCheckedChange={() => handleToggle('weatherAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Moisture Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications when moisture levels need attention
                </p>
              </div>
              <Switch
                checked={settings.moistureAlerts}
                onCheckedChange={() => handleToggle('moistureAlerts')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Forum Mentions</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone mentions you
                </p>
              </div>
              <Switch
                checked={settings.forumMentions}
                onCheckedChange={() => handleToggle('forumMentions')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new features and offers
                </p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Preferences'
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}