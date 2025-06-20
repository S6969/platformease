import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Rocket, Users, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      console.log(`User selected role: ${selectedRole}`);
      // Store the selected role for later use
      localStorage.setItem('user-role', selectedRole);
      // Navigate to account creation
      navigate('/create-account');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              🎯 Let's Get You Started Right.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Tell us how you want to use PlatformEase so we can tailor your experience.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              👤 Who are you here as?
            </h2>

            <RadioGroup 
              value={selectedRole} 
              onValueChange={setSelectedRole}
              className="space-y-6"
            >
              <div className="relative">
                <RadioGroupItem 
                  value="entrepreneur" 
                  id="entrepreneur"
                  className="peer sr-only"
                />
                <label 
                  htmlFor="entrepreneur"
                  className="flex cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4 w-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        💡 I'm an Entrepreneur
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        I have an idea or project I want to launch. I'm looking for tools, templates, and collaborators to help me build and grow.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="relative">
                <RadioGroupItem 
                  value="partner" 
                  id="partner"
                  className="peer sr-only"
                />
                <label 
                  htmlFor="partner"
                  className="flex cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-violet-500 peer-checked:bg-violet-50 dark:peer-checked:bg-violet-900/20 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4 w-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        🧠 I'm a Partner
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        I want to join existing projects and offer my skills in design, development, marketing, or product strategy.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-8">
            <Button 
              onClick={handleContinue}
              disabled={!selectedRole}
              className="w-full sm:w-auto px-8 py-3 text-lg"
            >
              {selectedRole === 'entrepreneur' ? '🟣 Continue as Entrepreneur' : 
               selectedRole === 'partner' ? '⚪ Continue as Partner' : 
               'Select a role to continue'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🤝 Why we ask:
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Choosing your path helps us personalize your dashboard, suggest the right templates, and match you with people or projects that fit your goals.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              🔐 You can always switch roles later from your profile settings.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoleSelection;
