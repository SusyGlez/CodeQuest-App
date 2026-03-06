import { UserProgress, ExerciseStatus } from "../types";

const STORAGE_KEY = "codequest_progress";

function getDefaultProgress(): UserProgress {
  return {
    exerciseStatuses: {},
  };
}

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.exerciseStatuses === "object") {
      return parsed as UserProgress;
    }
    return getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getExerciseStatus(exerciseId: string): ExerciseStatus {
  const progress = getProgress();
  return progress.exerciseStatuses[exerciseId] || "locked";
}

export function setExerciseStatus(
  exerciseId: string,
  status: ExerciseStatus,
): void {
  const progress = getProgress();
  // Don't downgrade: completed > viewed > unlocked > locked
  const current = progress.exerciseStatuses[exerciseId];
  if (current === "completed" && status !== "completed") return;
  if (current === "viewed" && status === "unlocked") return;

  progress.exerciseStatuses[exerciseId] = status;
  saveProgress(progress);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCompletedCount(exerciseIds: string[]): number {
  const progress = getProgress();
  return exerciseIds.filter(
    (id) => progress.exerciseStatuses[id] === "completed",
  ).length;
}
