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
  onTermClick?: (index: number) => void;
}

export const TranslatorOutput = ({
  targetLang,
  isPending,
  translatedText,
  terms = [],
  onTermClick,
}: TranslatorOutputProps) => {
  const formattedText = useMemo(() => {
    if (!translatedText || !terms.length) return translatedText;

    const termMap = new Map(
      terms
        .filter((term) => term.original)
        .map((term, index) => [term.original.toLowerCase(), { ...term, index }])
    );

    if (!termMap.size) return translatedText;

    const originalTerms = Array.from(termMap.keys());
    const regex = new RegExp(`(${originalTerms.join("|")})`, "gi");
    const parts = translatedText.split(regex);

    return parts.map((part, index) => {
      const termData = termMap.get(part.toLowerCase());

      if (termData) {
        return (
          <span key={index} className={styles.termWrapper}>
            <span 
              className={styles.underlinedTerm}
              onMouseEnter={() => onTermClick?.(termData.index)}
            >
              {part}
            </span>
            <span className={styles.termLabel}>
              {termData.term}
            </span>
          </span>
        );
      }
      return part;
    });
  }, [translatedText, terms, onTermClick]);

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