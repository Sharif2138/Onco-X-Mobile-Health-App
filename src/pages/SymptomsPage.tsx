import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SymptomForm from '../components/symptoms/SymptomForm';
import FollowUpQuestion from '../components/symptoms/FollowUpQuestion';
const SymptomsPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const followUpQuestions = [{
    id: 'duration',
    question: 'How long have you been experiencing these symptoms?',
    type: 'select',
    options: ['Less than a week', '1-4 weeks', '1-3 months', '3+ months']
  }, {
    id: 'severity',
    question: 'How would you rate the severity of your symptoms?',
    type: 'select',
    options: ['Mild', 'Moderate', 'Severe']
  }, {
    id: 'family_history',
    question: 'Do you have a family history of cancer?',
    type: 'radio',
    options: ['Yes', 'No', "I don't know"]
  }, {
    id: 'additional_info',
    question: 'Is there anything else you would like to share about your symptoms?',
    type: 'textarea'
  }];
  const handleSymptomSubmit = (selectedSymptoms: string[], otherText: string, uploadedImage: File | null) => {
    setSymptoms(selectedSymptoms);
    setOtherSymptoms(otherText);
    setImage(uploadedImage);
    setCurrentStep(1);
  };
  const handleFollowUpAnswer = (questionId: string, answer: string) => {
    setFollowUpAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    if (currentStep < followUpQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit all data
      handleFinalSubmit();
    }
  };
  const handleFinalSubmit = () => {
    // In a real app, we would send all data to the backend here
    console.log({
      symptoms,
      otherSymptoms,
      image,
      followUpAnswers
    });
    // Navigate to results page
    navigate('/results');
  };
  return <div className="max-w-md mx-auto w-full py-6">
      {currentStep === 0 ? <>
          <h1 className="text-2xl font-bold text-center mb-2">
            Tell us what you're experiencing
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Please share your symptoms so we can provide personalized guidance
          </p>
          <SymptomForm onSubmit={handleSymptomSubmit} />
        </> : currentStep <= followUpQuestions.length ? <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Follow-up Questions</h2>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {followUpQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{
            width: `${currentStep / followUpQuestions.length * 100}%`
          }}></div>
            </div>
          </div>
          <FollowUpQuestion key={followUpQuestions[currentStep - 1].id} question={followUpQuestions[currentStep - 1]} onAnswer={handleFollowUpAnswer} />
        </> : <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-4">
            Thank you for your responses
          </h2>
          <p className="text-gray-600 mb-6">
            We're preparing your personalized assessment...
          </p>
          <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
        </div>}
    </div>;
};
export default SymptomsPage;