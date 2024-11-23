export class Preparer {
    private _text: string = '';
    private _eol: string = '\n';
    
    constructor(text: string, eol: string) {
        this._text = text;
        this._eol = eol;
    }

    private addSymbolsToLine(line: string, symbol: string): string {
        let newChars: string[] = [];
        let start = true;
        const chars = line.split('');
        chars.forEach(function(char, index, arr) {
            if (start && char !== ' ' && char !== '\t') {
                start = false;
                newChars.push(symbol);
            }
            if (index === chars.length - 1 && char === ',') {
                newChars.push(symbol);
            }
            newChars.push(char);
            if (index === chars.length - 1 && char !== ',') {
                newChars.push(symbol);
            }
        });
        return newChars.join('');
    }

    private removeSymbolsFromLine(line: string, symbol: string): string {
        let newChars: string[] = [];
        let start = true;
        const chars = line.split('');
        chars.forEach(function(char, index, arr) {
            if (start && char !== ' ' && char !== '\t') {
                start = false;
                if (char === symbol) {
                    return;
                }
            }
            if (index === chars.length - 2 && char === symbol) {
                if (chars[chars.length - 1] === ',') {
                    return;
                } 
            }
            if (index === chars.length - 1 && char === symbol) {
                return; 
            }
            newChars.push(char);
        });
        return newChars.join('');
    }

    public stringify(delimiter: string): string {
        let lines = this._text.split(this._eol);
        let newLines: string[] = [];
        lines.forEach(function(line, index, arr) {
            let trimLine = line.trim();
            if (delimiter !== '') {
                if (trimLine.substring(trimLine.length-delimiter.length) === delimiter) {
                    trimLine = trimLine.slice(0, -delimiter.length);
                }
            }
            if ('' !== trimLine) {
                newLines.push(trimLine);
            }
        });
        return newLines.join(delimiter);
    }

    public split(): string {
        let lines = this._text.split(this._eol);
        let newLines: string[] = [];
        lines.forEach(function(line, index, arr) {
            newLines.push(...line.split(',')); 
        });
        newLines.forEach(function(line, index, arr) {
            if (index === newLines.length - 1) {
                arr[index] = line;
            } else {
                arr[index] = line + ',';
            } 
        });
        return newLines.join(this._eol);
    }

    public trim(): string {
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = line.trim();
        });
        return lines.join(this._eol);
    }

    public addCommas(): string {
        return this._text.replaceAll(this._eol, ',' + this._eol);
    }

    public removeCommas(): string {
        return this._text.replaceAll(',' + this._eol, this._eol);
    }

    public addQuotes(): string {
        const outerThis = this;
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = outerThis.addSymbolsToLine(line, "'");
        });
        return lines.join(this._eol);
    }

    public removeQuotes(): string {
        const outerThis = this;
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = outerThis.removeSymbolsFromLine(line, "'");
        });
        return lines.join(this._eol);
    }

    public addDoubleQuotes(): string {
        const outerThis = this;
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = outerThis.addSymbolsToLine(line, '"');
        });
        return lines.join(this._eol);
    }

    public removeDoubleQuotes(): string {
        const outerThis = this;
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = outerThis.removeSymbolsFromLine(line, '"');
        });
        return lines.join(this._eol);
    }
}