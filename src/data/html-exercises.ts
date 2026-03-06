import { Exercise } from "../types";

export const htmlExercises: Exercise[] = [
  // === EASY ===
  {
    id: "html-easy-01",
    topic: "html",
    difficulty: "easy",
    title: "Create a Heading",
    prompt: 'Write an HTML h1 heading that says "Hello, World!".',
    starterCode: "<!-- Write your HTML here -->",
    solution: "<h1>Hello, World!</h1>",
    hint: "Use the <h1> tag to define the most important heading.",
    explanation:
      "The <h1> element defines the most important heading on a page. It is displayed in large bold text by default.",
    xp: 10,
  },
  {
    id: "html-easy-02",
    topic: "html",
    difficulty: "easy",
    title: "Write a Paragraph",
    prompt:
      'Create a paragraph element containing the text "Learning HTML is fun!".',
    starterCode: "<!-- Write your HTML here -->",
    solution: "<p>Learning HTML is fun!</p>",
    hint: "The <p> tag defines a paragraph.",
    explanation:
      "The <p> element represents a paragraph of text. Browsers automatically add some margin before and after each <p> element.",
    xp: 10,
  },
  {
    id: "html-easy-03",
    topic: "html",
    difficulty: "easy",
    title: "Create a Link",
    prompt:
      'Create a link that says "Visit Google" and points to "https://google.com".',
    starterCode: "<!-- Write your HTML here -->",
    solution: '<a href="https://google.com">Visit Google</a>',
    hint: "Use the <a> tag with an href attribute.",
    explanation:
      "The <a> (anchor) element creates a hyperlink. The href attribute specifies the URL the link points to.",
    xp: 10,
  },
  {
    id: "html-easy-04",
    topic: "html",
    difficulty: "easy",
    title: "Add an Image",
    prompt: 'Add an image with src "logo.png" and alt text "Company Logo".',
    starterCode: "<!-- Write your HTML here -->",
    solution: '<img src="logo.png" alt="Company Logo">',
    hint: "Use the <img> tag with src and alt attributes. The img tag is self-closing.",
    explanation:
      "The <img> element embeds an image. The src attribute specifies the path, and alt provides alternative text for accessibility.",
    xp: 10,
  },
  // === MEDIUM ===
  {
    id: "html-medium-01",
    topic: "html",
    difficulty: "medium",
    title: "Build a Simple Form",
    prompt:
      'Create a form with a text input (name="username", placeholder="Enter username") and a submit button that says "Submit".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      '<form>\n  <input type="text" name="username" placeholder="Enter username">\n  <button type="submit">Submit</button>\n</form>',
    hint: "Use the <form> tag with an <input> and a <button> inside.",
    explanation:
      'Forms collect user input. The <input> element with type="text" creates a text field, and <button type="submit"> creates a submit button.',
    xp: 25,
  },
  {
    id: "html-medium-02",
    topic: "html",
    difficulty: "medium",
    title: "Create a Table",
    prompt:
      'Create a table with one header row containing "Name" and "Age", and one data row with "Alice" and "25".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      "<table>\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Alice</td>\n    <td>25</td>\n  </tr>\n</table>",
    hint: "Use <table>, <tr>, <th> for headers, and <td> for data cells.",
    explanation:
      "Tables use <tr> for rows, <th> for header cells, and <td> for data cells. Headers are bold and centered by default.",
    xp: 25,
  },
  {
    id: "html-medium-03",
    topic: "html",
    difficulty: "medium",
    title: "Semantic Article",
    prompt:
      'Create a semantic <article> element containing an <h2> with "Blog Post" and a <p> with "This is the content.".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      "<article>\n  <h2>Blog Post</h2>\n  <p>This is the content.</p>\n</article>",
    hint: "The <article> element represents a self-contained composition.",
    explanation:
      "Semantic elements like <article> give meaning to the structure. An article represents a self-contained composition intended for independent distribution.",
    xp: 25,
  },
  {
    id: "html-medium-04",
    topic: "html",
    difficulty: "medium",
    title: "Navigation with List",
    prompt:
      'Create a <nav> containing an unordered list with three list items: "Home", "About", "Contact".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      "<nav>\n  <ul>\n    <li>Home</li>\n    <li>About</li>\n    <li>Contact</li>\n  </ul>\n</nav>",
    hint: "Use <nav> for navigation, with <ul> and <li> inside.",
    explanation:
      "The <nav> element represents a section of navigation links. Using <ul>/<li> provides proper structure for screen readers.",
    xp: 25,
  },
  // === HARD ===
  {
    id: "html-hard-01",
    topic: "html",
    difficulty: "hard",
    title: "ARIA Button",
    prompt:
      'Create a <div> that acts as a button using ARIA: role="button", aria-label="Close dialog", and tabindex="0".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      '<div role="button" aria-label="Close dialog" tabindex="0">Close</div>',
    hint: "Use role, aria-label, and tabindex attributes on a <div>.",
    explanation:
      'ARIA attributes make non-semantic elements accessible. role="button" tells screen readers this is a button, aria-label provides a label, and tabindex="0" makes it focusable.',
    xp: 50,
  },
  {
    id: "html-hard-02",
    topic: "html",
    difficulty: "hard",
    title: "SEO Meta Tags",
    prompt:
      'Create a <head> section with a <meta> description tag containing "Learn web development with CodeQuest" and a <meta> charset set to "UTF-8".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      '<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Learn web development with CodeQuest">\n</head>',
    hint: "Use <meta> tags with name/content for description and charset attribute for encoding.",
    explanation:
      "Meta tags provide metadata about the page. The description meta tag helps search engines understand page content, and charset declares the character encoding.",
    xp: 50,
  },
  {
    id: "html-hard-03",
    topic: "html",
    difficulty: "hard",
    title: "Complex Form with Fieldset",
    prompt:
      'Create a form with a <fieldset>, a <legend> saying "Personal Info", a label "Email:" with an email input (name="email", required), and a submit button.',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      '<form>\n  <fieldset>\n    <legend>Personal Info</legend>\n    <label>Email:\n      <input type="email" name="email" required>\n    </label>\n    <button type="submit">Submit</button>\n  </fieldset>\n</form>',
    hint: "Use <fieldset> to group related fields and <legend> to title the group.",
    explanation:
      "The <fieldset> element groups related form controls, and <legend> provides a caption. Using <label> with inputs improves accessibility. The required attribute enforces field completion.",
    xp: 50,
  },
  {
    id: "html-hard-04",
    topic: "html",
    difficulty: "hard",
    title: "Picture Element",
    prompt:
      'Create a <picture> element with a <source> for screens min-width 800px using "large.jpg" and an <img> fallback using "small.jpg" with alt "Responsive image".',
    starterCode: "<!-- Write your HTML here -->",
    solution:
      '<picture>\n  <source media="(min-width: 800px)" srcset="large.jpg">\n  <img src="small.jpg" alt="Responsive image">\n</picture>',
    hint: "Use <picture> with <source> and media attribute, plus an <img> fallback.",
    explanation:
      "The <picture> element lets you serve different images for different screen sizes. The <source> element specifies alternate images, and <img> is the fallback.",
    xp: 50,
  },
];
