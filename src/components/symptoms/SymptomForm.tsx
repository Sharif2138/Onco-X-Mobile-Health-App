import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
type SymptomFormProps = {
  onSubmit: (symptoms: string[], otherSymptoms: string, image: File | null) => void;
};
const SymptomForm = ({
  onSubmit
}: SymptomFormProps) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const commonSymptoms = ['Lump or swelling', 'Persistent cough', 'Unexplained weight loss', 'Skin changes or discoloration', 'Difficulty swallowing', 'Changes in bowel habits', 'Unusual bleeding', 'Persistent fatigue', 'Persistent pain', 'Night sweats'];
  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]);
    if (error) setError('');
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0 && !otherSymptoms.trim()) {
      setError('Please select at least one symptom or describe your symptoms');
      return;
    }
    onSubmit(selectedSymptoms, otherSymptoms, image);
  };
  return <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select your symptoms (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {commonSymptoms.map(symptom => <div key={symptom} onClick={() => handleSymptomToggle(symptom)} className={`p-3 rounded-xl border cursor-pointer transition ${selectedSymptoms.includes(symptom) ? 'bg-purple-50 border-purple-500' : 'border-gray-300 hover:bg-gray-50'}`}>
              <span className={selectedSymptoms.includes(symptom) ? 'text-purple-700' : 'text-gray-800'}>
                {symptom}
              </span>
            </div>)}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="otherSymptoms" className="block text-sm font-medium text-gray-700 mb-2">
          Other symptoms or concerns (optional)
        </label>
        <textarea id="otherSymptoms" value={otherSymptoms} onChange={e => setOtherSymptoms(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]" placeholder="Please describe any other symptoms you are experiencing..."></textarea>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload an image (optional)
        </label>
        {!imagePreview ? <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <label htmlFor="image" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Click to upload an image</p>
              <p className="text-xs text-gray-400 mt-1">
                JPEG, PNG or GIF, max 10MB
              </p>
            </label>
          </div> : <div className="relative">
            <img src={imagePreview} alt="Uploaded image" className="w-full h-auto rounded-xl object-cover" />
            <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-xl font-medium hover:bg-purple-700 transition">
        Continue
      </button>
    </form>;
};
export default SymptomForm;