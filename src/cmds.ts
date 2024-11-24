import * as vscode from 'vscode';
import { Preparer } from './preparer';

export class Cmds {
    /**
     * Returns end of line symbol
     * @returns 
     */
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

    /**
     * Returns text document or null
     * @returns 
     */
    private static getDocument(): vscode.TextDocument | null {
        if (!vscode.window.activeTextEditor) {
            return null;
        }
        return vscode.window.activeTextEditor.document;
    }

    /**
     * Returns current selection or null
     * @returns 
     */
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

    /**
     * Returns current selection range or null
     * @returns 
     */
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

    /**
     * Returns text line range
     * @param line 
     * @returns 
     */
    private static getLineRange(line: number): vscode.Range | null
    {
        const document = this.getDocument();
        if (!document) {
            return null;
        }
        return new vscode.Range(
            line, 0, line, document.lineAt(line).text.length
        );
    }

    /**
     * Set text selection
     * @param vscode.Range
     * @returns 
     */
    private static setSelection(range: vscode.Range): void {
        if (!vscode.window.activeTextEditor) {
            return;
        }
        vscode.window.activeTextEditor.selection = new vscode.Selection(
            range.start.line, range.start.character, range.end.line, range.end.character
        );
    }

    /**
     * Returns selected text
     * @returns 
     */
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

    /**
     * Replace selected text
     * @param text 
     * @returns 
     */
    private static async editText(text: string): Promise<boolean> {
        if (!vscode.window.activeTextEditor) {
            return false;
        }
        const selectionRange = this.getSelectionRange();
        if (!selectionRange) {
            return false;
        }
        return await vscode.window.activeTextEditor.edit(builder => {
            builder.replace(selectionRange, text);
        });
    }

    /**
     * Returns preparer object or null
     * @returns 
     */
    private static getPreparer(): Preparer | null {
        const text = this.getText();
        if (text == '') {
            return null;
        }
        return new Preparer(text, this.getEol());
    }

    /**
     * Stringify command
     * @returns 
     */
    public static async cmdStringify(delimiter: string, copyToClipboard: boolean) {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        const text = preparer.stringify(delimiter);
        await this.editText(text);
        const selectedRange = this.getSelectionRange();
        if (selectedRange) {
            vscode.window.activeTextEditor?.revealRange(selectedRange, vscode.TextEditorRevealType.InCenter);
            //Select whole new stringify line
            const newSelectedRange = this.getLineRange(selectedRange.start.line);
            if (newSelectedRange) {
                this.setSelection(newSelectedRange);
            }
        }
        if (copyToClipboard) {
            vscode.env.clipboard.writeText(text);
        }
    }

    /**
     * Split command
     * @returns 
     */
    public static cmdSplit() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.split());
    }

    /**
     * Trim command
     * @returns 
     */
    public static cmdTrim() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.trim());
    }

    /**
     * Add Commas command
     * @returns 
     */
    public static cmdAddCommas() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.addCommas());
    }

    /**
     * Remove Commas command
     * @returns 
     */
    public static cmdRemoveCommas() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.removeCommas());
    }

    /**
     * Add Quotes command
     * @returns 
     */
    public static cmdAddQuotes() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.addQuotes());
    }

    /**
     * Remove Quotes command
     * @returns 
     */
    public static cmdRemoveQuotes() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.removeQuotes());
    }

    /**
     * Add Double Quotes command
     * @returns 
     */
    public static cmdAddDoubleQuotes() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.addDoubleQuotes());
    }

    /**
     * Remove Double Quotes command
     * @returns 
     */
    public static cmdRemoveDoubleQuotes() {
        const preparer = this.getPreparer();
        if (!preparer) {
            return;
        }
        this.editText(preparer.removeDoubleQuotes());
    }
} 