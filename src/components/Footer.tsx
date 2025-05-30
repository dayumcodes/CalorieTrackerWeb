
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-green-500 mb-4">CalorieTracker</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              The most comprehensive calorie tracking platform that helps you achieve your health and fitness goals 
              through intelligent nutrition monitoring and personalized insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Premium</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CalorieTracker. All rights reserved. Made with ❤️ for healthier living.
          </p>
        </div>
      </div>
    </footer>
  );
};
