import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ROUTES, COMPANY } from '@/lib/constants';
import { ArrowRight, Leaf, Droplet, Users, BarChart3 } from 'lucide-react';

export function AboutView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <span className="font-bold text-xl text-primary">{COMPANY.name}</span>
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)}>
              Sign in
            </Button>
            <Button onClick={() => navigate(ROUTES.REGISTER)}>
              Create account
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Smart Farming for a Sustainable Future
            </h1>
            <p className="text-xl text-muted-foreground">
              Optimize your farm's irrigation, monitor crop health, and make data-driven decisions with our comprehensive digital farming solution.
            </p>
            <div className="pt-4">
              <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Droplet className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Irrigation</h3>
              <p className="text-muted-foreground">
                Automated irrigation control with real-time moisture monitoring and scheduling.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Crop Management</h3>
              <p className="text-muted-foreground">
                Track crop health, growth stages, and optimize farming practices.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground">
                Data-driven insights for better decision making and resource optimization.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Connect with other farmers, share knowledge, and get support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of farmers already using {COMPANY.name} to improve their yields.
          </p>
          <div className="space-x-4">
            <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
              Sign in
            </Button>
            <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>
              Create account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 {COMPANY.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}