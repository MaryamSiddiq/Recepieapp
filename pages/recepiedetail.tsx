// components/CookRecipePage.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tabs, Tab, Box, Typography } from '@mui/material';
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

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CookRecipePage: React.FC = () => {
  const router = useRouter();
  const { recipe } = router.query;

  const parsedRecipe: Recipe | null = recipe ? JSON.parse(recipe as string) : null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(parsedRecipe ? parsedRecipe.steps[0].time * 60 : 0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepSpeechCompleted, setStepSpeechCompleted] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '101vh', marginTop: '-20px', marginLeft: '-7px', padding: '0px' }}>
      <img src={parsedRecipe.imageUrl} alt={parsedRecipe.name} style={{ maxWidth: '100%', width: '110%', height: '340px', margin: '10px 0' }} />
      
      <Box sx={{ width: '100%' }}>
        <Tabs 
          value={tabIndex} 
          onChange={handleTabChange} 
          aria-label="recipe tabs"
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: 'black',
            },
          }}
        >
          <Tab 
            style={{ 
              color: tabIndex === 0 ? 'white' : 'black', 
              backgroundColor: tabIndex === 0 ? 'black' : 'white',
              fontSize: '16px',
              borderRadius: '5px'
            }} 
            label="Steps" 
            {...a11yProps(0)} 
          />
          <Tab 
            style={{ 
              color: tabIndex === 1 ? 'white' : 'black', 
              backgroundColor: tabIndex === 1 ? 'black' : 'white',
              fontSize: '16px',
              borderRadius: '5px'
            }} 
            label="Description" 
            {...a11yProps(1)} 
          />
          <Tab 
            style={{ 
              color: tabIndex === 2 ? 'white' : 'black', 
              backgroundColor: tabIndex === 2 ? 'black' : 'white',
              fontSize: '16px',
              borderRadius: '5px'
            }} 
            label="Ingredients" 
            {...a11yProps(2)} 
          />
        </Tabs>
        
        <TabPanel value={tabIndex} index={0}>
          {parsedRecipe.steps.map((step, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h2>Step {index + 1}: </h2>
              <p>{step.description}</p>
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
        </TabPanel>
        
        <TabPanel value={tabIndex} index={1}>
          <p><strong>Description:</strong> {parsedRecipe.description}</p>
        </TabPanel>
        
        <TabPanel value={tabIndex} index={2}>
          <h4>Ingredients:</h4>
          <ul>
            {parsedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </TabPanel>
      </Box>
    </div>
  );
};

export default CookRecipePage;
