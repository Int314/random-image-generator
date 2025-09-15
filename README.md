# Random Media Generator / ランダムメディアジェネレーター

[English](#english) | [日本語](#japanese)

---

## English

A modern web application that generates and downloads random images and videos from Pixabay API with intelligent selection algorithms and multilingual support.

## ✨ Features

### 🎯 Smart Media Selection
- **Intelligent Algorithm**: Prioritizes content based on engagement rates (likes/views) and download popularity
- **Randomness Control**: Adjustable slider (0-100%) to balance between quality focus and complete randomness
- **Quality Filtering**: Selects from top-performing content while maintaining variety

### 🌐 Multilingual Support
- **English/Japanese**: Complete UI translation support
- **Real-time Switching**: Instant language toggle with tab-style interface
- **Localized Content**: All labels, messages, and placeholders translated

### 🔍 Advanced Filtering
- **Media Types**: Images and videos
- **Categories**: 20+ categories (nature, technology, people, etc.)
- **Orientation**: Landscape, portrait, or all orientations (images only)
- **Search**: Custom keyword search with multilingual placeholders

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dark Mode Support**: Automatic theme adaptation
- **Next.js Image Optimization**: Automatic image compression and WebP conversion
- **Loading States**: Smooth transitions and visual feedback

### 📊 Rich Media Information
- **Statistics**: Views, downloads, likes, and user information
- **Metadata**: Tags and source attribution
- **Direct Actions**: One-click download and Pixabay source link

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Pixabay API key (free at [pixabay.com/api](https://pixabay.com/api/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Int314/random-image-generator.git
   cd random-image-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Pixabay API key:
   ```env
   PIXABAY_API_KEY=your_pixabay_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Linting**: Biome (faster alternative to ESLint + Prettier)
- **Image Optimization**: Next.js Image component
- **API**: Pixabay REST API
- **Deployment**: Vercel-ready

## 📱 Usage

1. **Select Media Type**: Choose between images or videos
2. **Choose Category**: Pick from 20+ available categories or leave empty for all
3. **Set Orientation**: For images, choose landscape, portrait, or all orientations
4. **Add Search Terms**: Optional keywords to narrow down results
5. **Adjust Randomness**: Use the slider to control quality vs. randomness balance
   - **0%**: Highest quality content only (top 5%)
   - **50%**: Balanced selection (top 30%)
   - **100%**: Completely random from all results
6. **Generate**: Click "Get Random Media" to fetch content
7. **Download**: One-click download or view source on Pixabay

## 🎛️ Randomness Algorithm

The app uses a sophisticated selection algorithm that scores media based on:

- **Engagement Rate**: likes/views ratio (30% weight)
- **Download Popularity**: downloads/views ratio (70% weight)
- **Quality Filtering**: Removes low-engagement content
- **Randomness Control**: User-adjustable selection range

```
Score = (Likes/Views × 0.3) + (Downloads/Views × 0.7)
Selection Range = 5% → User Setting → 100%
```

## 🌍 Language Support

The application supports:
- **English**: Complete interface
- **Japanese (日本語)**: Full translation including categories and error messages

Language switching is instant and affects all UI elements including:
- Navigation and buttons
- Form labels and placeholders
- Category names
- Error messages
- Statistical information

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

### Code Quality
- **Biome**: Fast linting and formatting (10-100x faster than ESLint+Prettier)
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Next.js**: Server-side rendering and optimization

## 📄 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PIXABAY_API_KEY` | Your Pixabay API key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Pixabay](https://pixabay.com/) for providing the media API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Biome](https://biomejs.dev/) for fast code formatting and linting

## 📸 Screenshots

### English Interface
![English Interface](docs/screenshot-en.png)

### Japanese Interface
![Japanese Interface](docs/screenshot-ja.png)

### Randomness Control
![Randomness Slider](docs/randomness-control.png)

---

## Japanese

Pixabay APIを使用してランダムな画像や動画を生成・ダウンロードできる、インテリジェントな選択アルゴリズムと多言語サポートを備えたモダンなウェブアプリケーションです。

## ✨ 機能

### 🎯 スマートメディア選択
- **インテリジェントアルゴリズム**: エンゲージメント率（いいね/閲覧数）とダウンロード人気度に基づいてコンテンツを優先選択
- **ランダム度制御**: 品質重視と完全ランダムのバランスを調整可能なスライダー（0-100%）
- **品質フィルタリング**: 多様性を保ちながらも高パフォーマンスコンテンツから選択

### 🌐 多言語サポート
- **英語/日本語**: 完全なUI翻訳サポート
- **リアルタイム切り替え**: タブスタイルインターフェースで瞬時に言語切り替え
- **ローカライズコンテンツ**: すべてのラベル、メッセージ、プレースホルダーを翻訳

### 🔍 高度なフィルタリング
- **メディアタイプ**: 画像と動画
- **カテゴリー**: 20以上のカテゴリー（自然、テクノロジー、人物など）
- **向き**: 横長、縦長、またはすべての向き（画像のみ）
- **検索**: 多言語プレースホルダー付きカスタムキーワード検索

### 🎨 モダンUI/UX
- **レスポンシブデザイン**: Tailwind CSSによるモバイルファースト
- **ダークモードサポート**: 自動テーマ適応
- **Next.js画像最適化**: 自動画像圧縮とWebP変換
- **ローディング状態**: スムーズな遷移と視覚的フィードバック

### 📊 豊富なメディア情報
- **統計情報**: 閲覧数、ダウンロード数、いいね数、ユーザー情報
- **メタデータ**: タグとソース属性
- **直接アクション**: ワンクリックダウンロードとPixabayソースリンク

## 🚀 はじめ方

### 前提条件
- Node.js 18+
- npm または yarn
- Pixabay APIキー（[pixabay.com/api](https://pixabay.com/api/)で無料取得）

### インストール

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/Int314/random-image-generator.git
   cd random-image-generator
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数を設定**
   ```bash
   cp .env.example .env.local
   ```

   `.env.local`を編集してPixabay APIキーを追加：
   ```env
   PIXABAY_API_KEY=your_pixabay_api_key_here
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

5. **ブラウザを開く**
   [http://localhost:3000](http://localhost:3000)にアクセス

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15.5.3 with App Router
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **リンティング**: Biome（ESLint + Prettierの高速代替）
- **画像最適化**: Next.js Imageコンポーネント
- **API**: Pixabay REST API
- **デプロイ**: Vercel対応

## 📱 使用方法

1. **メディアタイプを選択**: 画像または動画を選択
2. **カテゴリーを選択**: 20以上の利用可能カテゴリーから選択、または空欄ですべて
3. **向きを設定**: 画像の場合、横長、縦長、またはすべての向きを選択
4. **検索語句を追加**: 結果を絞り込むためのオプションキーワード
5. **ランダム度を調整**: スライダーで品質対ランダムのバランスを制御
   - **0%**: 最高品質コンテンツのみ（上位5%）
   - **50%**: バランス選択（上位30%）
   - **100%**: すべての結果から完全ランダム
6. **生成**: 「メディアを取得」をクリックしてコンテンツを取得
7. **ダウンロード**: ワンクリックダウンロードまたはPixabayでソースを表示

## 🎛️ ランダムアルゴリズム

アプリは以下に基づいてメディアをスコアリングする洗練された選択アルゴリズムを使用：

- **エンゲージメント率**: いいね/閲覧数比率（30%重み）
- **ダウンロード人気度**: ダウンロード/閲覧数比率（70%重み）
- **品質フィルタリング**: 低エンゲージメントコンテンツを除去
- **ランダム度制御**: ユーザー調整可能な選択範囲

```
スコア = (いいね数/閲覧数 × 0.3) + (ダウンロード数/閲覧数 × 0.7)
選択範囲 = 5% → ユーザー設定 → 100%
```

## 🌍 言語サポート

アプリケーションは以下をサポート：
- **英語**: 完全なインターフェース
- **日本語**: カテゴリーやエラーメッセージを含む完全翻訳

言語切り替えは瞬時で、以下すべてのUI要素に影響：
- ナビゲーションとボタン
- フォームラベルとプレースホルダー
- カテゴリー名
- エラーメッセージ
- 統計情報

## 🔧 開発

### スクリプト
```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動
npm run lint         # Biomeリンター実行
npm run format       # Biomeでコード整形
```

### コード品質
- **Biome**: 高速リンティングと整形（ESLint+Prettierより10-100倍高速）
- **TypeScript**: 完全な型安全性
- **Tailwind CSS**: ユーティリティファーストスタイリング
- **Next.js**: サーバーサイドレンダリングと最適化

## 📄 環境変数

| 変数 | 説明 | 必須 |
|------|------|------|
| `PIXABAY_API_KEY` | Pixabay APIキー | はい |

## 🤝 コントリビューション

1. リポジトリをフォーク
2. フィーチャーブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを開く

## 📝 ライセンス

このプロジェクトはオープンソースで、[MIT License](LICENSE)の下で利用可能です。

## 🙏 謝辞

- [Pixabay](https://pixabay.com/) - メディアAPIの提供
- [Next.js](https://nextjs.org/) - 素晴らしいフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [Biome](https://biomejs.dev/) - 高速コード整形とリンティング

## 📸 スクリーンショット

### 英語インターフェース
![English Interface](docs/screenshot-en.png)

### 日本語インターフェース
![Japanese Interface](docs/screenshot-ja.png)

### ランダム度制御
![Randomness Slider](docs/randomness-control.png)

---

**Built with ❤️ using Next.js and Claude Code**