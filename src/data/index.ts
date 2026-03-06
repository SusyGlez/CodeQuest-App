import { Exercise, Topic, Difficulty } from "../types";
import { htmlExercises } from "./html-exercises";
import { cssExercises } from "./css-exercises";
import { jsExercises } from "./js-exercises";

const allExercises: Exercise[] = [
  ...htmlExercises,
  ...cssExercises,
  ...jsExercises,
];

export function getAllExercises(): Exercise[] {
  return allExercises;
}

export function getExercisesByTopic(topic: Topic): Exercise[] {
  return allExercises.filter((e) => e.topic === topic);
}

export function getExercisesByTopicAndDifficulty(
  topic: Topic,
  difficulty: Difficulty,
): Exercise[] {
  return allExercises.filter(
    (e) => e.topic === topic && e.difficulty === difficulty,
  );
}

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find((e) => e.id === id);
}

export function getNextExercise(currentId: string): Exercise | undefined {
  const current = getExerciseById(currentId);
  if (!current) return undefined;

  const topicExercises = getExercisesByTopic(current.topic);
  const idx = topicExercises.findIndex((e) => e.id === currentId);
  return idx < topicExercises.length - 1 ? topicExercises[idx + 1] : undefined;
}

export function getTopicExerciseCounts(topic: Topic): {
  easy: number;
  medium: number;
  hard: number;
  total: number;
} {
  const exercises = getExercisesByTopic(topic);
  return {
    easy: exercises.filter((e) => e.difficulty === "easy").length,
    medium: exercises.filter((e) => e.difficulty === "medium").length,
    hard: exercises.filter((e) => e.difficulty === "hard").length,
    total: exercises.length,
  };
}
