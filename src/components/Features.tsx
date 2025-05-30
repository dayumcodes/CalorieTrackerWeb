
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Camera, Target, Users, Smartphone, Zap } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photo Food Logging",
    description: "Simply take a photo of your meal and our AI will automatically identify and log the calories and nutrients."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive charts and insights to track your progress and understand your eating patterns."
  },
  {
    icon: Target,
    title: "Personalized Goals",
    description: "Set custom calorie and macro targets based on your lifestyle, activity level, and health objectives."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with like-minded individuals, share recipes, and get motivation from our active community."
  },
  {
    icon: Smartphone,
    title: "Multi-Platform Sync",
    description: "Access your data seamlessly across all devices with real-time synchronization."
  },
  {
    icon: Zap,
    title: "Quick Entry",
    description: "Log meals in seconds with our extensive database of over 11 million foods and barcode scanner."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to
            <span className="text-green-600"> Succeed</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools makes calorie tracking simple, accurate, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
