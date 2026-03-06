import * as monaco from "monaco-editor";
import type { editor } from "monaco-editor";

let currentEditor: editor.IStandaloneCodeEditor | null = null;

export function createEditor(
  container: HTMLElement,
  options: {
    language: string;
    value: string;
  },
): editor.IStandaloneCodeEditor {
  // Dispose previous editor if exists
  if (currentEditor) {
    currentEditor.dispose();
    currentEditor = null;
  }

  const editor = monaco.editor.create(container, {
    value: options.value,
    language: options.language,
    theme: "vs-dark",
    minimap: { enabled: false },
    lineNumbers: "on",
    wordWrap: "on",
    fontSize: 14,
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    padding: { top: 12, bottom: 12 },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    renderWhitespace: "selection",
    bracketPairColorization: { enabled: true },
    suggest: {
      showKeywords: true,
      showSnippets: true,
    },
  });

  currentEditor = editor;
  return editor;
}

export function getEditorValue(): string {
  return currentEditor?.getValue() || "";
}

export function setEditorValue(value: string): void {
  currentEditor?.setValue(value);
}

export function disposeEditor(): void {
  if (currentEditor) {
    currentEditor.dispose();
    currentEditor = null;
  }
}

export function getLanguageForTopic(topic: string): string {
  switch (topic) {
    case "html":
      return "html";
    case "css":
      return "css";
    case "javascript":
      return "javascript";
    default:
      return "plaintext";
  }
}
