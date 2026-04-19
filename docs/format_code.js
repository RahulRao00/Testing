const fs = require('fs');
const path = require('path');

const docsDir = __dirname;
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

// Heuristics for code blocks
const codeLineRegex = /^(?:import |package |public |private |protected |class |interface |@|int |boolean |String\[|String |double |float |char |long |void |try\s*\{|catch\s*\(|finally\s*\{|System\.out\.|driver\.|switchTo|Thread\.sleep|WebElement|By\.|Select |List<|Map<|Set<|HashMap|@Test|@Before|given\(\)|\.when\(\)|\.then\(\)|\.get\(|\.post\(|Assert\.|return |if\s*\(|for\s*\(|while\s*\(|\/\/|switch\s*\(|case |default:|break;|continue;)/;

// Extra check for lines that are just symbols usually found in code
const codeSymbolRegex = /^(\{|\}|\]|\];|\);|;)\s*$/;

// Lines that are definitely NOT code but text
const textLineRegex = /^(?:#|- |\d+\. |What |How |Explain |Definition|Advantages|Disadvantages|Example|Note|Here|This|To |A |An |The |<\/?summary|<\/?details|\/\/ or|<\/?div|$)/i;
const isHeader = /^\s*#/;

for (const file of files) {
    if (file === 'README.md') continue;
    
    // We only apply this aggressive code formatting to a few key files if needed, 
    // but the user wants "any file". We will apply it to all.
    
    const filePath = path.join(docsDir, file);
    let lines = fs.readFileSync(filePath, 'utf8').split('\n');
    
    let newLines = [];
    let inCodeBlock = false;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        
        // 1. Remove <div class="content"> and </div> completely.
        if (trimmed === '<div class="content">' || trimmed === '</div>') {
            continue;
        }

        // 2. Ensure empty lines after summary and before details close
        if (trimmed === '</summary>') {
            newLines.push(line);
            newLines.push('');
            continue;
        }
        if (trimmed === '</details>') {
            // Close code block if open before details closes
            if (inCodeBlock) {
                newLines.push('```');
                newLines.push('');
                inCodeBlock = false;
            }
            if (newLines[newLines.length - 1] !== '') {
                newLines.push('');
            }
            newLines.push(line);
            continue;
        }

        // 3. Auto code block wrapper
        if (inCodeBlock) {
            // Check if we should exit code block
            // We exit if we see a clear text line, a header, or a summary/details tag
            if ((textLineRegex.test(trimmed) && !codeLineRegex.test(trimmed)) || isHeader.test(trimmed) || line.startsWith('<summary') || line.startsWith('</summary') || line.startsWith('<details') || line.startsWith('</details')) {
                // If it's empty, we might wait, but if the next non-empty line is text, we close it early.
                // Actually, let's close it here (unless it's just an empty line and next is code)
                
                // if it's an empty line, look ahead
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
            
            // If still in code block, just output the line
            if (inCodeBlock) {
                // Remove weird trailing <br> if any sneak in
                line = line.replace(/<br>\s*$/, '');
                newLines.push(line);
                continue;
            }
        }
        
        // Not in code block
        if (!inCodeBlock) {
            // Should we enter code block?
            // If it matches code signatures AND it's not starting with an HTML tag
            if ((codeLineRegex.test(trimmed) || codeSymbolRegex.test(trimmed)) && !trimmed.startsWith('<')) {
                // EXCEPTION: things like 'import' might be a normal word in text, but usually it's java code if it ends with ; or is package...
                // The heuristics are quite strong for Java.
                if (trimmed.startsWith('// or')) { 
                    // this is an edge case in java.md
                    newLines.push('');
                    newLines.push('```java');
                    inCodeBlock = true;
                    newLines.push(line);
                    continue;
                }
                
                newLines.push('');
                newLines.push('```java');
                inCodeBlock = true;
                
                line = line.replace(/<br>\s*$/, '');
                newLines.push(line);
                continue;
            }
            
            // Just push regular text
            newLines.push(line);
        }
    }
    
    // If EOF while in code block
    if (inCodeBlock) {
        newLines.push('```');
        newLines.push('');
    }

    // Replace sequences of 3+ newlines with 2
    let text = newLines.join('\n');
    text = text.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`Processed ${file}`);
}
