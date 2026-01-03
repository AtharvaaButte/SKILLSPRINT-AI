import { useState } from 'react';
import { Upload, Plus, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboard } from '@/contexts/DashboardContext';
import { Skill, RoadmapFormData } from '@/types/roadmap';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const TARGET_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'Data Scientist',
  'UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'Mobile Developer',
  'Machine Learning Engineer',
];

const DURATIONS = ['2 weeks', '1 month', '2 months', '3 months', '6 months'];
const DAILY_TIMES = ['30 minutes', '1 hour', '1-2 hours', '2-3 hours', '4+ hours'];
const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner (New to the field)' },
  { value: 'intermediate', label: 'Intermediate (Some experience)' },
  { value: 'advanced', label: 'Advanced (Looking to specialize)' },
];

export function RoadmapInputForm() {
  const { createRoadmap, setCurrentView , createRoadmapError , setCreateRoadmapError} = useDashboard();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [targetRole, setTargetRole] = useState('');
  const [duration, setDuration] = useState('');
  const [dailyTime, setDailyTime] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [newSkillName, setNewSkillName] = useState('');

  const addSkill = () => {
    if (newSkillName.trim()) {
      setSkills((prev) => [
        ...prev,
        { id: `skill-${Date.now()}`, name: newSkillName.trim(), level: 'basic' },
      ]);
      setNewSkillName('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const updateSkillLevel = (id: string, level: Skill['level']) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, level } : skill))
    );
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!targetRole || !duration || !dailyTime || !experienceLevel) return;

    const formData: RoadmapFormData = {
      targetRole,
      duration,
      dailyTime,
      experienceLevel,
      notes,
      skills
     
    };
    
    createRoadmap(formData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const isFormValid = targetRole && duration && dailyTime && experienceLevel;

  return (
    <>
      {/*  ERROR DIALOG */}
      <Dialog
        open={Boolean(createRoadmapError)}
        onOpenChange={() => setCreateRoadmapError(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Roadmap Generation Failed</DialogTitle>
            <DialogDescription>
              {createRoadmapError ||
                'Previous roadmap generation failed. Please try again.'}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => setCreateRoadmapError(null)}
              variant="secondary"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    <div className="flex h-full items-start justify-center overflow-auto py-8 px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Create Your Roadmap</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us about your skills and goals to generate a personalized learning path.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          

          {/* Manual Skills */}
          <div className={cn("rounded-xl border border-border bg-card p-6")}>
            <Label className="text-base font-medium text-foreground">Your Skills</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Add skills you already have and rate your proficiency.
            </p>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="e.g., JavaScript, Python, Figma..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button type="button" onClick={addSkill} variant="secondary" size="icon" >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {skills.length > 0 && (
              <div className="mt-4 space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-3 rounded-lg bg-accent/50 px-3 py-2"
                  >
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <Select
                      value={skill.level}
                      onValueChange={(value: Skill['level']) =>
                        updateSkillLevel(skill.id, value)
                      }
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(skill.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Target Role & Configuration */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="target-role">Target Role</Label>
                <Select value={targetRole} onValueChange={setTargetRole}>
                  <SelectTrigger id="target-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGET_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Total Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="daily-time">Daily Time Available</Label>
                <Select value={dailyTime} onValueChange={setDailyTime}>
                  <SelectTrigger id="daily-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {DAILY_TIMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-border bg-card p-6">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              Any specific goals, constraints, or preferences?
            </p>
            <Textarea
              id="notes"
              placeholder="e.g., I want to focus on React, I have weekends free..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-3 min-h-[100px] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentView('empty')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Generate Roadmap
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>

  );
}
