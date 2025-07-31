import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, FileText, MessageSquare, BookOpen, ArrowRight, Shield } from 'lucide-react';
const Interface = () => {
  return <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-br from-purple-50 to-white rounded-3xl mb-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Check your symptoms and get personalized guidance from our
            AI-powered health assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/symptoms" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium shadow-sm hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center">
              Check Your Symptoms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
    </div>;
};
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: string;
};
const FeatureCard = ({
  icon,
  title,
  description,
  step
}: FeatureCardProps) => {
  return <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition-shadow duration-200">
      <div className="absolute -top-4 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
        {step}
      </div>
      <div className="bg-purple-50 rounded-xl p-4 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>;
};
export default Interface;