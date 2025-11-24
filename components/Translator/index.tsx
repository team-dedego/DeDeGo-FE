"use client";

import { useState, useEffect } from "react";
import * as styles from "./style.css";
import { useTranslateMutation } from "@/service/translator/translator.mutation";
import type { responseType } from "@/types";
import { Toastify } from "../Toastify";

const LoadingText = () => {
  const loadingMessages = [
    "평균 6초정도 걸려요 ㅠㅠ 조금만 기다려주세요",
    "얼마 안남았어요!!",
    "번역이 생각보다 어렵네요..",
    "거의 다 됐어요!",
    "열심히 번역하고 있어요!!",
    "조금만 더 기다려주세요!",
  ];

  const [currentMessage, setCurrentMessage] = useState(
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)]
  );
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setCurrentMessage(loadingMessages[randomIndex]);
        setFadeIn(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingText} data-fade-in={fadeIn}>
      {currentMessage}
    </div>
  );
};

export default function Translator() {
  const [inputText, setInputText] = useState("");
  const [translateResult, setTranslateResult] = useState<responseType | null>(
    null
  );
  const [sourceLang, setSourceLang] = useState("판교어");

  const { mutate, isPending } = useTranslateMutation();

  const oppositeLanguage = sourceLang === "판교어" ? "일반어" : "판교어";

  const handleTranslate = () => {
    if (!inputText.trim()) {
      Toastify({ content: "번역할 내용을 입력해주세요!", type: "info" });
      return;
    }

    const direction = sourceLang === "판교어" ? "to_korean" : "to_pangyo";

    mutate(
      { text: inputText, direction },
      {
        onSuccess: (data) => {
          setTranslateResult(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleCopy = () => {
    if (!translateResult?.translated) {
      Toastify({ content: "복사할 번역 결과가 없습니다!", type: "info" });
      return;
    }
    navigator.clipboard.writeText(translateResult.translated);
    Toastify({
      content: "번역된 텍스트가 클립보드에 복사되었습니다!",
      type: "info",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.translatorBox}>
        <div className={styles.mainContent}>
          <div className={styles.inputSection}>
            <div className={styles.languageHeader}>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.select}
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  disabled={isPending}
                >
                  <option value="판교어">판교어</option>
                  <option value="일반어">일반어</option>
                </select>
                <img
                  src="/arrow.png"
                  alt="arrow"
                  className={styles.selectArrow}
                />
              </div>
            </div>
            <textarea
              className={styles.textArea}
              placeholder="번역할 내용을 입력하세요"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className={styles.outputSection}>
            <div className={styles.languageHeader}>
              <div className={styles.languageLabel}>{oppositeLanguage}</div>
            </div>
            <div className={styles.outputText}>
              {isPending ? <LoadingText /> : translateResult?.translated || ""}
            </div>
          </div>
        </div>

        {translateResult && translateResult.terms.length > 0 && (
          <div className={styles.termsSection}>
            <div className={styles.termsList}>
              {translateResult.terms.map((term, index) => (
                <div key={index} className={styles.termItem}>
                  <div className={styles.termHeader}>
                    <span className={styles.termWord}>{term.term}</span>
                    {term.original && (
                      <span className={styles.termOriginal}>
                        ({term.original})
                      </span>
                    )}
                  </div>
                  <p className={styles.termMeaning}>{term.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <button
            className={styles.translateButton}
            onClick={handleTranslate}
            disabled={isPending}
          >
            {isPending ? "번역 중..." : "번역하기"}
          </button>
          <div className={styles.iconButtons}>
            <a
              href="https://github.com/Team-DeDeGo/DeDeGo-FE"
              target="_blank"
              className={styles.iconButton}
            >
              <img src="/github.png" alt="GitHub" className={styles.icon} />
            </a>
            <button
              className={styles.iconButton}
              onClick={handleCopy}
              disabled={isPending || !translateResult?.translated}
            >
              <img src="/copy.png" alt="Copy" className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
