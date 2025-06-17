import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder QR code image - replace with your actual GPay QR code image
const placeholderQRCode = "/lovable-uploads/qr.png";

const Support = () => {
  // Track if QR code is shown
  const [showQR, setShowQR] = useState(false);

  // Close QR on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowQR(false);
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Support This Project
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              If you found this app helpful, consider buying me a coffee!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - information */}
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <Coffee className="h-8 w-8 text-amber-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buy Me a Coffee</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your support helps me continue developing and maintaining this calorie tracker app. 
                  Every coffee makes a difference and is greatly appreciated!
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-200 min-w-[100px]">Small</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">₹50</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">- A quick espresso</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-200 min-w-[100px]">Medium</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">₹100</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">- A nice latte</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-200 min-w-[100px]">Large</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">₹200</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">- A fancy coffee with cake</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowQR(true)}
                  className="mt-8 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Coffee className="mr-2 h-5 w-5" />
                  Show QR Code
                </Button>
              </div>

              {/* Right side - QR code or illustration */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 flex items-center justify-center relative">
                {showQR ? (
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-xl shadow-lg inline-block">
                      <img 
                        src={placeholderQRCode} 
                        alt="GPay QR Code" 
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                      Scan with your GPay app to support
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => setShowQR(false)}
                      className="mt-4"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/c209cb36-dd4c-408a-a11e-76a8980d4a3b.png"
                      alt="Coffee illustration" 
                      className="w-64 h-64 object-contain opacity-90"
                    />
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      Click "Show QR Code" to support the project
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/" className="text-green-600 dark:text-green-400 hover:underline">
              Return to homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Support; 