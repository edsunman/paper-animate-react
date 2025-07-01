export const convertStringToSeperateLines = (text: string) => {
    let currentLine = "";
    const lines: string[] = [];
    const words = text.split(/\s+/);
    words.forEach((word, index) => {
        const testLength =
            currentLine.length + (currentLine === "" ? word.length : word.length + 1);
        if (testLength <= 30) {
            currentLine = currentLine === "" ? word : currentLine + " " + word;
        } else {
            if (currentLine !== "") {
                lines.push(currentLine);
            }
            currentLine = word;
        }

        if (index === words.length - 1) {
            if (currentLine !== "") {
                lines.push(currentLine);
            }
        }
    });
    return lines;
};
