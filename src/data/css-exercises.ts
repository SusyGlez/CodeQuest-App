import { Exercise } from "../types";

export const cssExercises: Exercise[] = [
  // === EASY ===
  {
    id: "css-easy-01",
    topic: "css",
    difficulty: "easy",
    title: "Change Text Color",
    prompt:
      "Write a CSS rule that sets the color of all <h1> elements to blue.",
    starterCode: "/* Write your CSS here */",
    solution: "h1 {\n  color: blue;\n}",
    hint: "Use the element selector and the color property.",
    explanation:
      "Element selectors target all instances of an HTML element. The color property sets the text color.",
    xp: 10,
  },
  {
    id: "css-easy-02",
    topic: "css",
    difficulty: "easy",
    title: "Set Font Size",
    prompt: "Write a CSS rule that sets the font-size of the body to 16px.",
    starterCode: "/* Write your CSS here */",
    solution: "body {\n  font-size: 16px;\n}",
    hint: "Use the body selector and font-size property.",
    explanation:
      "The font-size property sets the size of text. Using it on body establishes a base size for the entire page.",
    xp: 10,
  },
  {
    id: "css-easy-03",
    topic: "css",
    difficulty: "easy",
    title: "Add Padding",
    prompt:
      'Write a CSS rule that gives elements with class "box" a padding of 20px.',
    starterCode: "/* Write your CSS here */",
    solution: ".box {\n  padding: 20px;\n}",
    hint: "Use the class selector (.) and the padding property.",
    explanation:
      "The padding property adds space inside an element, between its content and border. Class selectors start with a dot (.).",
    xp: 10,
  },
  {
    id: "css-easy-04",
    topic: "css",
    difficulty: "easy",
    title: "Background Color",
    prompt:
      'Write a CSS rule that sets the background-color of the element with ID "header" to #333.',
    starterCode: "/* Write your CSS here */",
    solution: "#header {\n  background-color: #333;\n}",
    hint: "Use the ID selector (#) and background-color property.",
    explanation:
      "ID selectors start with # and target a unique element. The background-color property sets the background color of an element.",
    xp: 10,
  },
  // === MEDIUM ===
  {
    id: "css-medium-01",
    topic: "css",
    difficulty: "medium",
    title: "Flexbox Center",
    prompt:
      'Write CSS for a class "container" that uses flexbox to center its children both horizontally and vertically.',
    starterCode: "/* Write your CSS here */",
    solution:
      ".container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
    hint: "Use display: flex with justify-content and align-items.",
    explanation:
      "Flexbox is a layout model. display: flex activates it, justify-content centers along the main axis, and align-items centers along the cross axis.",
    xp: 25,
  },
  {
    id: "css-medium-02",
    topic: "css",
    difficulty: "medium",
    title: "CSS Grid Layout",
    prompt:
      'Create a CSS rule for class "grid" that makes a 3-column grid with equal widths and a 10px gap.',
    starterCode: "/* Write your CSS here */",
    solution:
      ".grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n}",
    hint: "Use display: grid, grid-template-columns with fr units, and gap.",
    explanation:
      "CSS Grid creates two-dimensional layouts. grid-template-columns defines column sizes (1fr = 1 fraction of available space), and gap sets spacing between grid items.",
    xp: 25,
  },
  {
    id: "css-medium-03",
    topic: "css",
    difficulty: "medium",
    title: "Hover Effect",
    prompt:
      'Write a CSS rule so that when a user hovers over elements with class "btn", the background-color changes to #0056b3.',
    starterCode: "/* Write your CSS here */",
    solution: ".btn:hover {\n  background-color: #0056b3;\n}",
    hint: "Use the :hover pseudo-class.",
    explanation:
      "Pseudo-classes like :hover let you style elements in specific states. :hover applies when the user is pointing at the element with a mouse.",
    xp: 25,
  },
  {
    id: "css-medium-04",
    topic: "css",
    difficulty: "medium",
    title: "Responsive Font Size",
    prompt:
      'Write a CSS rule for class "title" that sets the font-size to 2rem and line-height to 1.5.',
    starterCode: "/* Write your CSS here */",
    solution: ".title {\n  font-size: 2rem;\n  line-height: 1.5;\n}",
    hint: "Use rem units for font-size and a unitless value for line-height.",
    explanation:
      "rem units are relative to the root font size, making text scalable. A unitless line-height multiplied by the font-size creates consistent spacing.",
    xp: 25,
  },
  // === HARD ===
  {
    id: "css-hard-01",
    topic: "css",
    difficulty: "hard",
    title: "Keyframe Animation",
    prompt:
      'Create a @keyframes animation called "fadeIn" that goes from opacity 0 to opacity 1. Then apply it to class "fade" with a duration of 1s.',
    starterCode: "/* Write your CSS here */",
    solution:
      "@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.fade {\n  animation: fadeIn 1s;\n}",
    hint: "Define @keyframes with from/to blocks, then use the animation shorthand property.",
    explanation:
      "@keyframes defines animation steps. The animation shorthand property applies the keyframes to an element with a specified duration.",
    xp: 50,
  },
  {
    id: "css-hard-02",
    topic: "css",
    difficulty: "hard",
    title: "CSS Custom Properties",
    prompt:
      'Define a CSS custom property --primary-color with value #3b82f6 on :root, then use it as the color for class "link".',
    starterCode: "/* Write your CSS here */",
    solution:
      ":root {\n  --primary-color: #3b82f6;\n}\n\n.link {\n  color: var(--primary-color);\n}",
    hint: "Define custom properties with -- prefix on :root, and use var() to reference them.",
    explanation:
      "CSS custom properties (variables) are defined with -- prefix and accessed with var(). Defining them on :root makes them globally available.",
    xp: 50,
  },
  {
    id: "css-hard-03",
    topic: "css",
    difficulty: "hard",
    title: "Media Query",
    prompt:
      'Write a media query that sets the font-size of class "content" to 14px when the screen width is 768px or less.',
    starterCode: "/* Write your CSS here */",
    solution:
      "@media (max-width: 768px) {\n  .content {\n    font-size: 14px;\n  }\n}",
    hint: "Use @media with max-width condition.",
    explanation:
      "Media queries apply styles conditionally based on screen characteristics. max-width: 768px targets screens 768px wide or narrower (typically tablets and phones).",
    xp: 50,
  },
  {
    id: "css-hard-04",
    topic: "css",
    difficulty: "hard",
    title: "Transition Effect",
    prompt:
      'Write CSS for class "card" that sets a transition on transform property for 0.3s ease, and on hover scales it to 1.05 using transform.',
    starterCode: "/* Write your CSS here */",
    solution:
      ".card {\n  transition: transform 0.3s ease;\n}\n\n.card:hover {\n  transform: scale(1.05);\n}",
    hint: "Use the transition shorthand property and :hover pseudo-class with transform: scale().",
    explanation:
      "Transitions animate property changes smoothly. The transition property specifies which property to animate, duration, and timing function. transform: scale() resizes the element.",
    xp: 50,
  },
];
