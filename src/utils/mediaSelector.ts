interface MediaItem {
  id: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  tags: string;
  user: string;
}

export function selectBestMedia(
  mediaItems: MediaItem[],
  randomness: number = 50,
): MediaItem | null {
  if (!mediaItems || mediaItems.length === 0) {
    return null;
  }

  // エンゲージメント率とダウンロード率でスコアリング
  const scoredItems = mediaItems.map((item) => {
    const engagementRate = item.likes / Math.max(item.views, 1);
    const downloadRate = item.downloads / Math.max(item.views, 1);
    const score = engagementRate * 0.7 + downloadRate * 0.3; // ウェイト調整
    return { item, score };
  });

  // スコアでソート（降順）
  scoredItems.sort((a, b) => b.score - a.score);

  // ランダム度合いに応じて選択範囲を決定
  // randomness: 0% = 上位5%から選択（品質重視）
  // randomness: 50% = 上位30%から選択（バランス）
  // randomness: 100% = 全体から選択（完全ランダム）
  const minPercentile = 0.05; // 最低5%
  const maxPercentile = 1.0; // 最大100%
  const percentage =
    minPercentile + (randomness / 100) * (maxPercentile - minPercentile);
  const topPercentile = Math.ceil(scoredItems.length * percentage);

  const topItems = scoredItems.slice(0, topPercentile);
  const randomTop = Math.floor(Math.random() * topItems.length);

  return topItems[randomTop].item;
}
