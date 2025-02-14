// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "php-class-diagram" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('php-class-diagram.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from php-class-diagram!');
	});

	context.subscriptions.push(disposable);

	const disposableGenerateDiagram = vscode.commands.registerCommand(
		"php-class-diagram.generateClassDiagram",
		(uri: vscode.Uri) => {
		if (!uri) {
			vscode.window.showErrorMessage("No file selected.");
			return;
		}

		vscode.window.showInformationMessage(
			`Generating diagram for: ${uri.fsPath}`
		);

		// ここに処理を実装（例: ファイルパスを渡してクラス図を生成）
		}
	);

  context.subscriptions.push(disposableGenerateDiagram);
}

// This method is called when your extension is deactivated
export function deactivate() {}
