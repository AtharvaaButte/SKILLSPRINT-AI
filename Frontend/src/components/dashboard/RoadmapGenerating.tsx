import { useEffect, useState } from "react";
import { GraduationCap, Flag } from "lucide-react";


/**
 * User-facing messages
 */
const milestoneMessages = [
  "Laying down the fundamentals",
  "Strengthening core concepts",
  "Practicing with real examples",
  "Building hands-on projects",
  "Finalizing job-ready roadmap",
];

const TOTAL_DURATION = 30000; // 30 seconds total journey

// Timings when dots activate
const milestoneTimings = [3000, 8000, 14700, 19000, 25000];

// Dot positions along the path
const dotPositions = [0.12, 0.28, 0.47, 0.64, 0.82];

// SVG path (used everywhere, single source of truth)
const PATH =
  "M50 20 C150 80, 250 80, 350 20 C250 120, 150 120, 50 200";

export function RoadmapGenerating() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [journeyCompleted, setJourneyCompleted] = useState(false);

  /**
   * Milestone activation (dots + text)
   */
  useEffect(() => {
    const timeouts = milestoneTimings.map((time, index) =>
      setTimeout(() => {
        setActiveMilestone(index + 1);
      }, time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  /**
   * Journey completion (avatar reaches destination)
   */
  useEffect(() => {
    const doneTimeout = setTimeout(() => {
      setJourneyCompleted(true);
    }, TOTAL_DURATION);

    return () => clearTimeout(doneTimeout);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-full max-w-xl rounded-xl border bg-card p-8">

        {/* Title */}
        <h2 className="mb-6 text-center text-lg font-semibold">
          Mapping your learning journey…
        </h2>

        {/* SVG Journey */}
        <svg viewBox="0 0 400 300" className="mx-auto block w-full" fill="none">

          {/* Path */}
          <path
            d={PATH}
            stroke="hsl(var(--muted))"
            strokeWidth="2"
          />

          {/* Milestone dots */}
          {dotPositions.map((pos, i) => (
            <circle
              key={i}
              r="6"
              className={`transition-colors duration-500 ${
                i < activeMilestone ? "fill-primary" : "fill-muted"
              }`}
            >
              <animateMotion
                dur="0.01s"
                fill="freeze"
                path={PATH}
                keyPoints={`${pos};${pos}`}
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))}

          {/* Avatar (travels full path, disappears ONLY at end) */}
          {!journeyCompleted && (
            <g>
              <animateMotion
                dur={`${TOTAL_DURATION / 1000}s`}
                fill="freeze"
                path={PATH}
              />
              <circle r="14" fill="hsl(var(--primary))" />
              <foreignObject x="-8" y="-8" width="16" height="16">
                <GraduationCap size={16} className="text-primary-foreground" />
              </foreignObject>
            </g>
          )}

          {/* Flag (appears AFTER avatar reaches end) */}
          {journeyCompleted && (
            <g transform="translate(47,178)">
              <Flag className="h-6 w-6 text-primary" />
            </g>
          )}
        </svg>

        {/* Step message */}
        <div className="mt-4 h-6 overflow-hidden text-center">
          <p
            key={activeMilestone}
            className="animate-step-text text-sm text-muted-foreground"
          >
            {milestoneMessages[activeMilestone - 1] ??
              "Initializing your journey…"}
          </p>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Preparing roadmap for{" "}
          <span className="font-medium text-foreground">
            Future Engineer
          </span>
        </p>
      </div>
    </div>
  );
}
