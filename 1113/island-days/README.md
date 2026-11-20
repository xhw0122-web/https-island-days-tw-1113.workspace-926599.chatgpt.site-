# 環遊世界 365 天

從台灣出發的 12 個月示範路線。可用月份選單或地圖選站，查看城市停留天數、交通、預算與官方入境資訊。出發日期、全年目標預算與行前清單儲存在目前瀏覽器。

- `dist/travel-plan.js` 保存行程與各月估算。每月保險估算為新台幣 3,000 元，備用金為其餘費用的 10%，估算區間為基準的 ±20%。
- `dist/world-land.json` 使用 [Natural Earth 1:110m Land](https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/) 公開領域資料，保留陸地幾何並將座標四捨五入至小數第三位。路線線段表示建議移動順序。
- `dist/sw.js` 保存離線首頁、行程、地圖與靜態資源。更新離線資源時，同步更新快取版本。

使用內建 Node.js，無需安裝套件。

```sh
npm run dev
npm test
```

開發伺服器預設使用連接埠 4173。測試涵蓋 365 天日期計算、預算，以及兩種 GitHub Pages 路徑的 PWA 快取。
