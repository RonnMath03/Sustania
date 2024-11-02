import { User } from './types';

export interface User {
  id: string;
  name: string;
  email: string;
  farmSize: number;
  location: string;
  crops: string[];
  createdAt: Date;
}

export interface IrrigationZone {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  moisture: number;
  temperature: number;
  humidity: number;
  lastUpdated: Date;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    condition: string;
    windSpeed: number;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: 'crop-management' | 'tech-support' | 'market-prices' | 'best-practices';
  author: {
    id: string;
    name: string;
    reputation: number;
  };
  likes: number;
  replies: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumComment {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    reputation: number;
  };
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}