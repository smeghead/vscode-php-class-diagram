
export function getCommand(phpClassDiagram: string, target: string, output: string): string {
    return `${phpClassDiagram} ${target} > ${output}`;
}
