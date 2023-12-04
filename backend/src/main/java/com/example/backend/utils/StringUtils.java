package com.example.backend.utils;

import java.util.List;

public class StringUtils {
    public static String checkPluralForms(String searchTerm, List<String> words) {
        for (String originalWord : words) {
            String[] allWords = originalWord.split(" ");

            for (String word : allWords) {
                String convertedWord = convertWordToSingular(searchTerm, word);
                if (convertedWord != null) {
                    return convertedWord;
                }
            }
        }

        return "";
    }

    public static String convertWordToSingular(String searchTerm, String word) {
        if (word.endsWith("ies")) {
            String modifiedWord = word.substring(0, word.length() - 3) + "y";
            if (containsCaseInsensitiveWord(searchTerm, modifiedWord)) {
                return word;
            }
        } else if (word.endsWith("s")) {
            String modifiedWord = word.substring(0, word.length() - 1);
            if (containsCaseInsensitiveWord(searchTerm, modifiedWord)) {
                return word;
            }
        } else if (containsCaseInsensitiveWord(searchTerm, word)) {
            return word;
        }

        return null;
    }

    private static boolean containsCaseInsensitiveWord(String searchTerm, String text) {
        return text.toLowerCase().contains(searchTerm.toLowerCase());
    }
}
