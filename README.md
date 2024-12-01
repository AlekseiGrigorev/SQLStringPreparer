# SQLStringPreparer
SQL string preparer Visual Studio Code Extension

Prepare SQL string (In particular, the parameters of the IN expression). Add, remove and replace special characters. Format, quoting and unquoting SQL parameters, etc.

Commands are displayed (View > Command Palette... or Ctrl+Shift+P) and work with the selected text in any file formats.

All commands works with single selection and multi selection (multi-cursor) selection modes.

- SQL String Prepаrer - Stringify - Removes carriage returns in selected lines. By default, trim each line, adds comma delimiter and copy result to clipboard (see extension settings)
- SQL String Prepаrer - Split - Split selected lines by commas
- SQL String Prepаrer - Trim - Removes whitespace from both sides of selected lines
- SQL String Prepаrer - Add Commas - Adds commas at the end of selected lines
- SQL String Prepаrer - Remove Commas - Removes commas at the end of selected lines
- SQL String Prepаrer - Add Quotes - Adds quotes at the beginning and end of selected lines
- SQL String Prepаrer - Remove Quotes - Removes quotes at the beginning and end of selected lines
- SQL String Prepаrer - Add Double Quotes - Adds double quotes at the beginning and the end of selected lines
- SQL String Prepаrer - Remove Double Quotes - Removes double quotes at the beginning and the end of selected lines

## Change Log
1.2.0 - All commands works with single selection and multi selection (multi-cursor) selection modes.
<br>Add new parameter - Remove commas on Split command.

1.1.1 - Fix clear selection after executing commands

1.1.0 - Added extension settings

1.0.0 - Added some commands

0.0.1 - Initial
