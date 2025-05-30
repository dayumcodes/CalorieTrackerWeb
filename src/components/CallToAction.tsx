
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-700 dark:to-blue-700 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Ready to Transform Your Health?
        </h2>
        <p className="mt-6 text-xl text-green-100 max-w-3xl mx-auto">
          Join thousands of users who have already achieved their health goals with CalorieTracker. 
          Start your journey today - it's completely free!
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => window.open('https://www.calorietracker.in/', '_blank')}
          >
            <ArrowRight className="mr-2 h-5 w-5" />
            Get Started Free
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-semibold"
          >
            <Download className="mr-2 h-5 w-5" />
            Download App
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold">500K+</div>
            <div className="text-green-100">Active Users</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold">11M+</div>
            <div className="text-green-100">Foods in Database</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold">4.8★</div>
            <div className="text-green-100">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
