import { Topic, Difficulty, ExerciseStatus } from "../types";
import { getExercisesByTopic, getExercisesByTopicAndDifficulty } from "../data";
import { getProgress, getCompletedCount } from "../utils/storage";
import { renderProgressBar } from "./progress-bar";
import { navigate } from "../utils/router";

const TOPIC_CONFIG: {
  topic: Topic;
  label: string;
  icon: string;
  color: string;
  borderColor: string;
}[] = [
  {
    topic: "html",
    label: "HTML",
    icon: "🌐",
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
  },
  {
    topic: "css",
    label: "CSS",
    icon: "🎨",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
  },
  {
    topic: "javascript",
    label: "JavaScript",
    icon: "⚡",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/30",
  },
];

export function isTopicUnlocked(topic: Topic): boolean {
  if (topic === "html") return true;
  if (topic === "css") {
    // CSS unlocks when all HTML exercises are completed
    const htmlExercises = getExercisesByTopic("html");
    const completed = getCompletedCount(htmlExercises.map((e) => e.id));
    return completed === htmlExercises.length;
  }
  if (topic === "javascript") {
    // JS unlocks when all CSS exercises are completed
    if (!isTopicUnlocked("css")) return false;
    const cssExercises = getExercisesByTopic("css");
    const completed = getCompletedCount(cssExercises.map((e) => e.id));
    return completed === cssExercises.length;
  }
  return false;
}

export function getExerciseUnlockStatus(
  exerciseId: string,
  topic: Topic,
  difficulty: Difficulty,
  index: number,
): ExerciseStatus {
  const progress = getProgress();
  const stored = progress.exerciseStatuses[exerciseId];
  if (stored === "completed" || stored === "viewed") return stored;

  // Topic must be unlocked
  if (!isTopicUnlocked(topic)) return "locked";

  // First exercise of easy is always unlocked
  if (difficulty === "easy" && index === 0) return stored || "unlocked";

  // Within same difficulty: previous must be completed
  const sameDifficultyExercises = getExercisesByTopicAndDifficulty(
    topic,
    difficulty,
  );
  if (index > 0) {
    const prevId = sameDifficultyExercises[index - 1].id;
    const prevStatus = progress.exerciseStatuses[prevId];
    if (prevStatus === "completed") return stored || "unlocked";
    return "locked";
  }

  // First exercise of medium: all easy must be completed
  if (difficulty === "medium") {
    const easyExercises = getExercisesByTopicAndDifficulty(topic, "easy");
    const completed = getCompletedCount(easyExercises.map((e) => e.id));
    return completed === easyExercises.length ? stored || "unlocked" : "locked";
  }

  // First exercise of hard: all medium must be completed
  if (difficulty === "hard") {
    const mediumExercises = getExercisesByTopicAndDifficulty(topic, "medium");
    const completed = getCompletedCount(mediumExercises.map((e) => e.id));
    return completed === mediumExercises.length
      ? stored || "unlocked"
      : "locked";
  }

  return "locked";
}

export function renderDashboard(container: HTMLElement): void {
  const page = document.createElement("div");
  page.className = "max-w-4xl mx-auto px-4 py-8";

  // Header
  const header = document.createElement("div");
  header.className = "text-center mb-10";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold text-white mb-2";
  title.textContent = "Welcome to CodeQuest";

  const subtitle = document.createElement("p");
  subtitle.className = "text-gray-400";
  subtitle.textContent =
    "Master web development through hands-on coding exercises";

  header.appendChild(title);
  header.appendChild(subtitle);
  page.appendChild(header);

  // Topic cards
  const grid = document.createElement("div");
  grid.className = "grid gap-6 md:grid-cols-3";

  TOPIC_CONFIG.forEach((config) => {
    const card = createTopicCard(config);
    grid.appendChild(card);
  });

  page.appendChild(grid);

  // Reset button
  const resetSection = document.createElement("div");
  resetSection.className = "mt-12 text-center";

  const resetBtn = document.createElement("button");
  resetBtn.className =
    "text-sm text-gray-500 hover:text-red-400 transition-colors";
  resetBtn.textContent = "Reset All Progress";
  resetBtn.addEventListener("click", () => {
    showResetModal(container);
  });

  resetSection.appendChild(resetBtn);
  page.appendChild(resetSection);

  container.appendChild(page);
}

function createTopicCard(config: {
  topic: Topic;
  label: string;
  icon: string;
  color: string;
  borderColor: string;
}): HTMLElement {
  const exercises = getExercisesByTopic(config.topic);
  const completedCount = getCompletedCount(exercises.map((e) => e.id));
  const unlocked = isTopicUnlocked(config.topic);

  const card = document.createElement("div");
  card.className = `bg-gray-900 border ${config.borderColor} rounded-xl p-6 ${
    unlocked ? "hover:border-gray-600 transition-colors" : "opacity-60"
  }`;

  // Icon + title
  const header = document.createElement("div");
  header.className = "flex items-center gap-3 mb-4";

  const icon = document.createElement("span");
  icon.className = "text-3xl";
  icon.textContent = config.icon;

  const titleWrapper = document.createElement("div");
  const title = document.createElement("h2");
  title.className = `text-lg font-bold ${config.color}`;
  title.textContent = config.label;

  const status = document.createElement("span");
  status.className = "text-xs text-gray-500";
  status.textContent = unlocked
    ? completedCount === exercises.length
      ? "✅ Completed"
      : "In Progress"
    : "🔒 Locked";

  titleWrapper.appendChild(title);
  titleWrapper.appendChild(status);

  header.appendChild(icon);
  header.appendChild(titleWrapper);
  card.appendChild(header);

  // Progress bar
  const progressContainer = document.createElement("div");
  progressContainer.className = "mb-4";
  renderProgressBar(progressContainer, {
    completed: completedCount,
    total: exercises.length,
    label: "Exercises",
  });
  card.appendChild(progressContainer);

  // Button
  if (unlocked) {
    const btn = document.createElement("button");
    btn.className =
      "w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors";
    btn.textContent =
      completedCount > 0 ? "Continue Learning" : "Start Learning";
    btn.addEventListener("click", () => {
      navigate(`#/topic/${config.topic}`);
    });
    card.appendChild(btn);
  } else {
    const lockMsg = document.createElement("p");
    lockMsg.className = "text-xs text-gray-500 text-center";
    lockMsg.textContent =
      config.topic === "css"
        ? "Complete all HTML exercises to unlock"
        : "Complete all CSS exercises to unlock";
    card.appendChild(lockMsg);
  }

  return card;
}

function showResetModal(container: HTMLElement): void {
  const overlay = document.createElement("div");
  overlay.className =
    "fixed inset-0 bg-black/70 flex items-center justify-center z-50";

  const modal = document.createElement("div");
  modal.className =
    "bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm mx-4";

  const title = document.createElement("h3");
  title.className = "text-lg font-bold text-white mb-2";
  title.textContent = "Reset Progress?";

  const msg = document.createElement("p");
  msg.className = "text-gray-400 text-sm mb-6";
  msg.textContent =
    "This will clear all your progress and cannot be undone. Are you sure?";

  const btns = document.createElement("div");
  btns.className = "flex gap-3";

  const cancelBtn = document.createElement("button");
  cancelBtn.className =
    "flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.className =
    "flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors";
  confirmBtn.textContent = "Reset";
  confirmBtn.addEventListener("click", () => {
    import("../utils/storage").then(({ resetProgress }) => {
      resetProgress();
      overlay.remove();
      navigate("#/");
    });
  });

  btns.appendChild(cancelBtn);
  btns.appendChild(confirmBtn);

  modal.appendChild(title);
  modal.appendChild(msg);
  modal.appendChild(btns);
  overlay.appendChild(modal);

  // Close on backdrop click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
}
