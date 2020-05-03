import * as vscode from 'vscode';

//
// NOTE - requires "emmet.showExpandedAbbreviation": "never" in settings since
// emmet tries to complete in HAML files
//

// escape string before using in a RegExp
function escapeRegExp(s: string): string {
  return s.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

const completion = {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    // get current word at position and use as prefix for our regex
    var prefix = '';
    let wordRange = document.getWordRangeAtPosition(position);
    if (wordRange) {
      prefix = document.getText(wordRange);
    }
    const regex = new RegExp(`\\b${escapeRegExp(prefix)}[a-z0-9_-]+`, 'g');

    // get all matching words from file that start with prefix
    const text = document.getText();
    let set = new Set<string>();
    var m: RegExpExecArray | null;
    while ((m = regex.exec(text))) {
      set.add(m[0]);
    }

    // now map unique words to completions
    return Array.from(set).map((i) => new vscode.CompletionItem(i));
  },
};

export function activate(context: vscode.ExtensionContext) {
  const HAML = { language: 'haml', scheme: 'file' };

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(HAML, completion, '.')
  );
}
