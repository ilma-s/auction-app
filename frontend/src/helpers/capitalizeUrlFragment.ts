import { SMALL_WORDS } from '../utils/constants';

export const capitalizeUrlFragments = (input: string) => {
    const words: string[] = input.split('-');

    const result: string[] = words.map((word, index) => {
        const lowercased: string = word.toLowerCase();
        if (index === 0 || !SMALL_WORDS.includes(lowercased)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    });

    return result.join(' ');
};
