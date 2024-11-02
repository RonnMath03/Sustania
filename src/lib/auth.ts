import { User } from './types';

// Mock admin user
const ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@sustania.com',
  farmSize: 1000,
  location: 'Central Valley, CA',
  crops: ['Wheat', 'Corn', 'Soybeans'],
  createdAt: new Date(),
};

// Mock authentication functions
export async function loginUser(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check for admin credentials
  if (email === 'admin@sustania.com' && password === 'admin123') {
    return ADMIN_USER;
  }

  throw new Error('Invalid credentials');
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
  farmSize: number;
  location: string;
  cropType: string;
}): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would create a new user in the database
  return {
    id: `user-${Date.now()}`,
    name: data.fullName,
    email: data.email,
    farmSize: data.farmSize,
    location: data.location,
    crops: [data.cropType],
    createdAt: new Date(),
  };
}