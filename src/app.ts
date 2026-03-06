import "./styles/main.css";
import { onRouteChange } from "./utils/router";
import { renderNav } from "./components/nav";
import { renderDashboard } from "./components/dashboard";
import { renderExerciseList } from "./components/exercise-list";
import { renderExerciseView } from "./components/exercise-view";
import { disposeEditor } from "./components/editor";
import { Topic } from "./types";

const VALID_TOPICS: Topic[] = ["html", "css", "javascript"];

function init(): void {
  const app = document.getElementById("app");
  if (!app) return;

  onRouteChange((route) => {
    // Dispose any existing Monaco editor
    disposeEditor();

    // Clear app
    app.innerHTML = "";

    // Render navigation
    renderNav(app);

    // Create content area
    const content = document.createElement("main");
    content.id = "content";
    app.appendChild(content);

    // Route to appropriate view
    switch (route.path) {
      case "/":
        renderDashboard(content);
        break;

      case "/topic/:topic": {
        const topic = route.params.topic as Topic;
        if (VALID_TOPICS.includes(topic)) {
          renderExerciseList(content, topic);
        } else {
          renderDashboard(content);
        }
        break;
      }

      case "/exercise/:id":
        renderExerciseView(content, route.params.id);
        break;

      default:
        renderDashboard(content);
        break;
    }
  });
}

// Start the app
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
