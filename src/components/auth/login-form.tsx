import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/lib/auth';
import { userAtom, isAuthenticatedAtom } from '@/lib/store';
import { ROUTES } from '@/lib/constants';

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await loginUser(formData.email, formData.password);
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });

      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid email or password. Try admin@sustania.com / admin123',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-[400px] mx-auto shadow-md">
      <CardHeader className="space-y-1">
        <div className="flex flex-col items-center mb-4">
        <img 
          src="src/components/img/logo.gif" 
          alt="Sustania Logo" 
          className="h-12 w-12 mb-2 object-contain"
        />
          <h1 className="text-3xl font-bold text-primary">Sustania</h1>
          <p className="text-gray-500">Digital Farming Solutions</p>
        </div>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, remember: checked as boolean }))
                }
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 text-center text-sm">
            <Button variant="link" className="text-primary">
              Forgot your password?
            </Button>
            <div className="text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="text-primary p-0"
                onClick={() => navigate(ROUTES.REGISTER)}
              >
                Create account
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}