// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Preparer } from './preparer';
import { Cmds } from './cmds';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "SQLStringPreparer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
    const cmdStringify = vscode.commands.registerCommand('sqlstringpreparer.stringify', () => {
        Cmds.cmdStringify();
	});
    const cmdSplit = vscode.commands.registerCommand('sqlstringpreparer.split', () => {
        Cmds.cmdSplit();
	});
    const cmdTrim = vscode.commands.registerCommand('sqlstringpreparer.trim', () => {
        Cmds.cmdTrim();
	});
    const cmdAddCommas = vscode.commands.registerCommand('sqlstringpreparer.addCommas', () => {
        Cmds.cmdAddCommas();
	});
    const cmdRemoveCommas = vscode.commands.registerCommand('sqlstringpreparer.removeCommas', () => {
        Cmds.cmdRemoveCommas();
	});
    const cmdAddQuotes = vscode.commands.registerCommand('sqlstringpreparer.addQuotes', () => {
        Cmds.cmdAddQuotes();
	});
    const cmdRemoveQuotes = vscode.commands.registerCommand('sqlstringpreparer.removeQuotes', () => {
        Cmds.cmdRemoveQuotes();
	});
    const cmdAddDoubleQuotes = vscode.commands.registerCommand('sqlstringpreparer.addDoubleQuotes', () => {
        Cmds.cmdAddDoubleQuotes();
	});
    const cmdRemoveDoubleQuotes = vscode.commands.registerCommand('sqlstringpreparer.removeDoubleQuotes', () => {
        Cmds.cmdRemoveDoubleQuotes();
	});
    context.subscriptions.push(cmdStringify);
    context.subscriptions.push(cmdSplit);
    context.subscriptions.push(cmdTrim);
    context.subscriptions.push(cmdAddCommas);
    context.subscriptions.push(cmdRemoveCommas);
    context.subscriptions.push(cmdAddQuotes);
    context.subscriptions.push(cmdRemoveQuotes);
    context.subscriptions.push(cmdAddDoubleQuotes);
    context.subscriptions.push(cmdRemoveQuotes);
}

// This method is called when your extension is deactivated
export function deactivate() {}
