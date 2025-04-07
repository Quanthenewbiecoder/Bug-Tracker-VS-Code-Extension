import * as vscode from 'vscode';
import { BugPanel } from './bugPanel';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('bugtracker.openBugs', () => {
      BugPanel.createOrShow(context.extensionUri);
    })
  );
}

export function deactivate() {}
