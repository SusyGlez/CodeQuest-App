export function renderProgressBar(
  container: HTMLElement,
  options: { completed: number; total: number; label?: string },
): void {
  const { completed, total, label } = options;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const wrapper = document.createElement("div");
  wrapper.className = "w-full";

  if (label) {
    const labelRow = document.createElement("div");
    labelRow.className = "flex justify-between text-sm text-gray-400 mb-1";

    const labelText = document.createElement("span");
    labelText.textContent = label;

    const countText = document.createElement("span");
    countText.textContent = `${completed}/${total}`;

    labelRow.appendChild(labelText);
    labelRow.appendChild(countText);
    wrapper.appendChild(labelRow);
  }

  const track = document.createElement("div");
  track.className = "w-full bg-gray-700 rounded-full h-2.5 overflow-hidden";

  const fill = document.createElement("div");
  fill.className =
    "bg-blue-500 h-full rounded-full transition-all duration-500";
  fill.style.width = `${percent}%`;

  track.appendChild(fill);
  wrapper.appendChild(track);

  container.appendChild(wrapper);
}
