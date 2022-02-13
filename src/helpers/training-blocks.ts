import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllBlockKeys(): string[] {
    const blockFiles = fs.readdirSync(path.join(process.cwd(), 'src/markdown/blocks'));
    return blockFiles.map(value => value.replace('.md', ''));
}

export function getBlockContentMD(blockKey: string): Buffer {
    return fs.readFileSync(path.join(process.cwd(), 'src/markdown/blocks', `${blockKey}.md`));
}

export function getBlockContentMDParsed(blockKey: string) {
    const blockContentMD = getBlockContentMD(blockKey);

    return matter(blockContentMD);
}