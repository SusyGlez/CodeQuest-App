import { Exercise, Difficulty } from "../types";
import {
  getExerciseById,
  getNextExercise,
  getExercisesByTopicAndDifficulty,
} from "../data";
import { setExerciseStatus, getExerciseStatus } from "../utils/storage";
import { navigate } from "../utils/router";
import { checkAnswer } from "../utils/check-answer";
import {
  createEditor,
  getEditorValue,
  disposeEditor,
  getLanguageForTopic,
} from "./editor";
import { renderFeedback } from "./feedback";
import { getExerciseUnlockStatus } from "./dashboard";

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

export function renderExerciseView(
  container: HTMLElement,
  exerciseId: string,
): void {
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    renderNotFound(container, exerciseId);
    return;
  }

  // Check if exercise is accessible
  const exercises = getExercisesByTopicAndDifficulty(
    exercise.topic,
    exercise.difficulty,
  );
  const index = exercises.findIndex((e) => e.id === exerciseId);
  const status = getExerciseUnlockStatus(
    exerciseId,
    exercise.topic,
    exercise.difficulty,
    index,
  );

  if (status === "locked") {
    renderLocked(container, exercise);
    return;
  }

  // Mark as unlocked if not already viewed/completed
  if (status === "unlocked") {
    setExerciseStatus(exerciseId, "unlocked");
  }

  const page = document.createElement("div");
  page.className = "h-[calc(100vh-65px)] flex flex-col";

  // Top bar with exercise info
  const topBar = document.createElement("div");
  topBar.className =
    "flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800";

  const backBtn = document.createElement("button");
  backBtn.className =
    "text-gray-400 hover:text-white transition-colors text-sm";
  backBtn.textContent = "← Back";
  backBtn.addEventListener("click", () => {
    disposeEditor();
    navigate(`#/topic/${exercise.topic}`);
  });

  const titleEl = document.createElement("h2");
  titleEl.className = "text-white font-semibold text-sm truncate";
  titleEl.textContent = exercise.title;

  const badge = document.createElement("span");
  badge.className = `px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_BADGES[exercise.difficulty].className}`;
  badge.textContent = DIFFICULTY_BADGES[exercise.difficulty].label;

  topBar.appendChild(backBtn);
  topBar.appendChild(titleEl);
  topBar.appendChild(badge);
  page.appendChild(topBar);

  // Split screen container
  const splitScreen = document.createElement("div");
  splitScreen.className =
    "flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden";

  // Left panel: instructions
  const leftPanel = document.createElement("div");
  leftPanel.className =
    "exercise-panel p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-800";

  const promptTitle = document.createElement("h3");
  promptTitle.className = "text-lg font-bold text-white mb-4";
  promptTitle.textContent = "Instructions";

  const promptText = document.createElement("p");
  promptText.className = "text-gray-300 leading-relaxed mb-6";
  promptText.textContent = exercise.prompt;

  // Collapsible hint
  const hintToggle = document.createElement("button");
  hintToggle.className =
    "text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1";
  hintToggle.textContent = "💡 Show Hint";

  const hintContent = document.createElement("div");
  hintContent.className =
    "hidden mt-2 p-3 bg-blue-950/30 border border-blue-500/20 rounded-lg text-sm text-blue-200";
  hintContent.textContent = exercise.hint;

  hintToggle.addEventListener("click", () => {
    const isHidden = hintContent.classList.contains("hidden");
    hintContent.classList.toggle("hidden");
    hintToggle.textContent = isHidden ? "💡 Hide Hint" : "💡 Show Hint";
  });

  // Feedback container
  const feedbackContainer = document.createElement("div");
  feedbackContainer.id = "feedback-container";

  leftPanel.appendChild(promptTitle);
  leftPanel.appendChild(promptText);
  leftPanel.appendChild(hintToggle);
  leftPanel.appendChild(hintContent);
  leftPanel.appendChild(feedbackContainer);

  // Right panel: editor + buttons
  const rightPanel = document.createElement("div");
  rightPanel.className = "flex flex-col overflow-hidden";

  const editorContainer = document.createElement("div");
  editorContainer.className = "editor-container flex-1";

  const buttonBar = document.createElement("div");
  buttonBar.className =
    "flex gap-2 p-3 bg-gray-900 border-t border-gray-800 flex-wrap";

  const checkBtn = document.createElement("button");
  checkBtn.className =
    "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors";
  checkBtn.textContent = "✓ Check Answer";

  const showAnswerBtn = document.createElement("button");
  showAnswerBtn.className =
    "px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors";
  showAnswerBtn.textContent = "👁️ Show Answer";

  const nextBtn = document.createElement("button");
  nextBtn.className =
    "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors hidden";
  nextBtn.textContent = "Next Exercise →";

  // Wire up check answer
  checkBtn.addEventListener("click", () => {
    const userAnswer = getEditorValue();
    const result = checkAnswer(exercise, userAnswer);

    renderFeedback(feedbackContainer, {
      correct: result.correct,
      message: result.message,
      hint: result.correct ? undefined : exercise.hint,
    });

    if (result.correct) {
      setExerciseStatus(exerciseId, "completed");
      nextBtn.classList.remove("hidden");
      checkBtn.disabled = true;
      checkBtn.className =
        "px-4 py-2 bg-gray-700 text-gray-500 rounded-lg text-sm font-medium cursor-not-allowed";
    }
  });

  // Wire up show answer
  showAnswerBtn.addEventListener("click", () => {
    const currentStatus = getExerciseStatus(exerciseId);
    if (currentStatus !== "completed") {
      setExerciseStatus(exerciseId, "viewed");
    }

    renderFeedback(feedbackContainer, {
      correct: false,
      message: "",
      isShowAnswer: true,
      solutionCode: exercise.solution,
      explanation: exercise.explanation,
    });
  });

  // Wire up next
  nextBtn.addEventListener("click", () => {
    const next = getNextExercise(exerciseId);
    disposeEditor();
    if (next) {
      navigate(`#/exercise/${next.id}`);
    } else {
      navigate(`#/topic/${exercise.topic}`);
    }
  });

  buttonBar.appendChild(checkBtn);
  buttonBar.appendChild(showAnswerBtn);
  buttonBar.appendChild(nextBtn);

  rightPanel.appendChild(editorContainer);
  rightPanel.appendChild(buttonBar);

  splitScreen.appendChild(leftPanel);
  splitScreen.appendChild(rightPanel);
  page.appendChild(splitScreen);

  container.appendChild(page);

  // Initialize Monaco editor after DOM is ready
  requestAnimationFrame(() => {
    createEditor(editorContainer, {
      language: getLanguageForTopic(exercise.topic),
      value: exercise.starterCode,
    });
  });
}

function renderNotFound(container: HTMLElement, id: string): void {
  const page = document.createElement("div");
  page.className = "max-w-md mx-auto px-4 py-20 text-center";

  const icon = document.createElement("div");
  icon.className = "text-5xl mb-4";
  icon.textContent = "🔍";

  const msg = document.createElement("p");
  msg.className = "text-gray-400 text-lg mb-6";
  msg.textContent = `Exercise "${escapeText(id)}" not found.`;

  const btn = document.createElement("button");
  btn.className =
    "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors";
  btn.textContent = "← Back to Dashboard";
  btn.addEventListener("click", () => navigate("#/"));

  page.appendChild(icon);
  page.appendChild(msg);
  page.appendChild(btn);
  container.appendChild(page);
}

function renderLocked(container: HTMLElement, exercise: Exercise): void {
  const page = document.createElement("div");
  page.className = "max-w-md mx-auto px-4 py-20 text-center";

  const icon = document.createElement("div");
  icon.className = "text-5xl mb-4";
  icon.textContent = "🔒";

  const msg = document.createElement("p");
  msg.className = "text-gray-400 text-lg mb-6";
  msg.textContent =
    "This exercise is locked. Complete the previous exercises first.";

  const btn = document.createElement("button");
  btn.className =
    "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors";
  btn.textContent = `← Back to ${exercise.topic.toUpperCase()} Exercises`;
  btn.addEventListener("click", () => navigate(`#/topic/${exercise.topic}`));

  page.appendChild(icon);
  page.appendChild(msg);
  page.appendChild(btn);
  container.appendChild(page);
}

function escapeText(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.textContent || "";
}
