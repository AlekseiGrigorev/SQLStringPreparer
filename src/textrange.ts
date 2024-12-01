import * as vscode from 'vscode';

export class TextRange {
    text: string;
    range: vscode.Range;

    constructor(text: string, range: vscode.Range) {
        this.text = text;
        this.range = range;
    }

    getText(): string {
        return this.text;
    }

    getRange(): vscode.Range {
        return this.range;
    }
}