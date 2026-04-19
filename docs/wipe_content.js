const fs = require('fs');
const path = require('path');

const docsDir = __dirname;
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md') && f !== 'README.md' && !f.includes('example_structure'));

for (const file of files) {
    const filePath = path.join(docsDir, file);
    let original = fs.readFileSync(filePath, 'utf8');

    // Replace everything between </summary> or </details> 
    // and the NEXT <details>, </details> or End-of-file.
    // If the group contains non-whitespace, we replace it with a template comment.
    let updated = original.replace(/(<\/summary>|<\/details>)([\s\S]*?)(?=<details|<\/details>|$)/g, (match, tag, content) => {
        if (content.trim().length > 0) {
            return tag + '\n\n<!-- PASTE CONTENT HERE -->\n\n';
        } else {
            return tag + content;
        }
    });

    // Cleanup excessive newlines just in case
    updated = updated.replace(/\n{4,}/g, '\n\n\n');

    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`Cleaned up ${file}`);
}
