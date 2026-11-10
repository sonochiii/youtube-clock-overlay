# YouTube Clock Overlay ⏰

YouTube再生中、画面の**左上**に現在時刻（HH:MM:SS＋日付）を重ねて表示する小さなプログラムです。
練習や配信の視聴中に「今何時か」を、再生を止めずに確認するために作りました。

## 正直な前提（大事）

iPhone / Android の **YouTube公式アプリの上に時計を重ねることは、OSの制限でできません**
（他アプリの上に表示できるのは電話や PiP など OS が許可したものだけです）。
そこで、同じことを実現する2つの形を用意しました。

| 形 | 向いている環境 | ファイル |
|---|---|---|
| A. Webページ版（GitHub Pages） | iPhone / iPad / PC のブラウザ | `index.html` |
| B. ユーザースクリプト版 | PC の Chrome / Edge / Firefox（Tampermonkey） | `youtube-clock-overlay.user.js` |

## A. Webページ版の使い方

### GitHub Pages で公開する場合

1. このフォルダの中身を GitHub リポジトリにアップロード（`index.html` をルートに置く）
2. リポジトリの **Settings → Pages → Build and deployment → Source: Deploy from a branch**、ブランチは `main` / `(root)` を選択して Save
3. 数分後に表示される URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）を開く

### そのまま使う場合

`index.html` をブラウザで開くだけでも動きます（インターネット接続は必要です）。

### 操作

- 観たい動画の URL を貼って「再生」（通常動画・ライブ・Shorts・`youtu.be` 対応）
- 時計は動画の左上に表示され、クリック操作は動画側に通ります
- 「全画面」ボタン：時計ごと全画面になります（動画側の全画面ボタンでは時計が消えるため、このボタンを使ってください）
- 「時計：小／中／大」で大きさ変更、「画面を消さない」で Wake Lock（対応ブラウザのみ）
- iPhone：Safari で開いて 共有 →「ホーム画面に追加」で、アプリのように起動できます

## B. ユーザースクリプト版の使い方（PC）

1. ブラウザに拡張機能 **Tampermonkey** を入れる
2. Tampermonkey の「新規スクリプトを追加」に、`youtube-clock-overlay.user.js` の中身を貼って保存
3. YouTube を開くと、左上に時計が出ます（YouTube の通常ページ・再生画面の両方）

## 仕様

- 時計は 250ms 間隔で更新（秒表示のズレを小さくするため）
- 動画IDの抽出は `watch?v=` / `youtu.be/` / `/live/` / `/shorts/` / `/embed/` 形式に対応
- 外部ライブラリ不使用、単一ファイルで動作（ユーザースクリプト版も同様）
- 前回再生した URL はブラウザ内にだけ保存されます（外部送信なし）
