import * as vscode from 'vscode';
import { Preparer } from './preparer';

export class Cmds {

    private _eol: string = '\n';
    private _document: vscode.TextDocument | null = null;
    private _selection: vscode.Selection | null = null;
    
    private static getEol(): string {
        if (!vscode.window.activeTextEditor) {
            return '\n';
        }
        const document = vscode.window.activeTextEditor.document;
        let eol = '\n';
        if (document.eol === vscode.EndOfLine.CRLF) {
            eol = '\r\n'; 
        }
        return eol;
    }

    private static getDocument(): vscode.TextDocument | null {
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        return vscode.window.activeTextEditor.document;
    }

    private static getSelection(): vscode.Selection | null {
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        const selection = vscode.window.activeTextEditor.selection;
        if (!selection || selection.isEmpty) {
            return null;
        }
        return selection;
    }

    private static getSelectionRange(): vscode.Range | null {
        const document = this.getDocument();
        if (!document) {
            return null;
        }
        const selection = this.getSelection();
        if (!selection) {
            return null;
        }
        return new vscode.Range(
            selection.start.line,
            0,
            selection.end.line,
            document.lineAt(selection.end.line).text.length
        );
    }

    private static getText(): string {
        const document = this.getDocument();
        if (!document) {
            return '';
        }
        const range = this.getSelectionRange();
        if (!range) {
            return '';
        }
        return document.getText(range);
    }

    private static editText(text: string): void {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        const selectionRange = this.getSelectionRange();
        if (!selectionRange) {
            return;
        }
        vscode.window.activeTextEditor.edit(builder => {
            builder.replace(selectionRange, text);
        });
    }
    
    public static cmdStringify() {
        const text = this.getText();
        if (text == '') {
            return;
        }
        const preparer = new Preparer(text, this.getEol());
        this.editText(preparer.stringify());
    }

    public static cmdAddCommas() {
        const text = this.getText();
        if (text == '') {
            return;
        }
        const preparer = new Preparer(text, this.getEol());
        this.editText(preparer.addCommas());
    }

    public static cmdRemoveCommas() {
        const text = this.getText();
        if (text == '') {
            return;
        }
        const preparer = new Preparer(text, this.getEol());
        this.editText(preparer.removeCommas());
    }

    public static cmdAddQuotes() {
        const text = this.getText();
        if (text == '') {
            return;
        }
        const preparer = new Preparer(text, this.getEol());
        this.editText(preparer.addQuotes());
    }

    public static cmdAddDoubleQuotes() {
        const text = this.getText();
        if (text == '') {
            return;
        }
        const preparer = new Preparer(text, this.getEol());
        this.editText(preparer.addDoubleQuotes());
    }
} 