const fs = require('fs');

let testHtml = `
# TOP OF FILE
Some list:
<ul><li>Topic</li></ul>

<details class="custom-dropdown">
<summary>A</summary>
SOME TEXT
<details>
<summary>B</summary>
MORE TEXT
</details>
EVEN MORE TEXT
</details>
<details>
<summary>C</summary>
Final text
</details>
Trailing text
`;

// Regex:
// Group 1: Either </summary> or </details>
// Group 2: The content to be replaced. We only want to replace if there's actual non-whitespace content? No, always replace to ensure the comment is there.
// Lookahead: <details, </details>, or End of string. 
// Wait, we need to ensure the comment only gets inserted if we aren't empty, or just always insert it once?
// If we always insert it, we will get it everywhere.
let out = testHtml.replace(/(<\/summary>|<\/details>)([\s\S]*?)(?=<details|<\/details>|$)/g, (match, tag, content) => {
    // If content has non-whitespace characters, or we just want to put the placeholder:
    // If we only put placeholder when there was some content:
    if (content.trim().length > 0) {
        return tag + '\n\n<!-- PASTE CONTENT HERE -->\n\n';
    } else {
        // if no content existed (e.g. adjacent tags like </details><details>), we might just leave them alone, OR put the placeholder.
        // The user wants to know where to paste. But pasting between <details> and <summary> or </details> is sometimes weird.
        // Actually, content should only be pasted between <summary> and </details>.
        // Wait, if it's </details><details>, there shouldn't be content.
        return tag + content;
    }
});

console.log(out);
