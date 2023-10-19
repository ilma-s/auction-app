export const capitalizeUrlFragments = (input: string) => {
    const smallWords: string[] = [
        'and',
        'the',
        'a',
        'an',
        'of',
        'in',
        'on',
        'for',
        'with',
        'to',
    ];

    const words: string[] = input.split('-');

    const result: string[] = words.map((word, index) => {
        const lowercased: string = word.toLowerCase();
        if (index === 0 || !smallWords.includes(lowercased)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    });

    return result.join(' ');
};
