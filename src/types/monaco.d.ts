// This file is only used before npm install.
// After npm install, monaco-editor provides its own types and this is ignored.
declare module "monaco-editor" {
  export namespace editor {
    interface IStandaloneCodeEditor {
      getValue(): string;
      setValue(value: string): void;
      dispose(): void;
      layout(dimension?: { width: number; height: number }): void;
    }

    interface IStandaloneEditorConstructionOptions {
      value?: string;
      language?: string;
      theme?: string;
      minimap?: { enabled?: boolean };
      lineNumbers?: string;
      wordWrap?: string;
      fontSize?: number;
      fontFamily?: string;
      padding?: { top?: number; bottom?: number };
      scrollBeyondLastLine?: boolean;
      automaticLayout?: boolean;
      tabSize?: number;
      renderWhitespace?: string;
      bracketPairColorization?: { enabled?: boolean };
      suggest?: { showKeywords?: boolean; showSnippets?: boolean };
    }

    function create(
      element: HTMLElement,
      options?: IStandaloneEditorConstructionOptions,
    ): IStandaloneCodeEditor;
  }
}
