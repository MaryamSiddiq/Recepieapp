import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import Drawer from './drawer';

interface Step {
  description: string;
  time: number;
}

interface Recipe {
  name: string;
  cookingTime: string;
  description: string;
  ingredients: string[];
  steps: Step[];
  imageUrl: string;
}

const CookRecipePage: React.FC = () => {
  const router = useRouter();
  const { recipe } = router.query;

  const parsedRecipe: Recipe | null = recipe ? JSON.parse(recipe as string) : null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(parsedRecipe ? parsedRecipe.steps[0].time * 60 : 0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepSpeechCompleted, setStepSpeechCompleted] = useState(false);

  useEffect(() => {
    if (parsedRecipe && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      if (!stepSpeechCompleted) {
        const currentStep = parsedRecipe.steps[currentStepIndex];
        speakStepDescription(currentStep.description, currentStepIndex, currentStep.time);
        setStepSpeechCompleted(true);
      }

      return () => clearInterval(timer);
    } else if (parsedRecipe && currentStepIndex < parsedRecipe.steps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
      setTimeRemaining(parsedRecipe.steps[currentStepIndex + 1].time * 60);
      setCompletedSteps((prevSteps) => [...prevSteps, currentStepIndex]);
      setStepSpeechCompleted(false);
    } else if (parsedRecipe) {
      setCompletedSteps((prevSteps) => [...prevSteps, currentStepIndex]);
    }
  }, [timeRemaining, currentStepIndex, parsedRecipe, stepSpeechCompleted]);

  if (!parsedRecipe) return <div>Loading...</div>;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const speakStepDescription = (description: string, stepIndex: number, time: number) => {
    const formattedTime = formatTime(time * 60);
    const speechText = `Step ${stepIndex + 1}. ${description}. Timer set for ${time} minutes.`;
    console.log('Speaking:', speechText);
    const utterance = new SpeechSynthesisUtterance(speechText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Drawer />
      <h1>Cooking: {parsedRecipe.name}</h1>
      <img src={parsedRecipe.imageUrl} alt={parsedRecipe.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', margin: '10px 0' }} />
      {parsedRecipe.steps.map((step, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>Step {index + 1}: {step.description}</h2>
          {completedSteps.includes(index) ? (
            <p>Step completed</p>
          ) : (
            <>
              <h3>Time Remaining: {index === currentStepIndex ? formatTime(timeRemaining) : 'Completed'}</h3>
              {index === currentStepIndex && (
                <button onClick={() => setTimeRemaining(0)}>Skip this step</button>
              )}
            </>
          )}
        </div>
      ))}
      <h4>Ingredients:</h4>
      <ul>
        {parsedRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Description:</strong> {parsedRecipe.description}</p>
      <p><strong>Total Cooking Time:</strong> {parsedRecipe.cookingTime}</p>
    </div>
  );
};

export default CookRecipePage;
