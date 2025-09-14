interface MediaItem {
  id: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  tags: string;
  user: string;
}

export function selectBestMedia(mediaItems: MediaItem[]): MediaItem | null {
  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  // エンゲージメント率とダウンロード率でスコアリング
  const scoredItems = mediaItems.map((item) => {
    const engagementRate = item.likes / Math.max(item.views, 1);
    const downloadRate = item.downloads / Math.max(item.views, 1);
    const score = engagementRate * 0.3 + downloadRate * 0.7; // ウェイト調整
    return { item, score };
  });

  // スコアでソート（降順）
  scoredItems.sort((a, b) => b.score - a.score);

  // 上位10%のアイテムからランダムに選択
  const topPercentile = Math.ceil(scoredItems.length * 0.1);
  const topItems = scoredItems.slice(0, topPercentile);
  const randomTop = Math.floor(Math.random() * topItems.length);

  return topItems[randomTop].item;
}
