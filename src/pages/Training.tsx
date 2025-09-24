import { useState } from "react";
import { Book, Clock, CheckCircle, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { disasterModules, sampleQuiz } from "@/data/app-data";
import { Link } from "react-router-dom";

export const Training = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = (moduleId: number) => {
    setSelectedModule(moduleId);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === sampleQuiz.questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Mountain: () => <div className="w-8 h-8 bg-gradient-emergency rounded-full flex items-center justify-center text-white">🏔️</div>,
      Waves: () => <div className="w-8 h-8 bg-gradient-safety rounded-full flex items-center justify-center text-white">🌊</div>,
      Flame: () => <div className="w-8 h-8 bg-gradient-emergency rounded-full flex items-center justify-center text-white">🔥</div>,
      Wind: () => <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center text-white">💨</div>,
    };
    return icons[iconName] || icons.Mountain;
  };

  if (quizStarted && !showResults) {
    const question = sampleQuiz.questions[currentQuestion];
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setQuizStarted(false)}>
              ← Back to Modules
            </Button>
          </div>
          
          <Card className="shadow-card-custom">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{sampleQuiz.title}</CardTitle>
                <Badge variant="outline">
                  {currentQuestion + 1} / {sampleQuiz.questions.length}
                </Badge>
              </div>
              <Progress value={((currentQuestion + 1) / sampleQuiz.questions.length) * 100} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-xl font-semibold">{question.question}</h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:bg-accent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="w-full"
                variant="hero"
              >
                {currentQuestion < sampleQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / sampleQuiz.questions.length) * 100;
    
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-card-custom text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-safety rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">
                You scored {score} out of {sampleQuiz.questions.length} questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold text-success">
                {percentage.toFixed(0)}%
              </div>
              
              <div className="space-y-2">
                <Progress value={percentage} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  {percentage >= 80 ? 'Excellent work!' : 
                   percentage >= 60 ? 'Good job!' : 
                   'Keep practicing!'}
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button variant="hero" onClick={() => setQuizStarted(false)}>
                  Back to Training
                </Button>
                <Button variant="outline" onClick={() => {
                  setQuizStarted(true);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                  setShowResults(false);
                }}>
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Disaster Preparedness Training</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master essential skills to prepare for and respond to various disaster scenarios. 
            Complete modules to earn certificates and improve your preparedness score.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {disasterModules.map((module) => {
            const IconComponent = getIconComponent(module.icon);
            
            return (
              <Card key={module.id} className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent />
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </div>
                      </div>
                    </div>
                    <Badge variant={module.status === "Complete" ? "default" : "secondary"}>
                      {module.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="w-full" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="hero" 
                      className="flex-1"
                      onClick={() => handleStartQuiz(module.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                    <Button variant="outline" size="icon">
                      <Book className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our support team or visit the emergency portal for immediate assistance.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/emergency">Emergency Portal</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/reporting">Get Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};