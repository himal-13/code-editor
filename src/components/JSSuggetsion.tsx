// suggestions/jsSuggestions.ts
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export function setupJSSuggestions(monaco: Monaco): void {
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: () => ({
      suggestions: [
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'function ${1:name}($2) {\n\t$3\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Function declaration'
        },
        {
          label: 'console.log',
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: 'console.log($1)',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Log to console'
        },
      ] as monaco.languages.CompletionItem[]
    })
  });
}
