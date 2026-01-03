import {
  Roadmap,
  MonthData,
  WeekData,
  Topic,
} from "@/types/roadmap";

import { 
  BackendRoadmapResponse ,
  RawMonth,
  RawTopic,
  RawWeek
} from "@/types/RawBackend"

function buildMonthId(roadmapId: string, monthIndex: string) {
  return `m-${roadmapId}-${monthIndex}`;
}

function buildWeekId(
  roadmapId: string,
  monthIndex: string,
  weekIndex: string
) {
  return `w-${roadmapId}-${monthIndex}-${weekIndex}`;
}

function buildTopicId(
  roadmapId: string,
  monthIndex: string,
  weekIndex: string,
  topicIndex: string
) {
  return `t-${roadmapId}-${monthIndex}-${weekIndex}-${topicIndex}`;
}

function parseEstimatedHours(effort?: string): number {
  if (!effort) return 0;

  const nums = effort.match(/\d+/g)?.map(Number);
  if (!nums || nums.length === 0) return 0;

  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

export function mapBackendRoadmap(resRoadmap: BackendRoadmapResponse): Roadmap {
  
  return {
    id: resRoadmap.id,
    title: resRoadmap.Title,
    targetRole: resRoadmap.TargetRole,
    duration: `${(resRoadmap.Months.Month).length} months`,
    createdAt: new Date(resRoadmap.createdAt._seconds * 1000),
    overallFocus: resRoadmap.PrimaryFocus,
    
    months: (resRoadmap.Months.Month).map(
      (month: RawMonth, monthIndex: number): MonthData => ({

        id: buildMonthId(resRoadmap.id, month.index),
        monthNumber: Number(month.index),
        stageName: month.StageName,
        focusSummary: month.FocusSummary,
        MonthCompletionMessage : month.MonthCompletionMessage,

        weeks: (month.Weeks.Week).map(
          (week: RawWeek, weekIndex: number): WeekData => ({

            id: buildWeekId(resRoadmap.id, month.index, week.index), 
            weekNumber: Number(week.index),
            title: week.Title,
            goal: week.WeekGoal,
            assignment: week.WeeklyAssignment,
            estimatedHours: parseEstimatedHours(week.EstimatedEffort),

            topics: (week.Topics.Topic).map(
              (topic: RawTopic, topicIndex: number): Topic => ({
                id: buildTopicId(
                  resRoadmap.id,
                  month.index,
                  week.index,
                  topic.index
                ),

                title: topic.Name,
                resourceTitle: topic.ResourceTitle,
                resourceUrl: topic.ResourceLink,
                completed: topic.completed, 
              })
            ),
          })
        ),
      })
    ),
  };
}
