const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'java.md');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add the multi-column list at the top.
// Let's find the start of the <details> elements and insert it right before.
const listHTML = `
<div class="topic-list">
  <div>
    <ul>
      <li><a href="#" class="active">Array</a></li>
      <li><a href="#">String</a></li>
      <li><a href="#">Oops</a></li>
      <li><a href="#">File Handling</a></li>
      <li><a href="#">Exception Handling</a></li>
      <li><a href="#">Keyword</a></li>
      <li><a href="#">Methods/Collections</a></li>
      <li><a href="#">Usecase DS</a></li>
      <li><a href="#">Generic/Iterator</a></li>
    </ul>
  </div>
  <div>
    <ul>
      <li><a href="#">Number</a></li>
      <li><a href="#">Pattern</a></li>
      <li><a href="#">Array</a></li>
      <li><a href="#">String</a></li>
    </ul>
  </div>
  <div>
    <ul>
      <li><a href="#">JDBC</a></li>
      <li><a href="#">URL Class</a></li>
      <li><a href="#">HttpURLConnection Class</a></li>
    </ul>
  </div>
</div>

`;
if (!content.includes('class="topic-list"')) {
    content = content.replace('<details>', listHTML + '<details>');
}

// 2. Remove standalone <br> tags. Docsify markdown uses empty lines instead.
content = content.replace(/<br>\s*/g, '');

// 3. Replace <details> with <details class="custom-dropdown">
content = content.replace(/<details>/g, '<details class="custom-dropdown">');

// 4. Find <summary>...</summary> and append <div class="content">
content = content.replace(/(<summary>.*<\/summary>)/g, '$1\n<div class="content">');

// 5. Find </details> and prepend </div>
content = content.replace(/<\/details>/g, '</div>\n</details>');

// Fix excessive newlines
content = content.replace(/\n{3,}/g, '\n\n');

// Clean up trailing text instances
content = content.replace(/Home\s*<\/div>/g, '</div>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('java.md formatted successfully.');
