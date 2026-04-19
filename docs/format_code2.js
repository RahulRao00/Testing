const fs = require('fs');
const path = require('path');

const docsDir = __dirname;
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

const javaTypes = 'int|boolean|String|double|float|char|long|short|byte|void|List|Map|Set|HashMap|WebElement|WebDriver|Select|By';
const codeStartsRegexStr = `^(?:import |package |public |private |protected |class |interface |@|(${javaTypes})(?:\\[\\])? |try\\s*\\{|catch\\s*\\(|finally\\s*\\{|System\\.out\\.|driver\\.|switchTo|Thread\\.sleep|@Test|@Before|given\\(\\)|\\.when\\(\\)|\\.then\\(\\)|\\.get\\(|\\.post\\(|Assert\\.|return |if\\s*\\(|for\\s*\\(|while\\s*\\(|\\/\\/|switch\\s*\\(|case |default:|break;|continue;)`;
const codeLineRegex = new RegExp(codeStartsRegexStr);

const codeSymbolRegex = /^(\{|\}|\]|\];|\);|;)\s*$/;
const textLineRegex = /^(?:#|- |\d+\. |What |How |Explain |Definition|Advantages|Disadvantages|Example|Note|Here |This |To |A |An |The |<\/?summary|<\/?details|\/\/ or|<\/?div|$)/i;
const isHeader = /^\s*#/;

for (const file of files) {
    if (file === 'README.md') continue;
    
    const filePath = path.join(docsDir, file);
    let rawContent = fs.readFileSync(filePath, 'utf8');
    
    let lines = rawContent
        .replace(/<div class="content">/g, '')
        .replace(/<\/div>/g, '')
        .replace(/```java/g, '')
        .replace(/```/g, '')
        .split('\n');
    
    let newLines = [];
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        if (trimmed === '</summary>') {
            newLines.push(line);
            newLines.push('');
            continue;
        }
        if (trimmed === '</details>') {
            if (inCodeBlock) {
                newLines.push('```');
                newLines.push('');
                inCodeBlock = false;
            }
            if (newLines.length > 0 && newLines[newLines.length - 1] !== '') {
                newLines.push('');
            }
            newLines.push(line);
            continue;
        }

        if (inCodeBlock) {
            if ((textLineRegex.test(trimmed) && !codeLineRegex.test(trimmed)) || isHeader.test(trimmed) || line.startsWith('<summary') || line.startsWith('</summary') || line.startsWith('<details') || line.startsWith('</details')) {
                
                if (trimmed === '') {
                    let nextNonEmpty = '';
                    for (let j = i + 1; j < lines.length; j++) {
                        if (lines[j].trim() !== '') {
                            nextNonEmpty = lines[j].trim();
                            break;
                        }
                    }
                    if (!codeLineRegex.test(nextNonEmpty) && !codeSymbolRegex.test(nextNonEmpty) && textLineRegex.test(nextNonEmpty)) {
                        newLines.push('```');
                        inCodeBlock = false;
                    }
                } else {
                    newLines.push('```');
                    newLines.push('');
                    inCodeBlock = false;
                }
            }
            
            if (inCodeBlock) {
                line = line.replace(/<br>\s*$/, '');
                newLines.push(line);
                continue;
            }
        }
        
        if (!inCodeBlock) {
            if (trimmed.startsWith('// or')) {
                newLines.push('');
                newLines.push('```java');
                inCodeBlock = true;
                newLines.push(line);
                continue;
            }

            if ((codeLineRegex.test(trimmed) || codeSymbolRegex.test(trimmed)) && !trimmed.startsWith('<')) {
                newLines.push('');
                newLines.push('```java');
                inCodeBlock = true;
                line = line.replace(/<br>\s*$/, '');
                newLines.push(line);
                continue;
            }
            
            newLines.push(line);
        }
    }
    
    if (inCodeBlock) {
        newLines.push('```');
        newLines.push('');
    }

    let text = newLines.join('\n');
    text = text.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`Structured ${file}`);
}
