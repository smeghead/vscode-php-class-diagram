import { exec } from "child_process";
import fs from "fs";
import path, { ParsedPath } from "path";

function getComposerDirectory(dir: string) {
    const p = path.parse(dir);
    const stat = fs.statSync(dir);
    if (stat.isDirectory() === false) {
        return getComposerDirectory(p.dir);
    }
    if (fs.existsSync(path.join(dir, 'composer.json'))) {
        return dir;
    }
    return getComposerDirectory(p.dir);
}

export function getPhpClassDiagramPath(target: string): string {
    const composerDirectory = getComposerDirectory(target);

    const execPath = path.join(composerDirectory, 'vendor/bin/php-class-diagram');
    if (fs.existsSync(execPath)) {
        return execPath;
    }
    return '';
}

