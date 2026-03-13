#!/usr/bin/env node

// =============================================================================
// scan_components.js
//
// Uses react-docgen-typescript to scan ALL components inside the src/ folder
// and outputs a single JSON file with every component's name, description,
// file path, and props (type, required, default, description).
//
// Requirements:
//   npm install react-docgen-typescript --legacy-peer-deps
//
// Usage:
//   node scan_components.js                        # scans ./src, outputs components.json
//   node scan_components.js ./my-app/src           # custom src path
//   node scan_components.js ./src --tsconfig ./tsconfig.json
//   node scan_components.js ./src --output ./docs/components.json
// =============================================================================

const rdts = require("react-docgen-typescript");
const fs   = require("fs");
const path = require("path");

// ── CLI args ──────────────────────────────────────────────────────────────────
const args       = process.argv.slice(2);
const srcDir     = path.resolve(args.find((a) => !a.startsWith("--")) || "./src");
const tsconfigArg = args.find((a) => a.startsWith("--tsconfig="))?.split("=")[1];
const outputArg  = args.find((a) => a.startsWith("--output="))?.split("=")[1] || "components.json";

// ── Colors ────────────────────────────────────────────────────────────────────
const G = "\x1b[32m", Y = "\x1b[33m", R = "\x1b[0m", D = "\x1b[2m";
const log  = (m) => console.log(`${G}[INFO]${R}  ${m}`);
const warn = (m) => console.log(`${Y}[WARN]${R}  ${m}`);

// ── Dirs/extensions to skip ───────────────────────────────────────────────────
const SKIP_DIRS  = new Set(["node_modules", "__tests__", "__mocks__", "stories", ".storybook"]);
const EXTENSIONS = new Set([".tsx", ".ts"]);

// =============================================================================
// Walk src/ recursively and collect all .tsx / .ts files
// =============================================================================
function walkDir(dir, found = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkDir(path.join(dir, entry.name), found);
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      found.push(path.join(dir, entry.name));
    }
  }
  return found;
}

// =============================================================================
// Build react-docgen-typescript parser
// - withCustomConfig if tsconfig path provided
// - withDefaultConfig otherwise
// =============================================================================
function makeParser() {
  const options = {
    shouldExtractLiteralValuesFromEnum: true,   // "primary"|"secondary" instead of "enum"
    shouldRemoveUndefinedFromOptional: true,     // cleaner optional types
    propFilter: (prop) => {
      // Drop props inherited from node_modules (e.g. all HTML attributes from React.HTMLProps)
      if (prop.parent) {
        return !prop.parent.fileName.includes("node_modules");
      }
      return true;
    },
  };

  if (tsconfigArg) {
    const tsconfigPath = path.resolve(tsconfigArg);
    log(`Using tsconfig: ${tsconfigPath}`);
    return rdts.withCustomConfig(tsconfigPath, options);
  }

  return rdts.withDefaultConfig(options);
}

// =============================================================================
// Shape raw react-docgen-typescript output into a clean record
// =============================================================================
function formatType(typeDef) {
  if (!typeDef) return "any";
  // Enum with literal values → show them inline
  if (typeDef.name === "enum" && Array.isArray(typeDef.value)) {
    return typeDef.value.map((v) => v.value).join(" | ");
  }
  return typeDef.raw || typeDef.name || "any";
}

function buildRecord(doc) {
  const props = Object.entries(doc.props || {}).map(([name, def]) => ({
    name,
    type:         formatType(def.type),
    required:     def.required,
    defaultValue: def.defaultValue?.value ?? null,
    description:  def.description || "",
  }));

  return {
    name:        doc.displayName,
    description: doc.description || "",
    file:        path.relative(srcDir, doc.filePath),
    props,
  };
}

// =============================================================================
// Main
// =============================================================================
function main() {
  if (!fs.existsSync(srcDir)) {
    console.error(`src directory not found: ${srcDir}`);
    process.exit(1);
  }

  log(`Scanning : ${srcDir}`);

  // 1. Find all .tsx / .ts files under src/
  const files = walkDir(srcDir);
  log(`Files    : ${files.length} TypeScript/TSX files found`);

  if (files.length === 0) {
    warn("No .tsx/.ts files found. Check your src path.");
    process.exit(0);
  }

  // 2. react-docgen-typescript parses all files in one pass
  //    (single TS program = faster than parsing file-by-file)
  log(`Parsing with react-docgen-typescript...`);
  const parser = makeParser();

  let raw = [];
  try {
    raw = parser.parse(files);
  } catch (err) {
    console.error(`Parse error: ${err.message}`);
    process.exit(1);
  }

  if (raw.length === 0) {
    warn("No components found. Make sure components have JSDoc comments and exported interfaces.");
    process.exit(0);
  }

  // 3. Shape into clean records and sort by name
  const components = raw
    .map(buildRecord)
    .sort((a, b) => a.name.localeCompare(b.name));

  // 4. Write single output JSON file
  const outputPath = path.resolve(outputArg);
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 2), "utf8");

  // 5. Print summary
  const withDesc   = components.filter((c) => c.description).length;
  const totalProps = components.reduce((s, c) => s + c.props.length, 0);

  console.log("");
  log(`Components found : ${components.length}`);
  log(`With description : ${withDesc} / ${components.length}${withDesc < components.length ? ` ${Y}(${components.length - withDesc} missing JSDoc)${R}` : ""}`);
  log(`Total props      : ${totalProps}`);
  log(`Output saved to  : ${outputPath}`);
  console.log("");

  // 6. Print a quick preview table to stdout
  console.log(`${D}${"Component".padEnd(28)} ${"File".padEnd(45)} Props${R}`);
  console.log(`${D}${"─".repeat(80)}${R}`);
  for (const c of components) {
    const name  = c.name.padEnd(28);
    const file  = c.file.padEnd(45);
    const props = c.props.length;
    const desc  = c.description ? "" : ` ${Y}(no description)${R}`;
    console.log(`${name} ${D}${file}${R} ${props}${desc}`);
  }
  console.log("");
}

main();
