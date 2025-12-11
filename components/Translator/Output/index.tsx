"use client";

import * as styles from "./style.css";
import { Loading } from "../Loading";
import type { LanguageType, termType } from "@/types";
import { useMemo } from "react";

interface TranslatorOutputProps {
  targetLang: LanguageType;
  isPending: boolean;
  translatedText: string;
  terms?: termType[];
}

export const TranslatorOutput = ({
  targetLang,
  isPending,
  translatedText,
  terms = [],
}: TranslatorOutputProps) => {
  const formattedText = useMemo(() => {
    if (!translatedText || !terms.length) return translatedText;

    const termMap = new Map(
      terms
        .filter((term) => term.original)
        .map((term) => [term.original.toLowerCase(), term])
    );

    if (!termMap.size) return translatedText;

    const originalTerms = Array.from(termMap.keys());
    const regex = new RegExp(`(${originalTerms.join("|")})`, "gi");
    const parts = translatedText.split(regex);

    return parts.map((part, index) => {
      const term = termMap.get(part.toLowerCase());

      if (term) {
        return (
          <span key={index} className={styles.termWrapper}>
            <span className={styles.underlinedTerm}>{part}</span>
            <button className={styles.termLabel}>{term.term}</button>
          </span>
        );
      }
      return part;
    });
  }, [translatedText, terms]);

  return (
    <div className={styles.outputSection}>
      <div className={styles.languageHeader}>
        <div className={styles.languageLabel}>{targetLang}</div>
      </div>
      <div className={styles.outputText}>
        {isPending ? <Loading /> : formattedText}
      </div>
    </div>
  );
};
