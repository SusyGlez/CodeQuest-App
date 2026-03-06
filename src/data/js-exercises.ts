import { Exercise } from "../types";

export const jsExercises: Exercise[] = [
  // === EASY ===
  {
    id: "js-easy-01",
    topic: "javascript",
    difficulty: "easy",
    title: "Declare a Variable",
    prompt:
      'Declare a variable called "greeting" using const and assign it the string "Hello, World!". Then log it to the console.',
    starterCode: "// Write your JavaScript here",
    solution: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    hint: "Use const to declare a variable that won't change.",
    explanation:
      "const declares a block-scoped variable that cannot be reassigned. console.log() prints values to the console for debugging.",
    xp: 10,
  },
  {
    id: "js-easy-02",
    topic: "javascript",
    difficulty: "easy",
    title: "Basic Math",
    prompt:
      'Create two variables: "a" with value 10 and "b" with value 5. Log their sum to the console.',
    starterCode: "// Write your JavaScript here",
    solution: "const a = 10;\nconst b = 5;\nconsole.log(a + b);",
    hint: "Use the + operator to add numbers.",
    explanation:
      "JavaScript supports standard arithmetic operators: +, -, *, /. The result of a + b is 15.",
    xp: 10,
  },
  {
    id: "js-easy-03",
    topic: "javascript",
    difficulty: "easy",
    title: "Write a Function",
    prompt:
      'Write a function called "double" that takes a number and returns it multiplied by 2. Then log the result of double(5).',
    starterCode: "// Write your JavaScript here",
    solution:
      "function double(n) {\n  return n * 2;\n}\nconsole.log(double(5));",
    hint: "Use the function keyword, return the result of n * 2.",
    explanation:
      "Functions are reusable blocks of code. The return statement sends a value back to the caller. double(5) returns 10.",
    xp: 10,
  },
  {
    id: "js-easy-04",
    topic: "javascript",
    difficulty: "easy",
    title: "String Template Literal",
    prompt:
      'Create a variable "name" with value "Alice". Then log "Hello, Alice!" using a template literal.',
    starterCode: "// Write your JavaScript here",
    solution: 'const name = "Alice";\nconsole.log(`Hello, ${name}!`);',
    hint: "Use backticks (`) and ${} for string interpolation.",
    explanation:
      "Template literals use backticks and ${expression} syntax to embed variables and expressions inside strings.",
    xp: 10,
  },
  // === MEDIUM ===
  {
    id: "js-medium-01",
    topic: "javascript",
    difficulty: "medium",
    title: "Array Filter",
    prompt:
      "Given an array [1, 2, 3, 4, 5, 6], use the filter method to create a new array containing only even numbers. Log the result.",
    starterCode: "// Write your JavaScript here",
    solution:
      "const numbers = [1, 2, 3, 4, 5, 6];\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log(evens);",
    hint: "Use .filter() with a callback that checks if a number is even (n % 2 === 0).",
    explanation:
      "Array.filter() creates a new array with elements that pass a test function. The modulo operator (%) returns the remainder of division — even numbers have remainder 0 when divided by 2.",
    xp: 25,
  },
  {
    id: "js-medium-02",
    topic: "javascript",
    difficulty: "medium",
    title: "Object Destructuring",
    prompt:
      'Create an object "person" with properties name: "Bob" and age: 30. Use destructuring to extract name and age, then log them.',
    starterCode: "// Write your JavaScript here",
    solution:
      'const person = { name: "Bob", age: 30 };\nconst { name, age } = person;\nconsole.log(name);\nconsole.log(age);',
    hint: "Use { name, age } = object syntax.",
    explanation:
      "Object destructuring lets you extract properties into variables in one line. The variable names must match the property names.",
    xp: 25,
  },
  {
    id: "js-medium-03",
    topic: "javascript",
    difficulty: "medium",
    title: "Array Map",
    prompt:
      'Given an array ["hello", "world"], use map to create a new array with each string in uppercase. Log the result.',
    starterCode: "// Write your JavaScript here",
    solution:
      'const words = ["hello", "world"];\nconst upper = words.map(w => w.toUpperCase());\nconsole.log(upper);',
    hint: "Use .map() with .toUpperCase() on each element.",
    explanation:
      "Array.map() creates a new array by applying a function to every element. toUpperCase() converts a string to all capital letters.",
    xp: 25,
  },
  {
    id: "js-medium-04",
    topic: "javascript",
    difficulty: "medium",
    title: "Find in Array",
    prompt:
      'Given an array of objects [{name: "Alice", age: 25}, {name: "Bob", age: 30}], use find to get the object where name is "Bob". Log the result.',
    starterCode: "// Write your JavaScript here",
    solution:
      'const people = [{name: "Alice", age: 25}, {name: "Bob", age: 30}];\nconst bob = people.find(p => p.name === "Bob");\nconsole.log(bob);',
    hint: "Use .find() with a callback that checks the name property.",
    explanation:
      "Array.find() returns the first element that satisfies the test function. It returns undefined if no match is found.",
    xp: 25,
  },
  // === HARD ===
  {
    id: "js-hard-01",
    topic: "javascript",
    difficulty: "hard",
    title: "Promise and Async/Await",
    prompt:
      'Create an async function "fetchData" that returns a promise resolving to "Data loaded" after using await. Call it and log the result.',
    starterCode: "// Write your JavaScript here",
    solution:
      'async function fetchData() {\n  const result = await Promise.resolve("Data loaded");\n  return result;\n}\nfetchData().then(data => console.log(data));',
    hint: "Use async/await with Promise.resolve() to create a resolved promise.",
    explanation:
      "async functions return promises. await pauses execution until a promise resolves. Promise.resolve() creates a promise that immediately resolves with the given value.",
    xp: 50,
  },
  {
    id: "js-hard-02",
    topic: "javascript",
    difficulty: "hard",
    title: "Closure Counter",
    prompt:
      'Write a function "createCounter" that returns another function. Each time the returned function is called, it should return the next number starting from 1. Log the results of calling it 3 times.',
    starterCode: "// Write your JavaScript here",
    solution:
      "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());\nconsole.log(counter());",
    hint: 'Use a closure — the inner function "remembers" the outer variable.',
    explanation:
      "A closure is a function that retains access to its outer scope's variables even after the outer function has returned. The count variable persists between calls to the inner function.",
    xp: 50,
  },
  {
    id: "js-hard-03",
    topic: "javascript",
    difficulty: "hard",
    title: "Error Handling",
    prompt:
      "Write a function \"safeParse\" that takes a JSON string and returns the parsed object. If parsing fails, it should return null. Test it with valid JSON '{\"a\":1}' and invalid JSON 'not json', logging both results.",
    starterCode: "// Write your JavaScript here",
    solution:
      'function safeParse(str) {\n  try {\n    return JSON.parse(str);\n  } catch (e) {\n    return null;\n  }\n}\nconsole.log(safeParse(\'{"a":1}\'));\nconsole.log(safeParse("not json"));',
    hint: "Use try/catch to handle the JSON.parse error.",
    explanation:
      "try/catch blocks handle runtime errors gracefully. JSON.parse() throws a SyntaxError on invalid JSON. Catching it and returning null prevents the program from crashing.",
    xp: 50,
  },
  {
    id: "js-hard-04",
    topic: "javascript",
    difficulty: "hard",
    title: "Array Reduce",
    prompt:
      'Use reduce to calculate the total price from an array of objects: [{name: "Apple", price: 1.5}, {name: "Banana", price: 0.75}, {name: "Cherry", price: 2.0}]. Log the total.',
    starterCode: "// Write your JavaScript here",
    solution:
      'const items = [{name: "Apple", price: 1.5}, {name: "Banana", price: 0.75}, {name: "Cherry", price: 2.0}];\nconst total = items.reduce((sum, item) => sum + item.price, 0);\nconsole.log(total);',
    hint: "Use .reduce() with an accumulator starting at 0, adding each item's price.",
    explanation:
      "Array.reduce() iterates over elements, accumulating a single value. The first argument is the callback (accumulator, current), and the second is the initial value of the accumulator.",
    xp: 50,
  },
];
