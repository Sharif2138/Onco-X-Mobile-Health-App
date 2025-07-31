import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, FileText, MessageSquare, BookOpen, ArrowRight, Shield } from 'lucide-react';
const HomePage = () => {
  return <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-16 bg-gradient-to-br from-purple-50 to-white rounded-3xl mb-10">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
            Early Detection Saves Lives
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Your Personal <span className="text-purple-600">Cancer Risk</span>{' '}
            Assessment
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Check your symptoms and get personalized guidance from our
            AI-powered health assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup" className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium shadow-sm hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center">
              Sign Up to Check Your Symptoms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link to="/learn" className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200">
              Learn More
            </Link>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="w-full py-10 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          How It Works
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto px-4">
          Get personalized health insights in three simple steps
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          <FeatureCard icon={<FileText className="w-8 h-8 text-purple-600" />} title="Share Symptoms" description="Tell us what you're experiencing and upload relevant images for better analysis." step="1" />
          <FeatureCard icon={<AlertCircle className="w-8 h-8 text-purple-600" />} title="Get Risk Assessment" description="Receive a personalized risk report with detailed recommendations." step="2" />
          <FeatureCard icon={<MessageSquare className="w-8 h-8 text-purple-600" />} title="Follow Up" description="Ask questions and get guidance from our AI assistant anytime." step="3" />
        </div>
      </section>
      {/* Trust Section */}
      <section className="w-full py-8 bg-gray-50 rounded-3xl px-4 mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Your Privacy & Security</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h4 className="font-medium mb-2">Data Encryption</h4>
              <p className="text-sm text-gray-600">
                All your health data is encrypted and securely stored
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h4 className="font-medium mb-2">HIPAA Compliant</h4>
              <p className="text-sm text-gray-600">
                We follow strict healthcare privacy standards
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <h4 className="font-medium mb-2">You're in Control</h4>
              <p className="text-sm text-gray-600">
                Manage and delete your data anytime
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Resources Section */}
      <section className="w-full py-8 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Explore Cancer Knowledge
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Learn about different cancer types, prevention, and treatments
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
          <Link to="/learn" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl flex items-center hover:shadow-md transition-shadow duration-200">
            <div className="bg-blue-200 rounded-xl p-3 mr-5">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-blue-900">Cancer Types</h3>
              <p className="text-blue-800 opacity-80">
                Learn about symptoms, risk factors, and treatments
              </p>
            </div>
          </Link>
          <Link to="/learn" className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl flex items-center hover:shadow-md transition-shadow duration-200">
            <div className="bg-green-200 rounded-xl p-3 mr-5">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-900">
                Prevention Tips
              </h3>
              <p className="text-green-800 opacity-80">
                Discover ways to reduce your cancer risk
              </p>
            </div>
          </Link>
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
export default HomePage;