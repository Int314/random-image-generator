"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// 翻訳データ
const translations = {
  en: {
    // Header
    title: "Random Media Generator",

    // Controls
    mediaType: "Media Type",
    category: "Category",
    allCategories: "All Categories",
    searchQuery: "Search Query (Optional)",
    searchPlaceholder: "e.g., sunset, cats, technology",
    orientation: "Orientation (Images Only)",
    allOrientations: "All Orientations",
    horizontal: "Horizontal",
    vertical: "Vertical",
    randomness: "Randomness",
    qualityFocus: "Quality Focus",
    fullyRandom: "Fully Random",

    // Buttons
    getRandomMedia: "Get Media",
    loading: "Loading...",
    download: "Download",
    viewOnPixabay: "View on Pixabay",
    shareOnTwitter: "Share",

    // Media types
    image: "Image",
    video: "Video",

    // Categories
    backgrounds: "Backgrounds",
    fashion: "Fashion",
    nature: "Nature",
    science: "Science",
    education: "Education",
    feelings: "Feelings",
    health: "Health",
    people: "People",
    religion: "Religion",
    places: "Places",
    animals: "Animals",
    industry: "Industry",
    computer: "Computer",
    food: "Food",
    sports: "Sports",
    transportation: "Transportation",
    travel: "Travel",
    buildings: "Buildings",
    business: "Business",
    music: "Music",

    // Stats
    views: "Views",
    downloads: "Downloads",
    likes: "Likes",
    user: "User",
    tags: "Tags",

    // Language
    language: "Language",
    english: "English",
    japanese: "日本語",

    // Error messages
    noImageAvailable: "画像がありません",
  },
  ja: {
    // Header
    title: "Random Media Generator",

    // Controls
    mediaType: "メディアタイプ",
    category: "カテゴリー",
    allCategories: "全カテゴリー",
    searchQuery: "検索キーワード（任意）",
    searchPlaceholder: "例：夕日、猫、テクノロジー",
    orientation: "向き（画像のみ）",
    allOrientations: "全ての向き",
    horizontal: "横長",
    vertical: "縦長",
    randomness: "ランダム度",
    qualityFocus: "品質重視",
    fullyRandom: "完全ランダム",

    // Buttons
    getRandomMedia: "メディアを取得",
    loading: "読み込み中...",
    download: "ダウンロード",
    viewOnPixabay: "Pixabayで表示",
    shareOnTwitter: "シェア",

    // Media types
    image: "画像",
    video: "動画",

    // Categories
    backgrounds: "背景",
    fashion: "ファッション",
    nature: "自然",
    science: "科学",
    education: "教育",
    feelings: "感情",
    health: "健康",
    people: "人物",
    religion: "宗教",
    places: "場所",
    animals: "動物",
    industry: "産業",
    computer: "コンピューター",
    food: "食べ物",
    sports: "スポーツ",
    transportation: "交通",
    travel: "旅行",
    buildings: "建物",
    business: "ビジネス",
    music: "音楽",

    // Stats
    views: "閲覧数",
    downloads: "ダウンロード数",
    likes: "いいね",
    user: "ユーザー",
    tags: "タグ",

    // Language
    language: "言語",
    english: "English",
    japanese: "日本語",

    // Error messages
    noImageAvailable: "画像がありません",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
