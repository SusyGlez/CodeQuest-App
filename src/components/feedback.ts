export interface FeedbackOptions {
  correct: boolean;
  message: string;
  hint?: string;
  explanation?: string;
  solutionCode?: string;
  isShowAnswer?: boolean;
}

export function renderFeedback(
  container: HTMLElement,
  options: FeedbackOptions,
): void {
  // Clear existing feedback
  container.innerHTML = "";

  const wrapper = document.createElement("div");

  if (options.isShowAnswer) {
    // Show answer mode — blue theme
    wrapper.className =
      "border border-blue-500/30 bg-blue-950/30 rounded-lg p-4 mt-4";

    const header = document.createElement("div");
    header.className = "flex items-center gap-2 mb-3";

    const icon = document.createElement("span");
    icon.textContent = "📖";
    icon.className = "text-lg";

    const title = document.createElement("span");
    title.className = "font-semibold text-blue-300";
    title.textContent = "Solution";

    header.appendChild(icon);
    header.appendChild(title);
    wrapper.appendChild(header);

    if (options.solutionCode) {
      const codeBlock = document.createElement("pre");
      codeBlock.className =
        "bg-gray-900 rounded-lg p-3 text-sm text-gray-200 overflow-x-auto mb-3 whitespace-pre-wrap";
      codeBlock.textContent = options.solutionCode;
      wrapper.appendChild(codeBlock);
    }

    if (options.explanation) {
      const explanation = document.createElement("p");
      explanation.className = "text-sm text-blue-200/80";
      explanation.textContent = options.explanation;
      wrapper.appendChild(explanation);
    }
  } else if (options.correct) {
    // Correct — green theme
    wrapper.className =
      "border border-green-500/30 bg-green-950/30 rounded-lg p-4 mt-4";

    const header = document.createElement("div");
    header.className = "flex items-center gap-2";

    const icon = document.createElement("span");
    icon.textContent = "✅";
    icon.className = "text-lg";

    const msg = document.createElement("span");
    msg.className = "font-semibold text-green-300";
    msg.textContent = options.message;

    header.appendChild(icon);
    header.appendChild(msg);
    wrapper.appendChild(header);
  } else {
    // Incorrect — red theme
    wrapper.className =
      "border border-red-500/30 bg-red-950/30 rounded-lg p-4 mt-4";

    const header = document.createElement("div");
    header.className = "flex items-center gap-2 mb-2";

    const icon = document.createElement("span");
    icon.textContent = "❌";
    icon.className = "text-lg";

    const msg = document.createElement("span");
    msg.className = "font-semibold text-red-300";
    msg.textContent = options.message;

    header.appendChild(icon);
    header.appendChild(msg);
    wrapper.appendChild(header);

    if (options.hint) {
      const hint = document.createElement("p");
      hint.className = "text-sm text-red-200/80 mt-1";
      hint.innerHTML = `<span class="font-medium">💡 Hint:</span> ${escapeHTML(options.hint)}`;
      wrapper.appendChild(hint);
    }
  }

  container.appendChild(wrapper);
}

function escapeHTML(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
