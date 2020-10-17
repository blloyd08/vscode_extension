// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('contrivance.splitSelection', splitSelection);

	context.subscriptions.push(disposable);
}

function splitSelection(){

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const inputBoxOptions = {
				prompt: "Enter the separator, or hit Enter to use the default",
				value: ","
			}
			vscode.window.showInputBox(inputBoxOptions).then((separator) =>{
				if (separator){
					const document = editor.document;
					const selection = editor.selection;
		
					// Get the selection text
					const text = document.getText(selection);
					const split = "\n" + text.split(separator).join("\n");
					editor.edit(editBuilder => {
						editBuilder.replace(selection, split);
					})
				}
			})

		} else {
			vscode.window.showErrorMessage("Active editor not found, open an editor before running this command")
		}

}

// this method is called when your extension is deactivated
export function deactivate() {}
