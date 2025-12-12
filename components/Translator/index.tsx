"use client";

import * as styles from "./style.css";
import { TranslatorInput } from "./Input";
import { TranslatorOutput } from "./Output";
import { TermsList } from "./List";
import { TranslatorFooter } from "./Footer";
import { useTranslator } from "./useTranslator";
import { getOppositeLanguage } from "@/utils";
import { useState } from "react";

export default function Translator() {
  const {
    inputText,
    setInputText,
    translateResult,
    sourceLang,
    isPending,
    handleSwitchLanguage,
    handleTranslate,
    handleCopy,
  } = useTranslator();

  const [scrollToTermIndex, setScrollToTermIndex] = useState<number | undefined>();

  const targetLang = getOppositeLanguage(sourceLang);

  const handleTermClick = (index: number) => {
    setScrollToTermIndex(index);
    // Reset after scroll
    setTimeout(() => setScrollToTermIndex(undefined), 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.translatorBox}>
        <div className={styles.mainContent}>
          <TranslatorInput
            sourceLang={sourceLang}
            inputText={inputText}
            isPending={isPending}
            onInputChange={setInputText}
            onSwitchLanguage={handleSwitchLanguage}
          />
          <TranslatorOutput
            targetLang={targetLang}
            isPending={isPending}
            translatedText={translateResult?.translated || ""}
            terms={translateResult?.terms ?? []}
            onTermClick={handleTermClick}
          />
        </div>

        <TermsList 
          terms={translateResult?.terms ?? []} 
          scrollToIndex={scrollToTermIndex}
        />

        <TranslatorFooter
          isPending={isPending}
          hasTranslation={!!translateResult?.translated}
          onTranslate={handleTranslate}
          onCopy={handleCopy}
        />
      </div>
    </div>
  );
}