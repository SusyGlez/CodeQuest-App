import { Route } from "../types";

type RouteHandler = (route: Route) => void;

let currentHandler: RouteHandler | null = null;

export function parseRoute(): Route {
  const hash = window.location.hash || "#/";
  const path = hash.slice(1); // remove #

  // Match patterns and extract params
  const topicMatch = path.match(/^\/topic\/([a-z]+)$/);
  if (topicMatch) {
    return { path: "/topic/:topic", params: { topic: topicMatch[1] } };
  }

  const exerciseMatch = path.match(/^\/exercise\/([a-z0-9-]+)$/);
  if (exerciseMatch) {
    return { path: "/exercise/:id", params: { id: exerciseMatch[1] } };
  }

  // Default to dashboard
  return { path: "/", params: {} };
}

export function navigate(hash: string): void {
  window.location.hash = hash;
}

export function onRouteChange(handler: RouteHandler): void {
  currentHandler = handler;

  const handleChange = () => {
    const route = parseRoute();
    if (currentHandler) {
      currentHandler(route);
    }
  };

  window.addEventListener("hashchange", handleChange);

  // Trigger initial route
  handleChange();
}

export function getCurrentRoute(): Route {
  return parseRoute();
}
