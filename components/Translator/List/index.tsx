"use client";

import * as styles from "./style.css";
import type { termType } from "@/types";
import { useRef, useEffect } from "react";

interface TermsListProps {
  terms: termType[];
  scrollToIndex?: number;
}

export const TermsList = ({ terms, scrollToIndex }: TermsListProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToIndex !== undefined && sectionRef.current) {
      const termElement = sectionRef.current.querySelector(`#term-item-${scrollToIndex}`);
      if (termElement) {
        termElement.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest",
          inline: "nearest"
        });
      }
    }
  }, [scrollToIndex]);

  if (!terms?.length) return null;

  return (
    <div ref={sectionRef} className={styles.termsSection}>
      <div className={styles.termsList}>
        {terms.map((term, index) => (
          <TermItem key={index} term={term} index={index} />
        ))}
      </div>
    </div>
  );
};

const TermItem = ({ term, index }: { term: termType; index: number }) => (
  <div id={`term-item-${index}`} className={styles.termItem}>
    <div className={styles.termHeader}>
      <span className={styles.termWord}>{term.term}</span>
    </div>
    <p className={styles.termMeaning}>{term.meaning}</p>
  </div>
);