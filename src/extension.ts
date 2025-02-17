import * as vscode from 'vscode';
import * as pathResolver from './core/pathResolver';
import * as commandBuilder from './core/commandBuilder';
import os from 'os';
import { exec } from "child_process";

function runCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ stdout, stderr }); // 失敗した場合も標準出力・標準エラー出力を返す
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

async function openFileInNewTab(filePath: string) {
    try {
        const document = await vscode.workspace.openTextDocument(filePath);
        await vscode.window.showTextDocument(document, { preview: false });
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open file: ${error}`);
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "php-class-diagram" is now active!');

	const disposable = vscode.commands.registerCommand(
		"php-class-diagram.generateClassDiagram",
		(uri: vscode.Uri) => {
			if (!uri) {
				vscode.window.showErrorMessage("No Directory selected.");
				return;
			}

			vscode.window.showInformationMessage(
				`Generating diagram for: ${uri.fsPath}`
			);

			// ここに処理を実装（例: ファイルパスを渡してクラス図を生成）
			const target = uri.fsPath;
			const phpClassDiagram = pathResolver.getPhpClassDiagramPath(target);
			const timestamp = Math.floor( new Date().getTime() / 1000 );
			const output = `${os.tmpdir()}/${timestamp}.puml`;
			const command = commandBuilder.getCommand(phpClassDiagram, target, output);
			console.log(command);

			if (phpClassDiagram.length === 0) {
				vscode.window.showErrorMessage(
					`Error: Failed to search php-class-diagram command.
					Please install php-class-diagram into your composer project.
					\`composer require --dev smeghead/php-class-diagram\`` );
				return;
			}

			// 作成したPlantUMLのファイルを新しいウィンドウで開く。
			runCommand(command).then(({ stdout, stderr }) => {
				openFileInNewTab(output);
				vscode.window.showInformationMessage(`Complete: Opened ${output} in new tab.`);
			}).catch(({ stdout, stderr }) => {
				console.log("Command failed!");
				console.error("stderr:", stderr);
				vscode.window.showErrorMessage(`Error: ${stderr}`);
			});
		}
	);

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
