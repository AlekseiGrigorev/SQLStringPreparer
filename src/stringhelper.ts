export class StringHelper {
    /**
     * Add first and last symbols in line, if necessary 
     * @param line 
     * @param symbol 
     * @returns 
     */
    public static addSymbolsToLine(line: string, symbol: string): string {
        let newChars: string[] = [];
        let start = true;
        const chars = line.split('');
        chars.forEach((char, index, arr) => {
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

    /**
     * Add first and last symbols from line, if necessary
     * @param line 
     * @param symbol 
     * @returns 
     */
    public static removeSymbolsFromLine(line: string, symbol: string): string {
        let newChars: string[] = [];
        let start = true;
        const chars = line.split('');
        chars.forEach((char, index, arr) => {
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

    /**
     * Add symbol at the end of each line
     * @param lines 
     * @param symbol 
     */
    public static addSymbolToLines(lines: string[], symbol: string) {
        lines.forEach((line, index, arr) => {
            if (symbol !== line[line.length - 1]) {
                arr[index] = line + symbol;
            }
        });
        return lines;
    }

    /**
     * Remove symbol from the end of each line
     * @param lines 
     * @param symbol 
     */
    public static removeSymbolFromLines(lines: string[], symbol: string) {
        lines.forEach((line, index, arr) => {
            if (symbol === line[line.length - 1]) {
                arr[index] = line.slice(0, -1);
            }
        });
        return lines;
    }
}