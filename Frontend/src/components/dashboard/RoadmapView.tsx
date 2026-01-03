import { Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/contexts/DashboardContext';
import { WeekCard } from './WeekCard';
import { MonthCompletionBanner } from './MonthCompletionBanner';
import { cn } from '@/lib/utils';

export function RoadmapView() {
  const {
    selectedRoadmap, 
    selectedMonthIndex,
    setSelectedMonthIndex,
    updateTopicCompletion,
  } = useDashboard();  

  if (!selectedRoadmap) return null;

  const currentMonth = selectedRoadmap.months[selectedMonthIndex];

  const handleTopicToggle = (topicId: string, completed: boolean) => {
    updateTopicCompletion(selectedRoadmap.id, topicId, completed);
  };

  // Calculate overall progress
  const totalTopics = selectedRoadmap.months.reduce(
    (acc, month) =>
      acc + month.weeks.reduce((weekAcc, week) => weekAcc + week.topics.length, 0),
    0
  );
  const completedTopics = selectedRoadmap.months.reduce(
    (acc, month) =>
      acc +
      month.weeks.reduce(
        (weekAcc, week) =>
          weekAcc + week.topics.filter((t) => t.completed).length,
        0
      ),
    0
  );
  const overallProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Check if current month is complete
  const isMonthComplete = currentMonth && currentMonth.weeks.every((week) => {
    const weekTotal = week.topics.length;
    const weekCompleted = week.topics.filter((t) => t.completed).length;
    return weekTotal > 0 && weekCompleted === weekTotal;
  }) && currentMonth.weeks.length > 0;

  return (
    <div className="h-full overflow-auto">
      {/* Roadmap Header */}
      <div className="border-b border-border bg-card/50 px-8 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                <span>Target Role</span>
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-foreground">
                {selectedRoadmap.targetRole}
              </h1>
              <p className="mt-2 max-w-xl text-muted-foreground">
                {selectedRoadmap.overallFocus}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 text-right">
              <span className="text-3xl font-bold text-foreground">
                {overallProgress}%
              </span>
              <span className="text-xs text-muted-foreground">
                {completedTopics} / {totalTopics} topics
              </span>
            </div>
          </div>

          {/* Month Timeline */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
            {selectedRoadmap.months.map((month, index) => {
              const monthTopics = month.weeks.reduce(
                (acc, week) => acc + week.topics.length,
                0
              );
              const monthCompleted = month.weeks.reduce(
                (acc, week) =>
                  acc + week.topics.filter((t) => t.completed).length,
                0
              );
              const isComplete = monthCompleted === monthTopics && monthTopics > 0;

              return (
                <Button
                  key={month.id}
                  variant={selectedMonthIndex === index ? 'default' : 'outline'}
                  onClick={() => setSelectedMonthIndex(index)}
                  className={cn(
                    'flex-shrink-0 gap-2',
                    isComplete && selectedMonthIndex !== index && 'border-primary/50'
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  Month {month.monthNumber}
                  {isComplete && (
                    <span className="ml-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Month Content */}
      {currentMonth && (
        <div className="px-8 py-6">
          <div className="mx-auto max-w-4xl">
            {/* Month Completion Banner */}
            {isMonthComplete && <MonthCompletionBanner />}

            {/* Month Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {currentMonth.stageName}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {currentMonth.focusSummary}
              </p>
            </div>

            {/* Weeks */}
            <div className="space-y-6">
              {currentMonth.weeks.map((week) => (
                <WeekCard
                  key={week.id}
                  week={week}
                  onTopicToggle={handleTopicToggle}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
