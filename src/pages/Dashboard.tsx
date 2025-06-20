import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage your projects and collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Manage your ongoing projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Projects</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaborations</CardTitle>
                <CardDescription>
                  Connect with partners and entrepreneurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Find Collaborators</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>
                  Browse available project templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Browse Templates</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

