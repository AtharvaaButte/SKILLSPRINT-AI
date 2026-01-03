import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { EmptyDashboard } from './EmptyDashboard';
import {RoadmapGenerating} from './RoadmapGenerating'
import { RoadmapView } from './RoadmapView';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { RoadmapInputForm } from './RoadmapInputForm';

export function DashboardContent() {
  const { currentView } = useDashboard();
  const { user } = useAuth();

const renderContent = () => {
  
  switch (currentView) {
    case "input":
      return <RoadmapInputForm />;

    case "generating":
      return <RoadmapGenerating />;

    case "roadmap":
      return <RoadmapView />;

    default:
      return <EmptyDashboard />;
  }
};
  return (
    <div className="relative h-full">
      {renderContent()}
      {!user && <LockedOverlay message="Please login to access the dashboard" />}
    </div>
  );
}
