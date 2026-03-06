export type Topic = "html" | "css" | "javascript";
export type Difficulty = "easy" | "medium" | "hard";
export type ExerciseStatus = "locked" | "unlocked" | "viewed" | "completed";

export interface Exercise {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  title: string;
  prompt: string;
  starterCode: string;
  solution: string;
  hint: string;
  explanation: string;
  xp: number;
}

export interface UserProgress {
  exerciseStatuses: Record<string, ExerciseStatus>;
}

export interface CheckResult {
  correct: boolean;
  message: string;
}

export interface Route {
  path: string;
  params: Record<string, string>;
}
