import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SymptomForm from '../components/symptoms/SymptomForm';
import FollowUpQuestion from '../components/symptoms/FollowUpQuestion';

const SymptomsPage: React.FC = () => {
  const navigate = useNavigate();

  // Step state
  const [currentStep, setCurrentStep] = useState(0);

  // Symptom data
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Follow-up answers
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});

  // User tracking
  const [userId, setUserId] = useState<string | null>(null);

  const followUpQuestions = [
    {
      id: 'duration',
      question: 'How long have you been experiencing these symptoms?',
      type: 'select',
      options: ['Less than a week', '1-4 weeks', '1-3 months', '3+ months'],
    },
    {
      id: 'severity',
      question: 'How would you rate the severity of your symptoms?',
      type: 'select',
      options: ['Mild', 'Moderate', 'Severe'],
    },
    {
      id: 'family_history',
      question: 'Do you have a family history of cancer?',
      type: 'radio',
      options: ['Yes', 'No', "I don't know"],
    },
    {
      id: 'additional_info',
      question: 'Is there anything else you would like to share about your symptoms?',
      type: 'textarea',
    },
  ];

  // 🔐 Check user session on load
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigate('/login');
      } else {
        setUserId(data.user.id);
      }
    };
    fetchUser();
  }, [navigate]);

  // Step 1 submit
  const handleSymptomSubmit = (selectedSymptoms: string[], otherText: string, uploadedImage: File | null) => {
    setSymptoms(selectedSymptoms);
    setOtherSymptoms(otherText);
    setImage(uploadedImage);
    setCurrentStep(1);
  };

  // Step 2 answers
  const handleFollowUpAnswer = (questionId: string, answer: string) => {
    setFollowUpAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));

    if (currentStep < followUpQuestions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmit();
    }
  };

  // Upload image helper
  const uploadImage = async (): Promise<string | null> => {
    if (!image || !userId) return null;

    const filePath = `${userId}/${Date.now()}_${image.name}`;
    const { error } = await supabase.storage.from('symptom-images').upload(filePath, image);

    if (error) {
      console.error('Image upload failed:', error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from('symptom-images').getPublicUrl(filePath);
    return urlData?.publicUrl ?? null;
  };

  // Final submit adapted for 3 tables
  const handleFinalSubmit = async () => {
    if (!userId) {
      alert('User not logged in.');
      return;
    }

    // 1. Insert into symptoms table
    const { data: symptomData, error: symptomError } = await supabase
      .from('symptoms')
      .insert({
        user_id: userId,
        optional_symptoms: otherSymptoms,
        fixed_symptoms: symptoms, // convert array to string here
        submitted_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (symptomError || !symptomData) {
      alert('Failed to save symptoms. Please try again.');
      console.error(symptomError);
      return;
    }

    const symptomId = symptomData.id;

    // 2. Insert follow-ups
    const followUpRows = Object.entries(followUpAnswers).map(([question, answer]) => ({
      symptom_id: symptomId,
      question,
      answer,
      created_at: new Date().toISOString(),
    }));

    const { error: followUpError } = await supabase.from('follow_ups').insert(followUpRows);

    if (followUpError) {
      alert('Failed to save follow-up answers. Please try again.');
      console.error(followUpError);
      return;
    }

    // 3. Upload image and insert upload record
    if (image) {
      const uploadedUrl = await uploadImage();

      if (uploadedUrl) {
        const { error: uploadError } = await supabase.from('uploads').insert({
          symptom_id: symptomId,
          image_url: uploadedUrl,
          uploaded_at: new Date().toISOString(),
        });

        if (uploadError) {
          alert('Failed to save uploaded image info. Please try again.');
          console.error(uploadError);
          return;
        }
      }
    }

    // Success! Redirect to results
    navigate('/results');
  };

  return (
    <div className="max-w-md mx-auto w-full py-6">
      {currentStep === 0 ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-2">Tell us what you're experiencing</h1>
          <p className="text-gray-600 text-center mb-6">Please share your symptoms so we can provide personalized guidance</p>
          <SymptomForm onSubmit={handleSymptomSubmit} />
        </>
      ) : currentStep <= followUpQuestions.length ? (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Follow-up Questions</h2>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {followUpQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentStep / followUpQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <FollowUpQuestion
            key={followUpQuestions[currentStep - 1].id}
            question={followUpQuestions[currentStep - 1]}
            onAnswer={handleFollowUpAnswer}
          />
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-4">Thank you for your responses</h2>
          <p className="text-gray-600 mb-6">We're preparing your personalized assessment...</p>
          <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto" />
        </div>
      )}
    </div>
  );
};

export default SymptomsPage;
