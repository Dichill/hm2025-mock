const fs = require("fs");
const path = require("path");

// Get all TypeScript files in the components directory
const componentsDir = path.join(__dirname);
const files = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".tsx"));

// Process each file
files.forEach((file) => {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, "utf8");

    // Replace JSX.Element return type
    if (content.includes("): JSX.Element {")) {
        content = content.replace(/\): JSX\.Element \{/g, ") {");
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`Fixed return type in ${file}`);
    }
});

console.log("Done!");
