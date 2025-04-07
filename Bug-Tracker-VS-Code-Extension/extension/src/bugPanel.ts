import * as vscode from 'vscode';

export class BugPanel {
  public static currentPanel: BugPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.ViewColumn.One;
    if (BugPanel.currentPanel) {
      BugPanel.currentPanel.panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'bugPanel',
      'Bug Tracker',
      column,
      { enableScripts: true }
    );

    BugPanel.currentPanel = new BugPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel;
    this.extensionUri = extensionUri;
    this.panel.webview.html = this.getHtmlForWebview();
  }

  private getHtmlForWebview(): string {
    return \`
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Bug Tracker</title></head>
      <body>
        <h2>Bugs List</h2>
        <div id="bugs">Loading...</div>
        <script>
          fetch('http://localhost:3000/api/bugs')
            .then(res => res.json())
            .then(data => {
              const bugsDiv = document.getElementById('bugs');
              bugsDiv.innerHTML = data.map(b => '<p>' + b.title + '</p>').join('');
            });
        </script>
      </body>
      </html>\`;
  }
}
