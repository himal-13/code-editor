// suggestions/htmlSuggestions.ts
import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export function setupHTMLSuggestions(monaco:Monaco): void {
    monaco.languages.registerCompletionItemProvider('html', {
        provideCompletionItems: () => ({
            suggestions: [
                // Basic Structure
                {
                    label: '<html>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<html>\n\t<head>\n\t\t${1}\n\t</head>\n\t<body>\n\t\t${2}\n\t</body>\n</html>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'HTML root element'
                },
                {
                    label: '<head>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Document metadata container'
                },

                // Common Elements
                {
                    label: '<div>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<div>${4}</div>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Generic container element'
                },
                {
                    label: '<span>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<span${1: class="${2}"}>${3}</span>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Generic inline container'
                },
                {
                    label: '<a>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<a href="${1:#}"${2: target="_blank"}>${3}</a>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Hyperlink element'
                },
                {
                    label: '<img>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<img src="${1}" alt="${2}"${3: width="${4}" height="${5}"}>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Image embed element'
                },

                // Semantic HTML5
                {
                    label: '<header>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<header>\n\t${1}\n</header>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Introductory content'
                },
                {
                    label: '<nav>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<nav>\n\t<ul>\n\t\t<li><a href="${1:#}">${2}</a></li>\n\t</ul>\n</nav>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Navigation links'
                },
                {
                    label: '<section>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<section>\n\t${3}\n</section>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Thematic grouping of content'
                },
                {
                    label: '<article>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<article>\n\t${1}\n</article>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Self-contained composition'
                },
                //list
                {
                  label: '<ul>',
                  kind: monaco.languages.CompletionItemKind.Snippet,
                  insertText: '<ul>\n\t${1}\n</ul>',
                  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                  documentation: 'List Container'
                },
               {
                label: '<ol>',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<ol>\n\t${1}\n</ol>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'List Container'
            },
            {
              label: '<li>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<li>${1}</li>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'List item'
          },

              //text formatting
              {
                label: '<p>',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<p>${1}</p>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Paragrapgh Element'
            },
            {
              label: '<pre>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<pre>${1}</pre>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Pre-text Element'
            },
            //heading
            {
              label: '<h1>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h1>${1}</h1>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
              label: '<h2>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h2>${1}</h2>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
              label: '<h3>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h3>${1}</h3>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
              label: '<h4>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h4>${1}</h4>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
              label: '<h5>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h5>${1}</h5>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
              label: '<h6>',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: '<h6>${1}</h6>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Heading Element'
            },
            {
                  label: '<title>',
                  kind: monaco.languages.CompletionItemKind.Snippet,
                  insertText: '<title>${1}</title>',
                  insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                  documentation: 'Title Element'
            },

                // Forms
                {
                    label: '<form>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<form action="${1}" method="${2|get,post|}">\n\t${3}\n</form>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Form container'
                },
                {
                    label: '<input>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<input type="${1|text,email,password,number,submit,button,checkbox,radio,date,file|}" name="${2}"${3: placeholder="${4}"}${5: required}>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Form input control'
                },
                {
                    label: '<button>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<button type="${1|button,submit,reset|}">${2}</button>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Clickable button'
                },
                {
                    label: '<textarea>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<textarea name="${1}" rows="${2:4}" cols="${3:50}"${4: placeholder="${5}"}>${6}</textarea>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Multi-line text input'
                },

                // Media
                {
                    label: '<video>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<video width="${1:320}" height="${2:240}" controls>\n\t<source src="${3}" type="video/${4|mp4,webm,ogg|}">\n\t${5:Your browser does not support the video tag.}\n</video>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Video embed element'
                },
                {
                    label: '<audio>',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<audio controls>\n\t<source src="${1}" type="audio/${2|mp3,ogg,wav|}">\n\t${3:Your browser does not support the audio element.}\n</audio>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Sound content'
                },

            ] as monaco.languages.CompletionItem[]
        })
    });
}
