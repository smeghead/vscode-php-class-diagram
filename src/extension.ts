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
		throw new Error(`Failed to open file: ${error}`);
	}
}

function getOutputFilename(): string {
	const timestamp = Math.floor(new Date().getTime() / 1000);
	return `${os.tmpdir()}/${timestamp}.puml`;
}

const generageMainFunction = (menuCommand: commandBuilder.Commands): (uri: vscode.Uri) => void => {
	return (uri: vscode.Uri) => {
		if (!uri) {
			vscode.window.showErrorMessage("No Directory selected.");
			return;
		}

		const config = vscode.workspace.getConfiguration("php-class-diagram");
		const target = uri.fsPath;
		const phpClassDiagram = pathResolver.getPhpClassDiagramPath(target, config.get("executablePath"));
		if (phpClassDiagram.length === 0) {
			vscode.window.showErrorMessage(
				`Error: Failed to search php-class-diagram command.
Please install php-class-diagram into your composer project.
\`composer require --dev smeghead/php-class-diagram\`
or Specify \`PHP-class-diagram: Executable Path\` in settings.`
			);
			return;
		}

		const outputFilename = getOutputFilename();
		const command = commandBuilder.getCommand(menuCommand, phpClassDiagram, target, outputFilename);
		console.log(command);

		// 作成したPlantUMLのファイルを新しいウィンドウで開く。
		runCommand(command).then(({ stdout, stderr }) => {
			openFileInNewTab(outputFilename);
			vscode.window.showInformationMessage(`Complete: Opened ${outputFilename} in new tab.`);
		}).catch(({ stdout, stderr }) => {
			console.log("Command failed!");
			console.error("stderr:", stderr);
			vscode.window.showErrorMessage(`Error: ${stderr}`);
		});
	};
};

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(
			commandBuilder.Commands.CLASS_DIAGRAM,
			generageMainFunction(commandBuilder.Commands.CLASS_DIAGRAM)
		),
		vscode.commands.registerCommand(
			commandBuilder.Commands.PACKAGE_DIAGRAM,
			generageMainFunction(commandBuilder.Commands.PACKAGE_DIAGRAM)
		),
	);
}

export function deactivate() { }
