import { User, IrrigationZone, WeatherData, ForumPost } from './types';

const API_DELAY = 1000; // Simulate network delay

// Helper to simulate API calls
async function simulateApi<T>(data: T): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, API_DELAY));
  return data;
}

// Auth API
export async function loginApi(email: string, password: string): Promise<User> {
  return simulateApi({
    id: '1',
    name: 'John Doe',
    email,
    farmSize: 1000,
    location: 'Central Valley, CA',
    crops: ['Wheat', 'Corn'],
    createdAt: new Date(),
  });
}

// Irrigation API
export async function getZonesApi(): Promise<IrrigationZone[]> {
  return simulateApi([
    {
      id: '1',
      name: 'North Field',
      status: 'active',
      moisture: 75,
      temperature: 23,
      humidity: 65,
      lastUpdated: new Date(),
    },
    // Add more mock zones...
  ]);
}

// Weather API
export async function getWeatherApi(): Promise<WeatherData> {
  return simulateApi({
    current: {
      temp: 23,
      humidity: 65,
      condition: 'Partly Cloudy',
      windSpeed: 12,
    },
    forecast: [
      { day: 'Mon', temp: 24, condition: 'Sunny' },
      { day: 'Tue', temp: 23, condition: 'Cloudy' },
      // Add more forecast days...
    ],
  });
}

// Forum API
export async function getForumPostsApi(): Promise<ForumPost[]> {
  return simulateApi([
    {
      id: '1',
      title: 'Tips for optimizing irrigation',
      content: 'Here are some tips...',
      category: 'best-practices',
      author: {
        id: '1',
        name: 'John Smith',
        reputation: 456,
      },
      likes: 24,
      replies: 12,
      views: 234,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more mock posts...
  ]);
}