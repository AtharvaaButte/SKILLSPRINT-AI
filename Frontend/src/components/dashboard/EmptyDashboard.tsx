import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/contexts/DashboardContext';

export function EmptyDashboard() {
  const { setCurrentView, roadmaps, selectRoadmap } = useDashboard();

  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
        <Sparkles className="h-8 w-8 text-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-foreground">
        Welcome to SkillSprint AI
      </h1>
      <p className="mt-2 max-w-md text-center text-muted-foreground">
        Create personalized career roadmaps powered by AI. Track your progress and level up your skills.
      </p>
      <Button
        onClick={() => setCurrentView('input')}
        className="mt-8 gap-2 rounded-full px-6"
      >
        Create Your First Roadmap
        <ArrowRight className="h-4 w-4" />
      </Button>

      {roadmaps.length > 0 && (
        <div className="mt-12 w-full max-w-md">
          <p className="mb-4 text-center text-sm font-medium text-muted-foreground">
            Or continue with a recent roadmap
          </p>
          <div className="space-y-2">
            {roadmaps.slice(0, 3).map((roadmap) => (
              <button
                key={roadmap.id}
                onClick={() => selectRoadmap(roadmap.id)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-accent/50"
              >
                <span className="font-medium text-foreground">{roadmap.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
