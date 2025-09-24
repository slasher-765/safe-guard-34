import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Trophy, Timer, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { QuestionModal } from "@/components/QuestionModal";

interface DrillStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  action: string;
  completed: boolean;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  userAnswer?: number;
}

interface Drill {
  id: string;
  title: string;
  type: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  participants: number;
  steps: DrillStep[];
}

export const VirtualDrill = () => {
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const drills: Drill[] = [
    {
      id: "earthquake",
      title: "Earthquake Response Drill",
      type: "Seismic Emergency",
      difficulty: "Medium",
      estimatedTime: "5 minutes",
      participants: 450,
      steps: [
        {
          id: 1,
          title: "Drop & Take Cover",
          description: "Drop to hands and knees immediately. Take cover under desk or table.",
          duration: 30,
          action: "Get under your desk now!",
          completed: false,
          question: "What is the correct position during an earthquake?",
          options: ["Stand in doorway", "Drop, Cover, Hold On", "Run outside", "Hide under stairs"],
          correctAnswer: 1
        },
        {
          id: 2,
          title: "Hold Position",
          description: "Hold onto your shelter and protect your head and neck.",
          duration: 60,
          action: "Stay in position, protect your head",
          completed: false,
          question: "How long should you hold your protective position?",
          options: ["5 seconds", "Until shaking stops completely", "30 seconds", "1 minute"],
          correctAnswer: 1
        },
        {
          id: 3,
          title: "Evacuate Safely",
          description: "When shaking stops, evacuate calmly to assembly point.",
          duration: 120,
          action: "Walk quickly to nearest exit",
          completed: false,
          question: "What should you avoid during evacuation?",
          options: ["Using stairs", "Talking to others", "Using elevators", "Walking slowly"],
          correctAnswer: 2
        },
        {
          id: 4,
          title: "Assembly Point",
          description: "Gather at designated safe area and wait for instructions.",
          duration: 90,
          action: "Report to your class teacher",
          completed: false,
          question: "What should you do at the assembly point?",
          options: ["Leave immediately", "Wait for roll call", "Go back inside", "Call parents"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: "fire",
      title: "Fire Emergency Drill",
      type: "Fire Safety",
      difficulty: "Easy",
      estimatedTime: "4 minutes",
      participants: 320,
      steps: [
        {
          id: 1,
          title: "Alert & Alarm",
          description: "Sound the fire alarm and alert others nearby.",
          duration: 15,
          action: "Press fire alarm button",
          completed: false
        },
        {
          id: 2,
          title: "Evacuate Immediately",
          description: "Leave everything and move to nearest exit quickly.",
          duration: 90,
          action: "Exit via stairs, not elevators",
          completed: false
        },
        {
          id: 3,
          title: "Assembly Point",
          description: "Gather at fire assembly point outside building.",
          duration: 60,
          action: "Move to parking area",
          completed: false
        },
        {
          id: 4,
          title: "Roll Call",
          description: "Teachers conduct attendance to ensure all are safe.",
          duration: 75,
          action: "Answer when name is called",
          completed: false
        }
      ]
    },
    {
      id: "flood",
      title: "Flood Response Drill",
      type: "Water Emergency",
      difficulty: "Hard",
      estimatedTime: "7 minutes",
      participants: 280,
      steps: [
        {
          id: 1,
          title: "Move to Higher Ground",
          description: "Immediately move to the highest floor available.",
          duration: 45,
          action: "Go to top floor now",
          completed: false
        },
        {
          id: 2,
          title: "Gather Supplies",
          description: "Collect emergency kit, water, and communication devices.",
          duration: 60,
          action: "Get emergency supplies",
          completed: false
        },
        {
          id: 3,
          title: "Signal for Help",
          description: "Use whistles, flags, or phones to signal rescue teams.",
          duration: 120,
          action: "Signal from highest window",
          completed: false
        },
        {
          id: 4,
          title: "Wait for Rescue",
          description: "Stay calm, conserve energy, wait for rescue teams.",
          duration: 180,
          action: "Stay together and wait",
          completed: false
        }
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleStepComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startDrill = (drill: Drill) => {
    setSelectedDrill({
      ...drill,
      steps: drill.steps.map(step => ({ ...step, completed: false }))
    });
    setCurrentStep(0);
    setTimeLeft(drill.steps[0].duration);
    setIsRunning(true);
  };

  const handleStepComplete = () => {
    if (!selectedDrill) return;

    const currentStepData = selectedDrill.steps[currentStep];
    
    // Show question modal if this step has a question
    if (currentStepData.question && currentStepData.options) {
      setShowQuestionModal(true);
      setIsRunning(false);
      return;
    }

    // Complete step normally if no question
    completeCurrentStep();
  };

  const handleAnswerQuestion = (selectedAnswer: number, isCorrect: boolean) => {
    if (!selectedDrill) return;

    const updatedSteps = [...selectedDrill.steps];
    updatedSteps[currentStep].userAnswer = selectedAnswer;
    updatedSteps[currentStep].completed = true;

    setSelectedDrill({
      ...selectedDrill,
      steps: updatedSteps
    });

    setShowQuestionModal(false);
    
    // Move to next step or complete drill
    if (currentStep < selectedDrill.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeLeft(selectedDrill.steps[currentStep + 1].duration);
      setIsRunning(true);
    } else {
      // Drill completed
      setIsRunning(false);
      setCompletedDrills([...completedDrills, selectedDrill.id]);
    }
  };

  const completeCurrentStep = () => {
    if (!selectedDrill) return;

    const updatedSteps = [...selectedDrill.steps];
    updatedSteps[currentStep].completed = true;

    setSelectedDrill({
      ...selectedDrill,
      steps: updatedSteps
    });

    if (currentStep < selectedDrill.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimeLeft(selectedDrill.steps[currentStep + 1].duration);
    } else {
      // Drill completed
      setIsRunning(false);
      setCompletedDrills([...completedDrills, selectedDrill.id]);
    }
  };

  const pauseDrill = () => {
    setIsRunning(false);
  };

  const resumeDrill = () => {
    setIsRunning(true);
  };

  const resetDrill = () => {
    if (!selectedDrill) return;
    setCurrentStep(0);
    setIsRunning(false);
    setTimeLeft(selectedDrill.steps[0].duration);
    setSelectedDrill({
      ...selectedDrill,
      steps: selectedDrill.steps.map(step => ({ ...step, completed: false }))
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success border-success";
      case "Medium": return "text-warning border-warning";
      case "Hard": return "text-emergency border-emergency";
      default: return "text-info border-info";
    }
  };

  const calculateProgress = () => {
    if (!selectedDrill) return 0;
    const completedSteps = selectedDrill.steps.filter(step => step.completed).length;
    return (completedSteps / selectedDrill.steps.length) * 100;
  };

  if (!selectedDrill) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Virtual Emergency Drills</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice emergency procedures in a safe, controlled environment. Build muscle memory for real disasters.
            </p>
          </div>

          {/* Completed Drills Stats */}
          {completedDrills.length > 0 && (
            <div className="mb-8 text-center">
              <Badge variant="outline" className="text-success border-success text-lg px-4 py-2">
                <Trophy className="w-5 h-5 mr-2" />
                {completedDrills.length} Drill{completedDrills.length > 1 ? 's' : ''} Completed!
              </Badge>
            </div>
          )}

          {/* Drill Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drills.map((drill) => (
              <Card key={drill.id} className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{drill.title}</CardTitle>
                      <CardDescription>{drill.type}</CardDescription>
                    </div>
                    {completedDrills.includes(drill.id) && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className={getDifficultyColor(drill.difficulty)}>
                        {drill.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{drill.estimatedTime}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{drill.participants} participants this week</span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Drill Steps:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {drill.steps.slice(0, 2).map((step) => (
                          <li key={step.id} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {step.title}
                          </li>
                        ))}
                        {drill.steps.length > 2 && (
                          <li className="text-xs">+{drill.steps.length - 2} more steps</li>
                        )}
                      </ul>
                    </div>

                    <Button 
                      onClick={() => startDrill(drill)}
                      className="w-full"
                      variant={completedDrills.includes(drill.id) ? "outline" : "default"}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {completedDrills.includes(drill.id) ? "Practice Again" : "Start Drill"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Drill in progress view
  const currentStepData = selectedDrill.steps[currentStep];
  const isCompleted = currentStep >= selectedDrill.steps.length || selectedDrill.steps.every(step => step.completed);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Question Modal */}
        {showQuestionModal && selectedDrill && selectedDrill.steps[currentStep].question && (
          <QuestionModal
            question={selectedDrill.steps[currentStep].question!}
            options={selectedDrill.steps[currentStep].options!}
            correctAnswer={selectedDrill.steps[currentStep].correctAnswer!}
            onAnswer={handleAnswerQuestion}
            stepTitle={selectedDrill.steps[currentStep].title}
          />
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{selectedDrill.title}</h1>
          <p className="text-muted-foreground">{selectedDrill.type}</p>
          
          {/* Progress */}
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </div>

        {isCompleted ? (
          // Completion View
          <Card className="max-w-2xl mx-auto shadow-glow">
            <CardContent className="pt-8 text-center">
              <div className="bg-gradient-hero p-4 rounded-full inline-block mb-6">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Drill Completed Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Great job! You've successfully completed the {selectedDrill.title}. 
                Your response time and actions were recorded for improvement.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {selectedDrill.steps.length}/{selectedDrill.steps.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Steps Completed</div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {selectedDrill.estimatedTime}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button onClick={resetDrill} variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button onClick={() => setSelectedDrill(null)} className="w-full">
                  Choose Another Drill
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Active Drill View
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Step */}
              <div className="lg:col-span-2">
                <Card className="shadow-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          Step {currentStep + 1}: {currentStepData.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {currentStepData.description}
                        </CardDescription>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-xs text-muted-foreground">Time Left</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-emergency text-white p-6 rounded-lg mb-6">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 animate-pulse-emergency" />
                        <div>
                          <p className="font-bold text-lg">EMERGENCY ACTION REQUIRED</p>
                          <p className="text-lg">{currentStepData.action}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {!isRunning ? (
                        <Button onClick={resumeDrill} variant="success" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          {currentStep === 0 ? "Start" : "Resume"}
                        </Button>
                      ) : (
                        <Button onClick={pauseDrill} variant="warning" className="flex-1">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button onClick={handleStepComplete} variant="outline" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Step Complete
                      </Button>
                      <Button onClick={resetDrill} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Steps Overview */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Drill Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedDrill.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            index === currentStep 
                              ? "border-primary bg-primary/5" 
                              : step.completed 
                                ? "border-success bg-success/5" 
                                : "border-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.completed 
                                ? "bg-success text-white" 
                                : index === currentStep 
                                  ? "bg-primary text-white" 
                                  : "bg-muted text-muted-foreground"
                            }`}>
                              {step.completed ? "✓" : index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{step.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatTime(step.duration)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};