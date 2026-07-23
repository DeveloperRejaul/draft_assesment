const fs = require("fs/promises");
const path = require("node:path");

const ICON_DIR = path.join("src/core/assets/icons");
const OUTPUT_FILE = path.join(ICON_DIR, "index.ts");

const unExportNames = ["Index", "Types"];

const toPascalCase = (name) =>
  name
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const main = async () => {
  try {
    const files = await fs.readdir(ICON_DIR);

    const exports = files
      .filter(file =>
        !file.startsWith("index.") &&
        !file.endsWith(".map") &&
        [".ts", ".tsx", ".js", ".jsx"].includes(path.extname(file))
      )
      .map(file => {
        const parsed = path.parse(file);
        const exportName = toPascalCase(parsed.name);

        if (unExportNames.includes(exportName)) return null;

        return `export { default as ${exportName} } from './${parsed.name}';`;
      })
      .filter(Boolean)
      .join("\n");

    await fs.writeFile(OUTPUT_FILE, exports + "\n");

    console.log("index.ts generated successfully");
  } catch (err) {
    console.error("Error generating index.ts", err);
  }
};

main();
