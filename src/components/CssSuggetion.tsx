// suggestions/cssSuggestions.ts
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export function setupCSSSuggestions(monaco:Monaco): void {
  monaco.languages.registerCompletionItemProvider('css', {
    provideCompletionItems: () => ({
      suggestions: [
        {
          label: 'color',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'color: ',
          documentation: 'Text color property'
        },
        {
          label: 'margin',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'margin: ',
          documentation: 'Margin property'
        },
      ] as monaco.languages.CompletionItem[]
    })
  });
}
