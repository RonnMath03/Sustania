export const COMPANY = {
  name: 'Sustania',
  tagline: 'Digital Farming Solutions',
  description: 'Smart irrigation and farm management platform',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  IRRIGATION: '/irrigation',
  FORUM: '/forum',
  WEATHER: '/weather',
  ANALYTICS: '/analytics',
  SUPPORT: '/support',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const MOCK_WEATHER = {
  current: {
    temp: 23,
    humidity: 65,
    condition: 'Partly Cloudy',
    windSpeed: 12,
  },
  forecast: [
    { day: 'Mon', temp: 24, condition: 'Sunny' },
    { day: 'Tue', temp: 23, condition: 'Cloudy' },
    { day: 'Wed', temp: 25, condition: 'Clear' },
    { day: 'Thu', temp: 22, condition: 'Rain' },
    { day: 'Fri', temp: 21, condition: 'Showers' },
  ],
} as const;