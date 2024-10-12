export class Preparer {
    private _text: string = '';
    private _eol: string = '\n';
    
    constructor(text: string, eol: string) {
        this._text = text;
        this._eol = eol;
    }

    public stringify(): string {
        return this._text.replaceAll(this._eol, '');
    }

    public addCommas(): string {
        return this._text.replaceAll(this._eol, ',' + this._eol);
    }

    public removeCommas(): string {
        return this._text.replaceAll(',' + this._eol, this._eol);
    }

    public addQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = "'" + line + "'";
        });
        return lines.join(this._eol);
    }

    public addDoubleQuotes(): string {
        let lines = this._text.split(this._eol);
        lines.forEach(function(line, index, arr) {
            arr[index] = '"' + line + '"'
        });
        return lines.join(this._eol);
    }
}