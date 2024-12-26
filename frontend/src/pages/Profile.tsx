import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Mail, Phone, Building } from 'lucide-react';

export function Profile() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                defaultValue="John Doe"
                icon={<User className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Email"
                type="email"
                defaultValue="john@example.com"
                icon={<Mail className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Phone"
                type="tel"
                defaultValue="+1 234 567 8900"
                icon={<Phone className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Organization"
                defaultValue="Sustania Farms"
                icon={<Building className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Status</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Member Since:</strong> Jan 2023
              </p>
              <p className="text-sm text-gray-600">
                <strong>Plan:</strong> Professional
              </p>
              <p className="text-sm text-gray-600">
                <strong>Next Billing:</strong> Jan 1, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}