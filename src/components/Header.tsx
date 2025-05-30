import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors border-b border-white/20 dark:border-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">CalorieTracker</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-transparent border-none cursor-pointer">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-transparent border-none cursor-pointer">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors bg-transparent border-none cursor-pointer">
                Contact
              </button>
              <ThemeToggle />
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('https://www.calorietracker.in/', '_blank')}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none focus:text-green-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t dark:border-gray-700/20">
            <button onClick={() => { scrollToSection('features'); setIsMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium bg-transparent border-none cursor-pointer">
              Features
            </button>
            <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium bg-transparent border-none cursor-pointer">
              About
            </button>
            <button onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium bg-transparent border-none cursor-pointer">
              Contact
            </button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white w-full mt-2"
              onClick={() => window.open('https://www.calorietracker.in/', '_blank')}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
