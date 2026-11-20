import {
  categories, checklist, defaultBudget, estimate, isStartDate, months,
  routeSegments, schedule, taipei, totalDays
} from './travel-plan.js';

const byId = id => document.getElementById(id);
const chooseMonth = byId('month-select');
const itinerary = byId('itinerary-content');
const budgetContent = byId('budget-content');
const settingsForm = byId('settings-form');
const startField = byId('start-date');
const budgetField = byId('target-budget');
const settingsStatus = byId('settings-status');
const storageKey = 'world-trip-365-settings-v1';
const numberFormat = new Intl.NumberFormat('zh-TW');
const money = value => 'NT$ ' + numberFormat.format(value);
const range = ({ low, high }) => money(low) + ' – ' + money(high);
const dateRange = (start, end) => start.replaceAll('-', '/') + ' – ' + end.replaceAll('-', '/');
const annualEstimate = estimate(months);
const taiwanYear = Number(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Taipei', year: 'numeric' }).format(new Date()));

let stored = {};
try { stored = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
const validBudget = value => Number.isInteger(value) && value >= 1 && value <= 100000000;
const settings = {
  start: isStartDate(stored.start) ? stored.start : Math.min(taiwanYear + 1, 2099) + '-01-01',
  target: validBudget(stored.target) ? stored.target : defaultBudget,
  completed: Array.isArray(stored.completed) ? checklist.map(([id]) => id).filter(id => stored.completed.includes(id)) : []
};
let currentMonth = 0;
let renderMapSelection = () => {};

for (const month of months) {
  chooseMonth.add(new Option(`第 ${month.number} 個月 · ${month.countries}`, month.number));
}

startField.value = settings.start;
budgetField.value = settings.target;
byId('checklist-items').innerHTML = checklist.map(([id, label]) => `
  <label class="check-item"><input type="checkbox" value="${id}"${settings.completed.includes(id) ? ' checked' : ''}> ${label}</label>
`).join('');

function saveSettings() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

function renderChecklistCount() {
  byId('checklist-count').textContent = `${settings.completed.length} / ${checklist.length} 項完成`;
}

function renderOverview(plan) {
  return `<div class="month-grid">${plan.map(month => `
    <article class="month-card">
      <div class="card-meta"><span class="month-number">第 ${month.number} 個月</span><span>${month.region} · ${month.days} 天</span></div>
      <h3>${month.heading}</h3>
      <p>${month.countries}</p>
      <p>${month.cities.map(([city]) => city).join(' · ')}</p>
      <div class="card-tail">
        <span>${dateRange(month.start, month.end)}</span>
        <button class="text-button" type="button" data-month="${month.number}" aria-label="查看第 ${month.number} 個月行程">看行程 ↗</button>
      </div>
    </article>
  `).join('')}</div>`;
}

function renderMonth(month) {
  return `
    <article class="panel month-detail">
      <div class="card-meta"><span class="month-number">第 ${month.number} 個月</span><span>${month.region} · ${dateRange(month.start, month.end)} · ${month.days} 天</span></div>
      <h3 id="month-detail-heading" tabindex="-1">${month.heading}</h3>
      <p class="detail-countries">${month.countries} · 每人估算 ${range(estimate([month]))}</p>
      <div class="detail-grid">
        <div>
          <h4>城市與停留天數</h4>
          <ul class="city-list">
            ${month.cities.map(([city, days]) => `<li><span>${city}</span><span>${days} 天</span></li>`).join('')}
            <li><span>移動、轉機與備用緩衝</span><span>${month.buffer} 天</span></li>
          </ul>
        </div>
        <div>
          <h4>推薦體驗</h4>
          <ul class="experiences">${month.experiences.map(experience => `<li>${experience}</li>`).join('')}</ul>
          <h4>跨城交通</h4>
          <p>${month.transit}</p>
        </div>
      </div>
      <div class="official-sources">
        <h4>入境與行前查詢</h4>
        ${month.official.map(([label, url]) => `<a class="official-link" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}
        <p>出發前以目的地與轉機地的最新官方公告為準。</p>
      </div>
    </article>`;
}

function renderBudget(selected, currentEstimate) {
  const { amounts, total } = currentEstimate;
  const target = selected ? Math.round(settings.target * total / annualEstimate.total) : settings.target;
  const difference = target - total;
  const comparison = difference === 0 ? '本次基準估算等於預算。'
    : difference > 0 ? `基準估算比預算少 ${money(difference)}。`
      : `基準估算超出預算 ${money(-difference)}。`;
  budgetContent.innerHTML = `
    <div class="budget-grid">
      <article class="panel estimate">
        <h3>${selected ? `第 ${selected.number} 個月估算區間` : '365 天估算區間'}</h3>
        <strong>${range(currentEstimate)}</strong>
        <p>基準估算 ${money(total)}</p>
        <p>${selected ? '依全年估算比例分配的預算' : '你的全年目標預算'} ${money(target)}</p>
        <p>${comparison}</p>
      </article>
      <article class="panel">
        <h3>基準估算明細</h3>
        <ul class="budget-lines">${categories.map((category, index) => `
          <li><span>${category}</span><strong>${money(amounts[index])}</strong></li>
        `).join('')}</ul>
      </article>
    </div>`;
}

function renderPlan() {
  const plan = schedule(settings.start);
  const selected = plan[currentMonth - 1];
  const summaryEstimate = selected ? estimate([selected]) : annualEstimate;
  byId('summary-dates').textContent = selected ? dateRange(selected.start, selected.end) : dateRange(plan[0].start, plan.at(-1).end);
  byId('summary-budget-label').textContent = selected ? `第 ${selected.number} 個月每人估算` : '全年每人估算';
  byId('summary-budget').textContent = range(summaryEstimate);
  byId('summary-target').textContent = money(settings.target);
  byId('itinerary-heading').textContent = selected ? `第 ${selected.number} 個月行程` : '12 個月的路線';
  byId('itinerary-intro').hidden = Boolean(selected);
  byId('map-scope').textContent = selected ? `第 ${selected.number} 個月 · ${selected.region}` : '全年路線';
  itinerary.innerHTML = selected ? renderMonth(selected) : renderOverview(plan);
  renderBudget(selected, summaryEstimate);
}

function selectMonth(number) {
  currentMonth = number;
  chooseMonth.value = number || 'all';
  renderPlan();
  renderMapSelection();
  byId('selection-status').textContent = number ? `已顯示第 ${number} 個月的路線、行程與預算` : `已顯示全程 ${totalDays} 天的行程與預算`;
}

chooseMonth.addEventListener('change', () => selectMonth(Number(chooseMonth.value) || 0));
itinerary.addEventListener('click', event => {
  const button = event.target.closest('button[data-month]');
  if (!button) return;
  selectMonth(Number(button.dataset.month));
  byId('month-detail-heading').focus();
});
settingsForm.addEventListener('submit', event => {
  event.preventDefault();
  const target = budgetField.valueAsNumber;
  if (!isStartDate(startField.value) || !validBudget(target)) {
    settingsStatus.textContent = '請輸入有效的出發日期與目標預算。';
    return;
  }
  settings.start = startField.value;
  settings.target = target;
  settingsStatus.textContent = saveSettings() ? '已套用並儲存設定。' : '已套用設定，瀏覽器無法在重新整理後保留。';
  renderPlan();
});
byId('checklist-items').addEventListener('change', event => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  settings.completed = [...byId('checklist-items').querySelectorAll(':checked')].map(input => input.value);
  if (!saveSettings()) settingsStatus.textContent = '瀏覽器無法儲存進度。';
  renderChecklistCount();
});

const pointsFor = month => month.cities.map(([, , lat, lon]) => [lat, lon]);
const worldBounds = [[-56, -178], [64, 178]];
const overviewPoints = [taipei, ...months.flatMap(pointsFor), taipei];

async function initMap() {
  const fallback = byId('map-fallback');
  const mapElement = byId('route-map');
  let map;
  try {
    const L = window.L;
    if (!L) throw new Error('Map library unavailable');
    const response = await fetch(new URL('./world-land.json', import.meta.url));
    if (!response.ok) throw new Error('Basemap unavailable');
    const land = await response.json();
    mapElement.hidden = false;
    map = L.map(mapElement, { scrollWheelZoom: false, minZoom: -1, maxZoom: 9, zoomSnap: 0.25, preferCanvas: true, attributionControl: false, zoomControl: false });
    L.control.zoom({ zoomInTitle: '放大地圖', zoomOutTitle: '縮小地圖' }).addTo(map);
    map.fitBounds(worldBounds, { animate: false, padding: [8, 16] });
    L.geoJSON(land, { interactive: false, style: { color: '#66827a', weight: 0.65, fillColor: '#537368', fillOpacity: 1 } }).addTo(map);
    L.polyline(routeSegments(overviewPoints), { interactive: false, color: '#ecc985', weight: 1.7, opacity: 0.65, dashArray: '5 5' }).addTo(map);
    const highlight = L.polyline([], { interactive: false, color: '#ffe0a0', weight: 3.3 }).addTo(map);
    const markerIcon = (label, className) => L.divIcon({ className, html: label, iconSize: [23, 23], iconAnchor: [11, 11] });
    L.marker(taipei, { icon: markerIcon('✦', 'route-marker home'), title: '台北 · 出發與返回', keyboard: false, interactive: false }).addTo(map);

    const markers = months.map(month => {
      const [city, , lat, lon] = month.cities[month.anchor];
      const description = `第 ${month.number} 個月 · ${city}`;
      const marker = L.marker([lat, lon], { icon: markerIcon(month.number, 'route-marker'), title: description, autoPanOnFocus: false }).addTo(map);
      marker.on('click', () => selectMonth(month.number));
      const element = marker.getElement();
      element.setAttribute('role', 'button');
      element.setAttribute('aria-label', description);
      element.addEventListener('keydown', event => {
        if (event.key !== ' ') return;
        event.preventDefault();
        selectMonth(month.number);
      });
      return { number: month.number, marker, element };
    });

    renderMapSelection = () => {
      const month = months[currentMonth - 1];
      const points = month ? pointsFor(month) : [];
      if (currentMonth === 1) points.unshift(taipei);
      if (currentMonth === months.length) points.push(taipei);
      highlight.setLatLngs(month ? routeSegments(points) : []);
      markers.forEach(({ number, marker, element }) => {
        const active = number === currentMonth;
        element.classList.toggle('active', active);
        element.setAttribute('aria-pressed', String(active));
        marker.setZIndexOffset(active ? 1000 : 0);
      });
      const bounds = month ? L.latLngBounds(points) : worldBounds;
      map.fitBounds(bounds, { animate: false, padding: month ? [28, 28] : [8, 16], maxZoom: 5 });
    };

    renderMapSelection();
    map.on('resize', renderMapSelection);
    fallback.hidden = true;
  } catch {
    map?.remove();
    renderMapSelection = () => {};
    mapElement.hidden = true;
    fallback.textContent = '地圖目前無法顯示。請使用月份選單查看城市停留、跨城交通與預算。';
  }
}

renderChecklistCount();
renderPlan();
initMap();
