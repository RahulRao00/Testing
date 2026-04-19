const fs = require('fs');
const path = require('path');

const docsDir = __dirname;
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    if (file === 'README.md' || file === 'format.js') continue;
    
    const filePath = path.join(docsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only process files that have raw <details> lacking class="custom-dropdown"
    // Though for safety we can just re-run replacement logic.
    // Skip if it doesn't contain <details> at all
    if (!content.includes('<details')) continue;

    // Remove standalone <br> tags. Docsify markdown uses empty lines instead.
    content = content.replace(/<br>\s*/g, '');

    // Replace plain <details> with <details class="custom-dropdown">
    // Make sure we aren't doubling up if it's already there
    content = content.replace(/<details>/g, '<details class="custom-dropdown">');

    // Find <summary>...</summary> and append <div class="content"> if not already there
    content = content.replace(/(<summary>.*?<\/summary>)(?!\s*<div class="content">)/g, '$1\n<div class="content">');

    // Find </details> and prepend </div>. Since we might have already added </div> in java.md, let's be careful.
    // simpler to just strip out all </div> right before </details> first, then add them back.
    content = content.replace(/<\/div>\s*<\/details>/g, '</details>');
    content = content.replace(/<\/details>/g, '</div>\n</details>');

    // Fix excessive newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    // Clean up trailing text instances (specifically the 'Home' text at the end of some contents)
    content = content.replace(/Home\s*<\/div>\n<\/details>/g, '</div>\n</details>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Formatted ${file} successfully.`);
}
