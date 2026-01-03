import { ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { WeekData } from '@/types/roadmap';
import { cn } from '@/lib/utils';

interface WeekCardProps {
  week: WeekData;
  onTopicToggle: (topicId: string, completed: boolean) => void;
}

export function WeekCard({ week, onTopicToggle }: WeekCardProps) {
  const completedCount = week.topics.filter((t) => t.completed).length;
  const totalCount = week.topics.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;
 
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6 transition-all',
        isComplete && 'border-primary/30 bg-accent/20'
      )}
    >
      {/* Week Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground">
            Week {week.weekNumber}: {week.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">{week.goal}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>~{week.estimatedHours}h</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {completedCount} / {totalCount} topics
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Topics */}
      <div className="space-y-3">
        {week.topics.map((topic) => (
          <div
            key={topic.id}
            className={cn(
              'flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors',
              topic.completed ? 'bg-accent/30' : 'bg-accent/10'
            )}
          >
            <Checkbox
              id={topic.id}
              checked={topic.completed}
              onCheckedChange={(checked) =>
                onTopicToggle(topic.id, checked === true)
              }
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <label
                htmlFor={topic.id}
                className={cn(
                  'cursor-pointer text-sm font-medium',
                  topic.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                )}
              >
                {topic.title}
              </label>
            </div>
            <a
              href={topic.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <span className="hidden sm:inline truncate max-w-[120px]">
                {topic.resourceTitle}
              </span>
              <ExternalLink className="h-3 w-3 flex-shrink-0" />
            </a>
          </div>
        ))}
      </div>

      {/* Assignment */}
      <div className="mt-5 rounded-lg bg-accent/50 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Weekly Assignment
        </p>
        <p className="mt-1 text-sm text-foreground">{week.assignment}</p>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-4 flex items-center gap-2 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          <span className="font-medium">{week.weekCompletationMsg}</span>
        </div>
      )}
    </div>
  );
}
