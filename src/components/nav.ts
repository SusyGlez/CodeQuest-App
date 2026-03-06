import { navigate, getCurrentRoute } from "../utils/router";

export function renderNav(container: HTMLElement): void {
  const route = getCurrentRoute();

  const nav = document.createElement("nav");
  nav.className =
    "bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50";

  // Logo / title
  const logo = document.createElement("a");
  logo.href = "#/";
  logo.className =
    "text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors";
  logo.textContent = "💻 CodeQuest";

  // Nav links
  const links = document.createElement("div");
  links.className = "flex gap-1 items-center";

  // Mobile menu button
  const menuBtn = document.createElement("button");
  menuBtn.className = "md:hidden text-gray-400 hover:text-white p-2";
  menuBtn.innerHTML = "☰";
  menuBtn.setAttribute("aria-label", "Toggle menu");

  const navItems = [
    { label: "Dashboard", hash: "#/", match: "/" },
    { label: "HTML", hash: "#/topic/html", match: "/topic/html" },
    { label: "CSS", hash: "#/topic/css", match: "/topic/css" },
    {
      label: "JavaScript",
      hash: "#/topic/javascript",
      match: "/topic/javascript",
    },
  ];

  const linkList = document.createElement("div");
  linkList.className = "hidden md:flex gap-1";

  navItems.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.hash;
    const currentPath =
      route.path === "/topic/:topic"
        ? `/topic/${route.params.topic}`
        : route.path;
    const isActive = currentPath === item.match;
    a.className = `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:text-white hover:bg-gray-800"
    }`;
    a.textContent = item.label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(item.hash);
    });
    linkList.appendChild(a);
  });

  // Mobile dropdown
  const mobileMenu = document.createElement("div");
  mobileMenu.className =
    "hidden fixed top-14 left-0 right-0 bg-gray-900 border-b border-gray-800 p-4 z-40 md:hidden";

  navItems.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.hash;
    a.className =
      "block px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800";
    a.textContent = item.label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMenu.classList.add("hidden");
      navigate(item.hash);
    });
    mobileMenu.appendChild(a);
  });

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  links.appendChild(linkList);
  links.appendChild(menuBtn);

  nav.appendChild(logo);
  nav.appendChild(links);

  container.appendChild(nav);
  container.appendChild(mobileMenu);
}
