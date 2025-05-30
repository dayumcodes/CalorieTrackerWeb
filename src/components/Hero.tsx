
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Apple } from "lucide-react";
import { CardGallery3D } from "./CardGallery3D";

export const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 py-20 lg:py-32 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:mx-0">
            <Badge className="mb-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900">
              🎉 New: AI-Powered Meal Planning
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl lg:text-6xl">
              Track Your
              <span className="text-green-600 dark:text-green-400"> Calories</span>
              <br />
              Effortlessly
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              The most comprehensive calorie tracking app that helps you achieve your health goals. 
              Track nutrition, plan meals, and monitor your progress with our intelligent platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                onClick={() => window.open('https://www.calorietracker.in/', '_blank')}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Tracking Free
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 text-lg">
                <Apple className="mr-2 h-5 w-5" />
                Download App
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span className="font-semibold text-green-600 dark:text-green-400">500K+</span>
                <span className="ml-1">Active Users</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-green-600 dark:text-green-400">4.8★</span>
                <span className="ml-1">App Store Rating</span>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <CardGallery3D />
          </div>
        </div>
      </div>
    </section>
  );
};
