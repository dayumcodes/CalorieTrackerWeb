import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Clock, Heart, Weight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  quote: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jeremiah Jones",
    image: "/lovable-uploads/01d3680d-64c4-49b1-b63c-f9d76022e365.png",
    quote: "Make a healthier choice for your late-night snack and use the Cal AI app to track your calories.",
    role: "Fitness Coach"
  },
  {
    id: 2,
    name: "Dawson Gibbs",
    image: "/lovable-uploads/c209cb36-dd4c-408a-a11e-76a8980d4a3b.png",
    quote: "Track with Cal AI app. If you're not tracking your calories while going for your goals then you're doing it all wrong.",
    role: "Personal Trainer"
  },
  {
    id: 3,
    name: "Hussein Farhat",
    image: "/lovable-uploads/88502a72-677f-4e2c-b805-9be53a6a3c80.png",
    quote: "If you're tracking your calories and macros correctly with Cal AI, you can still stay in shape while eating almost anything and still get in shape as long as it matches your daily goals.",
    role: "Nutrition Expert"
  },
  {
    id: 4,
    name: "Kadin Kerns",
    image: "/lovable-uploads/67f067e9-83c9-49fb-9c04-f9c346a49476.png",
    quote: "Looking good as usual and my calories are too with Cal AI.",
    role: "Fitness Model"
  },
  {
    id: 5,
    name: "Brian Wallack",
    image: "/lovable-uploads/df343f0b-c245-4725-a278-2fd208955db2.png",
    quote: "Cal AI can literally track anything 🤯",
    role: "Strength Coach"
  },
  {
    id: 6,
    name: "Alex Eubank",
    image: "/lovable-uploads/4a53aaa6-0ad9-459f-9ebc-28e1e6d8e356.png",
    quote: "Cal AI is literally the best calorie tracker. Fastest and most accurate I've ever used.",
    role: "Bodybuilder"
  }
];

export const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-[#16181d] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Used by your favorite <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">fitness influencers</span> 
            <span className="ml-2 inline-block transform rotate-12">🔥</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the community of fitness professionals who trust CalorieTracker for their nutrition goals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                
                {/* Image */}
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-[400px] object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300">
                  <div className="flex items-center mb-3">
                    <Quote className="w-6 h-6 text-blue-400 mr-2" />
                  </div>
                  
                  <p className="text-white text-lg font-medium mb-3 leading-snug">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-xl">{testimonial.name}</h3>
                      <p className="text-blue-300 text-sm">{testimonial.role}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className={`absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
              <div className={`absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`} />
            </motion.div>
          ))}
        </div>
        
        {/* Why Choose Cal AI Section */}
        <div className="mt-32">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Why choose Calorie Tracker?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Calorie Tracker is the most advanced calorie tracker.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Free up your time
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              Calorie Tracker automatically calculates your calories, protein, carbs, and fat. You can also add your own foods and recipes. So no need to calculate calories manually.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Integrate with your favorite fitness products
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
              Calorie Tracker integrates with your favorite fitness products. So you can track your calories, protein, carbs, fat AND exercise in one place.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <Weight className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Lose weight effortlessly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Snap a photo with Calorie Tracker, and your phone's depth sensor calculates food volume. Calorie Tracker then analyzes and breaks down your meal to determine calories, protein, carbs, and fat.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Dark Mode Feature Section */}
        <div className="mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 text-xs font-semibold text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400 rounded-full mb-4">
                NEW FEATURE
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Dark Mode <br />
                for a sleek tracking <br />
                experience! <span className="inline-block ml-2">🌙✨</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our new dark mode not only looks amazing but also reduces eye strain during night-time tracking. 
                Toggle between light and dark themes with a single tap.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                New features weekly :)
              </p>
            </motion.div>
            
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img 
                  src="/lovable-uploads/dc7296f0-d63c-4051-8b3e-d27207542257.png" 
                  alt="CalorieTracker Dark Mode" 
                  className="rounded-3xl shadow-2xl mx-auto"
                />
                <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-70 blur-2xl" />
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-70 blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.calorietracker.in/', '_blank');
              }}
            >
              Join the community
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 