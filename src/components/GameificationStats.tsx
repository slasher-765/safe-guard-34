import { Trophy, Star, Zap, Target, Award, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

export const GameificationStats = () => {
  const userStats = {
    level: 7,
    xp: 2850,
    nextLevelXp: 3000,
    drillsCompleted: 12,
    quizzesCompleted: 8,
    badgesEarned: 5,
    streak: 7
  };

  const achievements: Achievement[] = [
    {
      id: "first-drill",
      title: "First Responder",
      description: "Complete your first emergency drill",
      icon: Target,
      earned: true
    },
    {
      id: "quiz-master",
      title: "Knowledge Seeker",
      description: "Score 100% on 5 safety quizzes",
      icon: Star,
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: "streak-master",
      title: "Consistency Champion",
      description: "Maintain a 7-day learning streak",
      icon: Zap,
      earned: true
    },
    {
      id: "team-player",
      title: "Team Leader",
      description: "Help 10 classmates with safety training",
      icon: Users,
      earned: false,
      progress: 6,
      maxProgress: 10
    },
    {
      id: "drill-expert",
      title: "Drill Expert",
      description: "Complete all emergency drill types",
      icon: Award,
      earned: false,
      progress: 2,
      maxProgress: 3
    }
  ];

  const getXpProgress = () => {
    const currentLevelXp = (userStats.level - 1) * 500;
    const progressInLevel = userStats.xp - currentLevelXp;
    const xpForNextLevel = userStats.nextLevelXp - currentLevelXp;
    return (progressInLevel / xpForNextLevel) * 100;
  };

  return (
    <div className="space-y-6">
      {/* User Level & XP */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Level {userStats.level}</h3>
              <p className="text-white/80">Safety Champion</p>
            </div>
            <div className="text-right">
              <Trophy className="h-12 w-12 text-yellow-400 mb-2" />
              <p className="text-sm text-white/80">{userStats.xp} XP</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{userStats.xp}/{userStats.nextLevelXp} XP</span>
            </div>
            <Progress value={getXpProgress()} className="h-2 bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.drillsCompleted}</div>
              <p className="text-sm text-muted-foreground">Drills Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{userStats.quizzesCompleted}</div>
              <p className="text-sm text-muted-foreground">Quizzes Passed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{userStats.badgesEarned}</div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emergency">{userStats.streak}</div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock badges by completing safety challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                    achievement.earned 
                      ? "bg-success/5 border-success/20" 
                      : "bg-muted/50 border-muted"
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    achievement.earned 
                      ? "bg-success text-white" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      {achievement.earned && (
                        <Badge variant="outline" className="text-success border-success text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};