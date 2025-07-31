import React, { useState } from 'react';
type QuestionType = {
  id: string;
  question: string;
  type: 'select' | 'textarea';
  options?: string[];
};
type FollowUpQuestionProps = {
  question: QuestionType;
  onAnswer: (questionId: string, answer: string) => void;
};
const FollowUpQuestion = ({
  question,
  onAnswer
}: FollowUpQuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer && question.type !== 'textarea') {
      setError('Please select an answer');
      return;
    }
    onAnswer(question.id, answer);
  };
  return <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
      <h3 className="text-xl font-medium mb-4">{question.question}</h3>
      <form onSubmit={handleSubmit}>
        {question.type === 'select' && question.options && <div className="mb-6">
            <div className="space-y-2">
              {question.options.map(option => <div key={option} onClick={() => {
            setAnswer(option);
            if (error) setError('');
          }} className={`p-4 rounded-xl border cursor-pointer transition ${answer === option ? 'bg-purple-50 border-purple-500' : 'border-gray-300 hover:bg-gray-50'}`}>
                  <span className={answer === option ? 'text-purple-700' : 'text-gray-800'}>
                    {option}
                  </span>
                </div>)}
            </div>
          </div>}
        {question.type === 'radio' && question.options && <div className="mb-6">
            <div className="space-y-2">
              {question.options.map(option => <div key={option} className="flex items-center">
                  <input type="radio" id={option} name={question.id} value={option} checked={answer === option} onChange={() => {
              setAnswer(option);
              if (error) setError('');
            }} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                  <label htmlFor={option} className="ml-2 block text-gray-800">
                    {option}
                  </label>
                </div>)}
            </div>
          </div>}
        {question.type === 'textarea' && <div className="mb-6">
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]" placeholder="Type your answer here..."></textarea>
          </div>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-xl font-medium hover:bg-purple-700 transition">
          {question.type === 'textarea' && !answer ? 'Skip' : 'Continue'}
        </button>
      </form>
    </div>;
};
export default FollowUpQuestion;