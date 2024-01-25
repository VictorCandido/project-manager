export function getNameFeedback(name: string): string {
    return name
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
}