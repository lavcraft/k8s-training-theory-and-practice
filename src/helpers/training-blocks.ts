import fs from "fs";
import path from "path";

export function getAllBlockKeys(): string[] {
    const blockFiles = fs.readdirSync(path.join(process.cwd(), 'src/markdown/blocks'));
    return blockFiles.map(value => value.replace('.md', ''));
}