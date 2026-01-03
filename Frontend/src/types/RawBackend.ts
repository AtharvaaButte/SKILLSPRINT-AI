// 1. The Deepest Level: Topic
export interface RawTopic {
  Name: string;
  index?: string;
  ResourceLink?: string;  
  ResourceTitle?: string;
  completed: boolean;
}

// 2. The Week Level
export interface RawWeek {
  Title?: string;
  index?: string;
  EstimatedEffort: string;
  WeekCompletionMessage?: string;
  WeekGoal?: string;
  WeeklyAssignment?: string;
  Topics: {
    Topic: RawTopic[];
  };
}

// 3. The Month Level
export interface RawMonth {
  index?: string;
  StageName: string;
  FocusSummary: string;
  MonthCompletionMessage: string;
  Weeks: {
    Week: RawWeek[];
  };
}

export interface BackendRoadmapResponse {
  id: string;
  Title: string;
  TargetRole: string;
  PrimaryFocus: string;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  Months: {
    Month: RawMonth[];
  };
}

export interface updateTopicData{
  roadmapId: string,
    monthId:string,
    weekId:string,
    topicId:string,
    completed : boolean

}