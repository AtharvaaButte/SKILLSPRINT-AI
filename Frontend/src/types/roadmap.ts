export interface Skill {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'comfortable';
}

export interface Topic {
  id: string;
  title: string;
  resourceUrl: string;
  resourceTitle: string;
  completed: boolean;
}

export interface WeekData {
  id: string;
  weekNumber: number;
  title: string;
  goal: string;
  topics: Topic[];
  assignment: string;
  estimatedHours: number;
  weekCompletationMsg: string;
}

export interface MonthData {
  id: string; 
  monthNumber: number;
  stageName: string;
  focusSummary: string;
  MonthCompletionMessage: string;
  weeks: WeekData[];
}

export interface Roadmap {
  id: string;
  title: string;
  targetRole: string;
  duration: string;
  createdAt: Date;
  months: MonthData[];
  overallFocus: string;
}

export interface RoadmapFormData {
  skills?: Skill[];
  targetRole: string;
  duration: string;
  dailyTime: string;
  experienceLevel: string;
  notes: string;
}
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

