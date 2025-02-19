export enum Commands {
    CLASS_DIAGRAM = 'php-class-diagram.generateClassDiagram',
    PACKAGE_DIAGRAM = 'php-class-diagram.generatePackageDiagram'
}

export function getCommand(command: Commands, phpClassDiagram: string, target: string, output: string): string {
    switch (command) {
        case Commands.CLASS_DIAGRAM:
            return `${phpClassDiagram} ${target} > ${output}`;
        case Commands.PACKAGE_DIAGRAM:
            return `${phpClassDiagram} --package-diagram ${target} > ${output}`;
        default:
            throw new Error('invalid command.');
    }
}
