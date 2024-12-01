import { StringHelper } from "./stringhelper";

export class Preparer {
    private _text: string = '';
    private _eol: string = '\n';
    
    constructor(text: string, eol: string) {
        this._text = text;
        this._eol = eol;
    }

    /**
     * Stringify with delimiter
     * @param delimiter 
     * @returns 
     */
    public stringify(delimiter: string): string {
        let lines = this._text.split(this._eol);
        let newLines: string[] = [];
        lines.forEach((line, index, arr) => {
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

    /**
     * Split by commas
     * @param removeCommas 
     * @returns 
     */
    public split(removeCommas: boolean): string {
        let lines = this._text.split(this._eol);
        let newLines: string[] = [];
        lines.forEach((line, index, arr) => {
            newLines.push(...line.split(',')); 
        });
        newLines.forEach((line, index, arr) => {
            if (index === newLines.length - 1) {
                arr[index] = line;
            } else {
                if (!removeCommas) {
                    arr[index] = line + ',';
                }
            } 
        });
        return newLines.join(this._eol);
    }

    /**
     * Trim each line
     * @returns 
     */
    public trim(): string {
        let lines = this._text.split(this._eol);
        lines.forEach((line, index, arr) => {
            arr[index] = line.trim();
        });
        return lines.join(this._eol);
    }

    /**
     * Add commas to each line
     * @returns 
     */
    public addCommas(): string {
        let lines = StringHelper.addSymbolToLines(this._text.split(this._eol), ',');
        return lines.join(this._eol);
    }

    /**
     * Remove commas from each line
     * @returns 
     */
    public removeCommas(): string {
        let lines = StringHelper.removeSymbolFromLines(this._text.split(this._eol), ',');
        return lines.join(this._eol);
    }

    /**
     * Add quotes to each line
     * @returns 
     */
    public addQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach((line, index, arr) => {
            arr[index] = StringHelper.addSymbolsToLine(line, "'");
        });
        return lines.join(this._eol);
    }

    /**
     * Remove quotes from each line
     * @returns 
     */
    public removeQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach((line, index, arr)  => {
            arr[index] = StringHelper.removeSymbolsFromLine(line, "'");
        });
        return lines.join(this._eol);
    }

    /**
     * Add double quotes to each line
     * @returns 
     */
    public addDoubleQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach((line, index, arr)  => {
            arr[index] = StringHelper.addSymbolsToLine(line, '"');
        });
        return lines.join(this._eol);
    }

    /**
     * Remove double quotes from each line
     * @returns 
     */
    public removeDoubleQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach((line, index, arr) => {
            arr[index] = StringHelper.removeSymbolsFromLine(line, '"');
        });
        return lines.join(this._eol);
    }
}