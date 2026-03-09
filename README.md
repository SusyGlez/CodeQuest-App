# 💻 CodeQuest — Interactive Web Development Learning App

## Overview

CodeQuest is an interactive coding practice app designed to help beginners learn and solidify their HTML, CSS, and JavaScript skills through hands-on exercises. Users work through progressively harder challenges, get instant feedback on their answers, track their progress, and can reveal solutions when stuck.

---

## 🎯 Goals

- Provide structured, curriculum-style learning across HTML, CSS, and JavaScript
- Offer real-time feedback to reinforce correct understanding and correct mistakes
- Support self-paced learning with visible progress tracking
- Build confidence through difficulty progression (Easy → Medium → Hard)

---

## 🗂️ App Structure

### Topics & Difficulty Levels

The app is organized into **3 topics**, each with **3 difficulty tiers**:

| Topic      | Difficulty | Description                                              |
|------------|------------|----------------------------------------------------------|
| HTML       | Easy       | Tags, headings, paragraphs, links, images, lists         |
| HTML       | Medium     | Forms, tables, semantic elements, attributes             |
| HTML       | Hard       | Accessibility (ARIA), SEO meta tags, complex forms       |
| CSS        | Easy       | Selectors, colors, fonts, margins, padding               |
| CSS        | Medium     | Flexbox, Grid, pseudo-classes, responsive units          |
| CSS        | Hard       | Animations, transitions, custom properties, media queries|
| JavaScript | Easy       | Variables, data types, operators, basic functions        |
| JavaScript | Medium     | Arrays, objects, DOM manipulation, events                |
| JavaScript | Hard       | Async/Await, fetch API, closures, error handling         |

> The app is designed to be completed in order — HTML must be completed before CSS unlocks, and CSS before JavaScript. This ensures a logical learning progression.

---

## ✨ Core Features

### 1. 📝 Exercise View
- Each exercise presents a **clear prompt** describing the task
- A **code editor panel** where the user writes their answer
- Syntax highlighting for readability

### 2. ✅ Answer Review
- A **"Check Answer"** button that evaluates the user's submission
- Feedback is shown immediately:
  - ✅ **Correct** — Success message + XP awarded + unlock next exercise
  - ❌ **Incorrect** — Error message with a hint pointing to what went wrong
- For JavaScript exercises, the app runs the code in a sandboxed environment and checks output/behavior

### 3. 👁️ Show Answer
- Every exercise includes a **"Show Answer"** button
- Clicking it reveals the model solution with a brief explanation
- Using "Show Answer" marks the exercise as *Viewed* (not *Completed*), so it doesn't count toward the completion score — encouraging the user to retry it

### 4. 📊 Progress Tracking
- A **dashboard** shows overall progress across all topics and levels
- Per-topic progress bars (e.g., "HTML: 8/12 exercises completed")
- A **streak counter** to track consecutive days of practice
- Exercises are marked as:
  - 🔒 Locked
  - 🔓 Unlocked
  - 👁️ Viewed (answer was shown)
  - ✅ Completed

### 5. 🏆 XP & Achievements
- Users earn **XP points** for completing exercises:
  - Easy: 10 XP
  - Medium: 25 XP
  - Hard: 50 XP
- Bonus XP for completing an exercise without using "Show Answer"
- Achievement badges for milestones (e.g., "HTML Master", "CSS Wizard", "First JS Script")

### 6. 🔁 Retry & Reset
- Users can retry any previously completed exercise to improve their score
- A **"Reset Progress"** option is available in settings (with confirmation prompt)

---

## 🖥️ UI / UX Design Suggestions

- **Split-screen layout**: Instructions/prompt on the left, code editor on the right
- **Dark mode** code editor (e.g., VS Code-style theme) for comfortable coding
- **Live preview pane** for HTML/CSS exercises so users can see their output render in real time
- Mobile-friendly layout for reviewing exercises on the go (editing may be limited on mobile)
- Clean, minimal design to keep focus on learning

---

## 🛠️ Suggested Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React (or plain HTML/CSS/JS for simplicity)      |
| Code Editor | CodeMirror or Monaco Editor (VS Code's engine)  |
| Answer Check| Custom validation logic + sandboxed `eval()`    |
| Storage     | `localStorage` for progress (or a backend DB)  |
| Styling     | Tailwind CSS or custom CSS                       |
| Backend (optional) | Node.js + Express + MongoDB for user accounts |

---

## 📁 Suggested File Structure

```
codequest/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Editor.jsx          # Code editor component
│   │   ├── ExerciseCard.jsx    # Exercise prompt + instructions
│   │   ├── Feedback.jsx        # Correct/wrong feedback display
│   │   ├── ProgressBar.jsx     # Topic progress tracker
│   │   └── Dashboard.jsx       # Overall progress overview
│   ├── data/
│   │   ├── html-exercises.js   # All HTML exercises + answers
│   │   ├── css-exercises.js    # All CSS exercises + answers
│   │   └── js-exercises.js     # All JS exercises + answers
│   ├── utils/
│   │   ├── checkAnswer.js      # Answer validation logic
│   │   └── storage.js          # localStorage read/write helpers
│   ├── App.jsx
│   └── index.js
├── README.md
└── package.json
```

---

## 📋 Exercise Data Format

Each exercise should follow a consistent schema:

```json
{
  "id": "html-easy-01",
  "topic": "HTML",
  "difficulty": "easy",
  "title": "Create a Heading",
  "prompt": "Write the HTML to create an h1 heading that says 'Hello, World!'",
  "starterCode": "<!-- Write your HTML here -->",
  "solution": "<h1>Hello, World!</h1>",
  "hint": "Use the <h1> tag to define the most important heading.",
  "explanation": "The <h1> element defines the most important heading on a page. It is displayed in large bold text by default.",
  "xp": 10
}
```

---

## 🚀 Future Feature Ideas

- **Timed challenges** — Complete an exercise within a time limit for bonus XP
- **Multiple choice mode** — A quiz-style alternative to free-form coding
- **Leaderboard** — Compare progress with friends or the community
- **User accounts** — Save progress across devices via cloud sync
- **Code explanation tool** — Let users highlight code and get an AI-powered explanation
- **Cheat Sheet sidebar** — Quick reference for tags, properties, and methods per topic
- **Video hints** — Short embedded video walkthroughs for harder exercises

---

## 🧑‍💻 Getting Started (Development)

```bash
# Clone the repo
git clone https://github.com/your-username/codequest.git
cd codequest

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

*Built to make learning web development hands-on, structured, and fun.* 🚀
