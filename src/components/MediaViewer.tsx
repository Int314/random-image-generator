"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type MediaType = "image" | "video";

interface PixabayMedia {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL?: string;
  previewWidth?: number;
  previewHeight?: number;
  webformatURL?: string;
  webformatWidth?: number;
  webformatHeight?: number;
  largeImageURL?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSize?: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  videos?: {
    large?: { url: string; width: number; height: number; size: number };
    medium?: { url: string; width: number; height: number; size: number };
    small?: { url: string; width: number; height: number; size: number };
    tiny?: { url: string; width: number; height: number; size: number };
  };
}

export default function MediaViewer() {
  const { language, setLanguage, t } = useLanguage();
  const [currentMedia, setCurrentMedia] = useState<PixabayMedia | null>(null);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [orientation, setOrientation] = useState("");
  const [randomness, setRandomness] = useState(50); // 0-100のスライダー値
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動画が変更された時に強制的に再読み込み
  useEffect(() => {
    if (videoRef.current && currentMedia && mediaType === "video") {
      videoRef.current.load();
    }
  }, [currentMedia, mediaType]);

  const categories = [
    { value: "", key: "allCategories" },
    { value: "backgrounds", key: "backgrounds" },
    { value: "fashion", key: "fashion" },
    { value: "nature", key: "nature" },
    { value: "science", key: "science" },
    { value: "education", key: "education" },
    { value: "feelings", key: "feelings" },
    { value: "health", key: "health" },
    { value: "people", key: "people" },
    { value: "religion", key: "religion" },
    { value: "places", key: "places" },
    { value: "animals", key: "animals" },
    { value: "industry", key: "industry" },
    { value: "computer", key: "computer" },
    { value: "food", key: "food" },
    { value: "sports", key: "sports" },
    { value: "transportation", key: "transportation" },
    { value: "travel", key: "travel" },
    { value: "buildings", key: "buildings" },
    { value: "business", key: "business" },
    { value: "music", key: "music" },
  ];

  const fetchRandomMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        type: mediaType,
        ...(searchQuery && { q: searchQuery }),
        ...(category && { category }),
        ...(orientation && { orientation }),
        randomness: randomness.toString(),
      });

      const response = await fetch(`/api/random-media?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch media");
      }

      const data = await response.json();
      setCurrentMedia(data.media);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!currentMedia) return;

    let downloadUrl = "";
    let filename = "";

    if (mediaType === "image") {
      downloadUrl =
        currentMedia.largeImageURL || currentMedia.webformatURL || "";
      filename = `pixabay-image-${currentMedia.id}.jpg`;
    } else if (currentMedia.videos) {
      downloadUrl =
        currentMedia.videos.large?.url ||
        currentMedia.videos.medium?.url ||
        currentMedia.videos.small?.url ||
        "";
      filename = `pixabay-video-${currentMedia.id}.mp4`;
    }

    if (!downloadUrl) {
      setError("Download URL not available");
      return;
    }

    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (_err) {
      setError("Failed to download media");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {t("title")}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t("language")}:
            </span>
            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  language === "en"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("ja")}
                className={`px-3 py-1 text-sm font-medium transition-colors border-l border-gray-300 dark:border-gray-600 ${
                  language === "ja"
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                日本語
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            <div>
              <label
                htmlFor="media-type"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("mediaType")}
              </label>
              <select
                id="media-type"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as MediaType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="image">{t("image")}</option>
                <option value="video">{t("video")}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("category")}
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {t(cat.key)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-query"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("searchQuery")}
              </label>
              <input
                id="search-query"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="orientation"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("orientation")}
              </label>
              <select
                id="orientation"
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                disabled={mediaType === "video"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
              >
                <option value="">{t("allOrientations")}</option>
                <option value="horizontal">{t("horizontal")}</option>
                <option value="vertical">{t("vertical")}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="randomness"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                {t("randomness")}: {randomness}%
              </label>
              <div className="space-y-2">
                <input
                  id="randomness"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={randomness}
                  onChange={(e) => setRandomness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{t("qualityFocus")}</span>
                  <span>{t("fullyRandom")}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchRandomMedia}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? t("loading") : t("getRandomMedia")}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {currentMedia && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              {mediaType === "image" ? (
                <div className="relative w-full flex justify-center">
                  {currentMedia.webformatURL || currentMedia.largeImageURL ? (
                    <Image
                      src={
                        currentMedia.webformatURL ||
                        currentMedia.largeImageURL ||
                        "/placeholder.jpg"
                      }
                      alt={currentMedia.tags}
                      width={currentMedia.webformatWidth || 640}
                      height={currentMedia.webformatHeight || 480}
                      className="max-w-full h-auto rounded-lg shadow-md"
                      style={{ maxHeight: "600px", width: "auto" }}
                      priority={false}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-500 dark:text-gray-400">
                        {t("noImageAvailable")}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                currentMedia.videos && (
                  <div className="relative w-full flex justify-center">
                    {/* biome-ignore lint/a11y/useMediaCaption: Pixabayの動画にはキャプションファイルが提供されていないため */}
                    <video
                      ref={videoRef}
                      controls
                      className="max-w-full h-auto rounded-lg shadow-md"
                      style={{ maxHeight: "600px" }}
                      aria-label={`Video: ${currentMedia.tags}`}
                    >
                      <source
                        src={
                          currentMedia.videos.large?.url ||
                          currentMedia.videos.medium?.url ||
                          currentMedia.videos.small?.url
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("views")}:</span>{" "}
                {currentMedia.views.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("downloads")}:</span>{" "}
                {currentMedia.downloads.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("likes")}:</span>{" "}
                {currentMedia.likes.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t("user")}:</span>{" "}
                {currentMedia.user}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {t("tags")}:{" "}
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {currentMedia.tags}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
              >
                {t("download")}
              </button>
              <a
                href={currentMedia.pageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 font-medium text-center"
              >
                {t("viewOnPixabay")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
