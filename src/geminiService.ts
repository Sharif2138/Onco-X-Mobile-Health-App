
// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || 'YOUR_FALLBACK_API_KEY');

// export async function generateRiskAssessment(symptoms: string[], followups: string[]) {
//   const prompt = `
//   Given the following patient symptoms and follow-up answers, generate a short risk assessment including:
//   - Risk level (Low, Moderate, High)
//   - Recommendations
//   - Educational content
  
//   Symptoms: ${symptoms.join(', ')}
//   Follow-up Responses: ${followups.join(', ')}

//   Format the response in JSON with the keys:
//   - riskLevel
//   - symptoms (repeat what was observed)
//   - recommendation
//   - educationalContent
//   `;

//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();

//   try {
//     const parsed = JSON.parse(text);
//     return parsed;
//   } catch (e) {
//     console.error('Gemini response could not be parsed:', text);
//     return null;
//   }
// }
