import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, HelpCircle } from "lucide-react";

interface QuestionModalProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (selectedAnswer: number, isCorrect: boolean) => void;
  stepTitle: string;
}

export const QuestionModal = ({ question, options, correctAnswer, onAnswer, stepTitle }: QuestionModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === correctAnswer;
      setShowResult(true);
      setTimeout(() => {
        onAnswer(selectedAnswer, isCorrect);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg shadow-glow animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            <Badge variant="outline">{stepTitle}</Badge>
          </div>
          <CardTitle className="text-xl">Knowledge Check</CardTitle>
          <CardDescription>
            Answer this question to complete the drill step
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium text-center">{question}</p>
            </div>

            {!showResult ? (
              <>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? "border-primary bg-primary" : "border-muted"
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleSubmit} 
                  className="w-full"
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <div className="text-center space-y-4">
                {selectedAnswer === correctAnswer ? (
                  <div className="space-y-3">
                    <div className="bg-gradient-hero p-4 rounded-full inline-block">
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-success">Correct Answer!</h3>
                      <p className="text-muted-foreground">Well done! You can proceed to the next step.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gradient-emergency p-4 rounded-full inline-block">
                      <X className="h-12 w-12 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emergency">Incorrect Answer</h3>
                      <p className="text-muted-foreground">
                        The correct answer was: <span className="font-semibold">{options[correctAnswer]}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Don't worry! You can continue and learn more.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center">
                  <div className="animate-pulse text-sm text-muted-foreground">
                    Continuing automatically...
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};