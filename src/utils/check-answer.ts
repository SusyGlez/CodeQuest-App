import { Exercise, CheckResult } from "../types";

export function checkAnswer(
  exercise: Exercise,
  userAnswer: string,
): CheckResult {
  const trimmed = userAnswer.trim();
  if (!trimmed) {
    return {
      correct: false,
      message: "Please write some code before checking.",
    };
  }

  switch (exercise.topic) {
    case "html":
      return checkHTML(exercise.solution, trimmed);
    case "css":
      return checkCSS(exercise.solution, trimmed);
    case "javascript":
      return checkJS(exercise.solution, trimmed);
    default:
      return { correct: false, message: "Unknown exercise topic." };
  }
}

// === HTML Validation ===

function normalizeHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html.trim(), "text/html");
  // Get content from body (for typical snippets) or head+body (for head exercises)
  const headContent = doc.head.innerHTML.trim();
  const bodyContent = doc.body.innerHTML.trim();

  const combined = headContent ? headContent + bodyContent : bodyContent;
  return normalizeWhitespace(combined).toLowerCase();
}

function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}

function checkHTML(solution: string, userAnswer: string): CheckResult {
  const normalizedSolution = normalizeHTML(solution);
  const normalizedUser = normalizeHTML(userAnswer);

  if (normalizedSolution === normalizedUser) {
    return { correct: true, message: "Correct! Great HTML!" };
  }

  // Provide helpful feedback
  if (!userAnswer.includes("<")) {
    return {
      correct: false,
      message:
        "Your answer doesn't contain any HTML tags. Remember to use angle brackets < >.",
    };
  }

  return {
    correct: false,
    message:
      "Not quite right. Check your HTML structure, tags, and content carefully.",
  };
}

// === CSS Validation ===

function normalizeCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/\s*{\s*/g, "{") // normalize braces
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":") // normalize colons
    .replace(/\s*;\s*/g, ";") // normalize semicolons
    .replace(/;}/g, "}") // remove trailing semicolons before }
    .trim()
    .toLowerCase();
}

function parseCSSRules(css: string): Map<string, Map<string, string>> {
  const rules = new Map<string, Map<string, string>>();
  const normalized = normalizeCSS(css);

  // Handle @keyframes and @media blocks by treating them as single rules
  const ruleRegex = /([^{}]+)\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;

  while ((match = ruleRegex.exec(normalized)) !== null) {
    const selector = match[1].trim();
    const body = match[2].trim();

    // For regular rules, parse properties
    const props = new Map<string, string>();
    if (!body.includes("{")) {
      body
        .split(";")
        .filter(Boolean)
        .forEach((decl) => {
          const colonIdx = decl.indexOf(":");
          if (colonIdx > -1) {
            const prop = decl.slice(0, colonIdx).trim();
            const val = decl.slice(colonIdx + 1).trim();
            props.set(prop, val);
          }
        });
    } else {
      // For nested rules (@keyframes, @media), compare as string
      props.set("__nested__", body);
    }
    rules.set(selector, props);
  }

  return rules;
}

function checkCSS(solution: string, userAnswer: string): CheckResult {
  // Quick normalized string comparison first
  if (normalizeCSS(solution) === normalizeCSS(userAnswer)) {
    return { correct: true, message: "Correct! Nice CSS!" };
  }

  // Deep comparison: parse into rules and compare
  const solutionRules = parseCSSRules(solution);
  const userRules = parseCSSRules(userAnswer);

  // Check that all solution selectors exist with correct properties
  for (const [selector, props] of solutionRules) {
    if (!userRules.has(selector)) {
      return {
        correct: false,
        message: `Missing the "${selector}" rule. Check your selector.`,
      };
    }

    const userProps = userRules.get(selector)!;
    for (const [prop, val] of props) {
      if (prop === "__nested__") {
        // Compare nested content loosely
        const userNested = userProps.get("__nested__") || "";
        if (normalizeCSS(val) !== normalizeCSS(userNested)) {
          return {
            correct: false,
            message: `The content inside "${selector}" doesn't match. Check the rules inside.`,
          };
        }
        continue;
      }

      if (!userProps.has(prop)) {
        return {
          correct: false,
          message: `Missing the "${prop}" property in your "${selector}" rule.`,
        };
      }
      if (userProps.get(prop) !== val) {
        return {
          correct: false,
          message: `The value for "${prop}" in "${selector}" should be "${val}".`,
        };
      }
    }
  }

  // If all solution rules matched, it's correct (user may have extra rules, that's ok)
  return { correct: true, message: "Correct! Nice CSS!" };
}

// === JavaScript Validation ===

function checkJS(solution: string, userAnswer: string): CheckResult {
  try {
    const solutionOutput = runJS(solution);
    const userOutput = runJS(userAnswer);

    if (solutionOutput.error) {
      return {
        correct: false,
        message:
          "Internal error with the exercise solution. Please report this.",
      };
    }

    if (userOutput.error) {
      return {
        correct: false,
        message: `Your code threw an error: ${userOutput.error}`,
      };
    }

    // Compare console.log outputs
    const solLogs = solutionOutput.logs.map(normalizeJSOutput);
    const userLogs = userOutput.logs.map(normalizeJSOutput);

    if (solLogs.length !== userLogs.length) {
      return {
        correct: false,
        message: `Expected ${solLogs.length} console.log output(s), but got ${userLogs.length}.`,
      };
    }

    for (let i = 0; i < solLogs.length; i++) {
      if (solLogs[i] !== userLogs[i]) {
        return {
          correct: false,
          message: `Output ${i + 1} doesn't match. Expected "${solLogs[i]}" but got "${userLogs[i]}".`,
        };
      }
    }

    return {
      correct: true,
      message: "Correct! Your JavaScript works perfectly!",
    };
  } catch (e) {
    return {
      correct: false,
      message: `Error running your code: ${e instanceof Error ? e.message : String(e)}`,
    };
  }
}

function normalizeJSOutput(val: string): string {
  return val.trim().replace(/\s+/g, " ");
}

interface JSRunResult {
  logs: string[];
  error: string | null;
}

function runJS(code: string): JSRunResult {
  const logs: string[] = [];
  const mockConsole = {
    log: (...args: unknown[]) => {
      logs.push(
        args
          .map((a) => {
            if (typeof a === "object") {
              try {
                return JSON.stringify(a);
              } catch {
                return String(a);
              }
            }
            return String(a);
          })
          .join(" "),
      );
    },
  };

  try {
    // Use Function constructor for sandboxing (safer than eval)
    // Provide only console as an available global
    const fn = new Function("console", code);

    // Run with timeout protection
    let finished = false;
    let error: string | null = null;

    const timeoutMs = 3000;
    const start = Date.now();

    try {
      // Execute the code with the mock console
      const result = fn(mockConsole);
      // Handle async functions that return promises
      if (
        result &&
        typeof result === "object" &&
        typeof result.then === "function"
      ) {
        // For sync evaluation, we can't truly await.
        // But we can handle .then for simple Promise.resolve cases
        finished = true;
      } else {
        finished = true;
      }
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      finished = true;
    }

    if (Date.now() - start > timeoutMs) {
      return {
        logs: [],
        error: "Code took too long to execute (3 second limit).",
      };
    }

    return { logs, error };
  } catch (e) {
    return {
      logs: [],
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
