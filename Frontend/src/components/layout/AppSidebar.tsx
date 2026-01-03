import { Plus, Map, ChevronLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDashboard } from '@/contexts/DashboardContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeMenu } from './ThemeMenu';
import { LockedOverlay } from '@/components/ui/LockedOverlay';
import { cn } from '@/lib/utils';

const TITLE_LIMIT = 30;

export function AppSidebar() {
  const {
    roadmaps,
    selectedRoadmap,
    selectRoadmap,
    setCurrentView,
    sidebarOpen,
    setSidebarOpen,
    roadmapError,
    isRoadmapsLoading,
  } = useDashboard();

  const { user } = useAuth();

  const handleNewRoadmap = () => {
    if (user) {
      setCurrentView('input');
    }
  };

  const handleSelectRoadmap = (id: string) => {
    if (user) {
      selectRoadmap(id);
    }
  };

  const truncateTitle = (title: string) =>
    title.length > TITLE_LIMIT
      ? title.slice(0, TITLE_LIMIT) + '…'
      : title;

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'
      )}
    >
      {/* Collapse Button */}
      <div className="flex items-center justify-end p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* New Roadmap Button */} 
      <div className="px-4 pb-4">
        <Button
          onClick={handleNewRoadmap}
          disabled={!user}
          className="w-full justify-start gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          New Roadmap
        </Button>
      </div>

      {/* Error banner (STATIC, VISIBLE) */}
      {roadmapError && (
        <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{roadmapError || 'Failed to load roadmaps.'}</span>
        </div>
      )}

      {/* Recent Roadmaps */}
      <div className="relative flex-1 px-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent Roadmaps
        </p>

        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-1 pr-2">
            {/* Loading state */}
            {isRoadmapsLoading && (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                Loading roadmaps…
              </p>
            )}

            {/* Roadmap list */}
            {!isRoadmapsLoading &&
              roadmaps.map((roadmap) => {
                const isLong = roadmap.title.length > TITLE_LIMIT;

                return (
                  <button
                    key={roadmap.id}
                    onClick={() => handleSelectRoadmap(roadmap.id)}
                    disabled={!user}
                    title={isLong ? roadmap.title : undefined} // 👈 hover full title
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                      selectedRoadmap?.id === roadmap.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                    )}
                  >
                    <Map className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {truncateTitle(roadmap.title)}
                    </span>
                  </button>
                );
              })}

            {/* Empty state */}
            { !roadmapError && !isRoadmapsLoading && roadmaps.length === 0 && (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No roadmaps created yet.
              </p>
            )}
          </div>
        </ScrollArea>

        {!user && <LockedOverlay />}
      </div>

      {/* Theme Menu */}
      <div className="border-t border-border p-4">
        <ThemeMenu />
      </div>
    </aside>
  );
}
