"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [currentMedia, setCurrentMedia] = useState<PixabayMedia | null>(null);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "",
    "backgrounds",
    "fashion",
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "places",
    "animals",
    "industry",
    "computer",
    "food",
    "sports",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music",
  ];

  const fetchRandomMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        type: mediaType,
        ...(searchQuery && { q: searchQuery }),
        ...(category && { category }),
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
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Random Media Generator
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="media-type"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Media Type
              </label>
              <select
                id="media-type"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value as MediaType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat || "All Categories"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search-query"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Search Query (Optional)
              </label>
              <input
                id="search-query"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., sunset, cats, technology"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={fetchRandomMedia}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Loading..." : "Get Random Media"}
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
                  <Image
                    src={
                      currentMedia.webformatURL ||
                      currentMedia.largeImageURL ||
                      ""
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
                </div>
              ) : (
                currentMedia.videos && (
                  <div className="relative w-full flex justify-center">
                    <video
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
                      {/* キャプションが利用可能な場合のプレースホルダー */}
                      <track
                        kind="captions"
                        src=""
                        srcLang="ja"
                        label="Japanese Captions"
                        default
                        style={{ display: "none" }}
                      />
                      <track
                        kind="captions"
                        src=""
                        srcLang="en"
                        label="English Captions"
                        style={{ display: "none" }}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Views:</span>{" "}
                {currentMedia.views.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Downloads:</span>{" "}
                {currentMedia.downloads.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Likes:</span>{" "}
                {currentMedia.likes.toLocaleString()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">User:</span> {currentMedia.user}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Tags:{" "}
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
                Download
              </button>
              <a
                href={currentMedia.pageURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 font-medium text-center"
              >
                View on Pixabay
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
