# 島日子：網站與手機網頁 App

公開網址：https://xhw0122-web.github.io/https-island-days-tw-1113.workspace-926599.chatgpt.site-/

網站來源在 `1113/island-days/dist/`。推送至 `main` 後，GitHub Actions 會驗證活動資料，並將此資料夾部署至 GitHub Pages。儲存庫 Settings → Pages → Source 必須選擇 **GitHub Actions**。

根目錄的 `index.html` 同時提供傳統 branch Pages 的入口，避免舊設定只顯示 README 或找不到首頁。所有 App 資源使用相對路徑，支援 GitHub Pages 的專案子路徑。

## 手機安裝

- iPhone / iPad：Safari 開啟網址 → 分享 → 加入主畫面。
- Android：Chrome 開啟網址 → 選單 → 安裝應用程式／加到主畫面。
- 電腦：Chrome 或 Edge 網址列的安裝按鈕。

這是 PWA，可從主畫面獨立開啟，不是 App Store／Google Play 上架的原生 App。首次連線載入並完成快取後可離線閱讀活動文字與收藏；照片、地圖及官方連結需網路。收藏保存在目前瀏覽器／App 裝置，不會跨裝置同步。重新連線會讀取最新網站檔案，離線使用的是上次快取的資料；活動資訊仍須回官方確認。修改離線檔案清單時，請同步更新 `dist/sw.js` 的快取版本。

## 本機預覽與驗證

```sh
cd 1113/island-days
npm run dev
npm test
```

預覽網址為 http://localhost:4173。無需安裝套件。
