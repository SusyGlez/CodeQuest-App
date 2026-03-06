import { Topic, Difficulty } from "../types";
import { getExercisesByTopicAndDifficulty } from "../data";
import { navigate } from "../utils/router";
import { isTopicUnlocked, getExerciseUnlockStatus } from "./dashboard";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard"];

const DIFFICULTY_BADGES: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className: "bg-green-900/50 text-green-400 border border-green-700/50",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-900/50 text-yellow-400 border border-yellow-700/50",
  },
  hard: {
    label: "Hard",
    className: "bg-red-900/50 text-red-400 border border-red-700/50",
  },
};

const STATUS_ICONS: Record<string, string> = {
  locked: "🔒",
  unlocked: "🔓",
  viewed: "👁️",
  completed: "✅",
};

const TOPIC_LABELS: Record<Topic, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
};

export function renderExerciseList(container: HTMLElement, topic: Topic): void {
  const page = document.createElement("div");
  page.className = "max-w-3xl mx-auto px-4 py-8";

  // Check if topic is unlocked
  if (!isTopicUnlocked(topic)) {
    const locked = document.createElement("div");
    locked.className = "text-center py-20";

    const icon = document.createElement("div");
    icon.className = "text-5xl mb-4";
    icon.textContent = "🔒";

    const msg = document.createElement("p");
    msg.className = "text-gray-400 text-lg";
    msg.textContent = `Complete all ${topic === "css" ? "HTML" : "CSS"} exercises to unlock ${TOPIC_LABELS[topic]}.`;

    const backBtn = document.createElement("button");
    backBtn.className =
      "mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors";
    backBtn.textContent = "← Back to Dashboard";
    backBtn.addEventListener("click", () => navigate("#/"));

    locked.appendChild(icon);
    locked.appendChild(msg);
    locked.appendChild(backBtn);
    page.appendChild(locked);
    container.appendChild(page);
    return;
  }

  // Header
  const header = document.createElement("div");
  header.className = "flex items-center gap-4 mb-8";

  const backBtn = document.createElement("button");
  backBtn.className =
    "text-gray-400 hover:text-white transition-colors text-sm";
  backBtn.textContent = "← Dashboard";
  backBtn.addEventListener("click", () => navigate("#/"));

  const title = document.createElement("h1");
  title.className = "text-2xl font-bold text-white";
  title.textContent = `${TOPIC_LABELS[topic]} Exercises`;

  header.appendChild(backBtn);
  header.appendChild(title);
  page.appendChild(header);

  // Exercises grouped by difficulty
  DIFFICULTY_ORDER.forEach((difficulty) => {
    const exercises = getExercisesByTopicAndDifficulty(topic, difficulty);
    if (exercises.length === 0) return;

    const section = document.createElement("div");
    section.className = "mb-8";

    // Difficulty header
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "flex items-center gap-2 mb-3";

    const badge = document.createElement("span");
    badge.className = `px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_BADGES[difficulty].className}`;
    badge.textContent = DIFFICULTY_BADGES[difficulty].label;

    sectionHeader.appendChild(badge);
    section.appendChild(sectionHeader);

    // Exercise items
    const list = document.createElement("div");
    list.className = "space-y-2";

    exercises.forEach((exercise, index) => {
      const status = getExerciseUnlockStatus(
        exercise.id,
        topic,
        difficulty,
        index,
      );
      const isLocked = status === "locked";

      const item = document.createElement("div");
      item.className = `flex items-center gap-3 p-3 rounded-lg border transition-colors ${
        isLocked
          ? "bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed"
          : "bg-gray-900 border-gray-800 hover:border-gray-600 cursor-pointer"
      }`;

      if (!isLocked) {
        item.addEventListener("click", () => {
          navigate(`#/exercise/${exercise.id}`);
        });
      }

      const statusIcon = document.createElement("span");
      statusIcon.className = "text-sm";
      statusIcon.textContent = STATUS_ICONS[status];

      const titleText = document.createElement("span");
      titleText.className = `text-sm font-medium ${isLocked ? "text-gray-600" : "text-gray-200"}`;
      titleText.textContent = exercise.title;

      const xpBadge = document.createElement("span");
      xpBadge.className = "ml-auto text-xs text-gray-500";
      xpBadge.textContent = `${exercise.xp} XP`;

      item.appendChild(statusIcon);
      item.appendChild(titleText);
      item.appendChild(xpBadge);
      list.appendChild(item);
    });

    section.appendChild(list);
    page.appendChild(section);
  });

  container.appendChild(page);
}
