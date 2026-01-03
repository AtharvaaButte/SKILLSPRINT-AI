import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Roadmap, RoadmapFormData } from '@/types/roadmap';
import { mapBackendRoadmap } from '@/utils/mapBackendRoadmap'
import { createRoadmapFromSkillsAPI, getAllRoadmapsAPI, updateTopicAPI } from '@/api/roadmap.api'
import { updateTopicData } from '@/types/RawBackend';
import { log } from 'console';
type DashboardView = 'empty' | 'input' | 'roadmap' | 'generating';

interface DashboardContextType {
  currentView: DashboardView;
  setCurrentView: (view: DashboardView) => void;
  roadmaps: Roadmap[];
  initlizeRoadmap: () => void;
  selectedRoadmap: Roadmap | null;
  selectRoadmap: (id: string) => void;
  createRoadmap: (data: RoadmapFormData) => void;
  updateTopicCompletion: (roadmapId: string, topicId: string, completed: boolean) => void;
  selectedMonthIndex: number;
  setSelectedMonthIndex: (index: number) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  roadmapError: string | null;
  isRoadmapsLoading: boolean;
  createRoadmapError: string | null;
  setCreateRoadmapError: (error: string | null) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<DashboardView>('empty');
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRoadmapsLoading, setIsRoadmapsLoading] = useState(false);
  const [roadmapError, setRoadmapError] = useState<string | null>(null);
  const [createRoadmapError, setCreateRoadmapError] = useState<string | null>(null);

  
  const initlizeRoadmap = async () => {
    setIsRoadmapsLoading(true);
    setRoadmapError(null);

    try {
      const res = await getAllRoadmapsAPI();
      console.log(res)
      if (!res.status) {
        throw new Error(res.error || 'Failed to load roadmaps');
      }

      const mappedRoadmaps = (res.roadmaps || []).map(mapBackendRoadmap);
      setRoadmaps(mappedRoadmaps);
    } catch (error: unknown) {
      console.error('Error loading roadmaps:', error);

      setRoadmaps([]);
      setRoadmapError(
        error?.message || 'Something went wrong while loading roadmaps.'
      );
    } finally {
      setIsRoadmapsLoading(false);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      await initlizeRoadmap();
    }
    loadData();
  }, [])

  const selectRoadmap = (id: string) => {
    const roadmap = roadmaps.find((r) => r.id === id);
    if (roadmap) {
      setSelectedRoadmap(roadmap);
      setSelectedMonthIndex(0);
      setCurrentView('roadmap');
    }
  };

const createRoadmap = async (data: RoadmapFormData) => {
  setCurrentView("generating");

  try {
    const res = await createRoadmapFromSkillsAPI(data);

    if (!res.status || !res.roadmap) {
      throw new Error(res.error || "Failed to create roadmap");
    }

    const newRoadmap = mapBackendRoadmap(res.roadmap);

    setRoadmaps((prev) => [newRoadmap, ...prev]);
    setSelectedRoadmap(newRoadmap);
    setSelectedMonthIndex(0);

    setCurrentView("roadmap");

  } catch (error: any) {
    console.error("Error creating roadmap:", error);
    setCreateRoadmapError(error?.message);
    setCurrentView("input");

  }
};

  const updateTopicCompletion = async (roadmapId: string, topicId: string, completed: boolean) => {

    setRoadmaps((prev) =>
      prev.map((roadmap) => {
        if (roadmap.id !== roadmapId) return roadmap;
        return {
          ...roadmap,
          months: roadmap.months.map((month) => ({
            ...month,
            weeks: month.weeks.map((week) => ({
              ...week,
              topics: week.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed } : topic
              ),
            })),
          })),
        };
      })
    );

    if (selectedRoadmap?.id === roadmapId) {
      setSelectedRoadmap((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          months: prev.months.map((month) => ({
            ...month,
            weeks: month.weeks.map((week) => ({
              ...week,
              topics: week.topics.map((topic) =>
                topic.id === topicId ? { ...topic, completed } : topic
              ),
            })),
          })),
        };
      });
    }

    const parts = topicId.split('-')
    const data: updateTopicData = {
      roadmapId: parts[1],
      monthId: parts[2],
      weekId: parts[3],
      topicId: parts[4],
      completed: completed,
    }
    const res = await updateTopicAPI(data)
  };

  return (
    <DashboardContext.Provider
      value={{
        currentView,
        setCurrentView,
        roadmaps,
        initlizeRoadmap,
        selectedRoadmap,
        selectRoadmap,
        createRoadmap,
        updateTopicCompletion,
        selectedMonthIndex,
        setSelectedMonthIndex,
        sidebarOpen,
        setSidebarOpen,
        roadmapError,
        isRoadmapsLoading,
        createRoadmapError,
        setCreateRoadmapError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
