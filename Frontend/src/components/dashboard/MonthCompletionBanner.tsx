import { PartyPopper } from 'lucide-react';
import { useDashboard } from '@/contexts/DashboardContext';

export function MonthCompletionBanner() {
  const {selectedRoadmap ,selectedMonthIndex} = useDashboard();
  return (
    <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
          <PartyPopper className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            🎉 Month Complete!
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {selectedRoadmap.months[selectedMonthIndex].MonthCompletionMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
