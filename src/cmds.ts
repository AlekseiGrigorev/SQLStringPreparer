import * as vscode from 'vscode';
import { TextRange } from './textrange';
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
     * Returns current selections ranges array or empty array
     * @returns 
     */
    private static getSelectionsTextRanges(): TextRange[] {
        if (!vscode.window.activeTextEditor) {
            return [];
        }
        const ranges: TextRange[] = [];
        for (const selection of vscode.window.activeTextEditor.selections) {
            const range = new vscode.Range(
                selection.start,
                selection.end
            );
            ranges.push(
                new TextRange(this.getText(range), range)
            );
        }
        return ranges;
    }

    /**
     * Returns text line range
     * @param line 
     * @returns 
     */
    private static getLineRange(line: number): vscode.Range | null {
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
    private static getText(range: vscode.Range): string {
        const document = this.getDocument();
        if (!document) {
            return '';
        }
        return document.getText(range);
    }

    /**
     * Replace selected text
     * @param text 
     * @returns 
     */
    private static async editText(text: string, range: vscode.Range): Promise<boolean> {
        if (!vscode.window.activeTextEditor) {
            return false;
        }
        return await vscode.window.activeTextEditor.edit(builder => {
            builder.replace(range, text);
        });
    }

    /**
     * Returns preparer object or null
     * @returns 
     */
    private static getPreparer(text: string): Preparer | null {
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
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        let newRanges: TextRange[] = [];
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            const text = preparer.stringify(delimiter);
            newRanges.push(new TextRange(text, textRange.getRange()));
            await this.editText(text, textRange.getRange());
        }
        if (0 < newRanges.length) {
            //Select whole new stringify line
            const newSelectedRange = this.getLineRange(newRanges[0].getRange().start.line);
            if (newSelectedRange) {
                this.setSelection(newSelectedRange);
                vscode.window.activeTextEditor?.revealRange(newSelectedRange, vscode.TextEditorRevealType.InCenter);
            }
            if (copyToClipboard) {
                vscode.env.clipboard.writeText(newRanges[0].getText());
            }
        }
    }

    /**
     * Split command
     * @returns 
     */
    public static async cmdSplit(removeCommas: boolean) {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.split(removeCommas), textRange.getRange());
        }
    }

    /**
     * Trim command
     * @returns 
     */
    public static async cmdTrim() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.trim(), textRange.getRange());
        }
    }

    /**
     * Add Commas command
     * @returns 
     */
    public static async cmdAddCommas() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.addCommas(), textRange.getRange());
        }
    }

    /**
     * Remove Commas command
     * @returns 
     */
    public static async cmdRemoveCommas() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.removeCommas(), textRange.getRange());
        }
    }

    /**
     * Add Quotes command
     * @returns 
     */
    public static async cmdAddQuotes() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.addQuotes(), textRange.getRange());
        }
    }

    /**
     * Remove Quotes command
     * @returns 
     */
    public static async cmdRemoveQuotes() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.removeQuotes(), textRange.getRange());
        }
    }

    /**
     * Add Double Quotes command
     * @returns 
     */
    public static async cmdAddDoubleQuotes() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.addDoubleQuotes(), textRange.getRange());
        }
    }

    /**
     * Remove Double Quotes command
     * @returns 
     */
    public static async cmdRemoveDoubleQuotes() {
        const selectionsTextRanges = this.getSelectionsTextRanges();
        if (0 === selectionsTextRanges.length) {
            return;
        }
        for (const textRange of selectionsTextRanges) {
            const preparer = this.getPreparer(textRange.getText());
            if (!preparer) {
                continue;
            }
            await this.editText(preparer.removeDoubleQuotes(), textRange.getRange());
        }
    }
} 