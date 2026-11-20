export const taipei = [25.033, 121.565];
export const defaultBudget = 1500000;
export const categories = ['交通', '住宿', '餐飲', '景點', '保險', '備用金'];
export const checklist = [
  ['passport', '確認護照效期與各站入境規定'],
  ['flights', '安排跨洲航段、轉機與第一站住宿'],
  ['insurance', '確認旅遊保險的旅程長度及保障範圍'],
  ['health', '備妥常用藥，查詢旅遊健康與疫苗資訊'],
  ['money', '準備備用付款方式及緊急預算'],
  ['copies', '備份護照、保單與緊急聯絡資訊']
];

// 每站依旅行順序排列。交通、住宿、餐飲及景點為每人新台幣的規劃估算。
const route = [
  {
    region: '東南亞', heading: '從泰國走到越南', countries: '泰國、越南',
    cities: [['曼谷', 8, 13.756, 100.502], ['清邁', 7, 18.788, 98.985], ['河內', 8, 21.028, 105.834], ['峴港', 5, 16.054, 108.202]],
    buffer: 3, anchor: 2,
    experiences: ['在曼谷搭船逛昭披耶河兩岸', '安排清邁古城與河內老城散步', '從峴港前往會安老城'],
    transit: '台灣飛曼谷。曼谷至清邁可搭夜車，赴河內視航班安排轉機，河內至峴港可搭火車或飛機。',
    budget: [23000, 21000, 13000, 7000],
    official: [['泰國電子簽證', 'https://www.thaievisa.go.th/'], ['越南移民局電子簽證', 'https://evisa.gov.vn/']]
  },
  {
    region: '東南亞', heading: '沿著馬來半島往南', countries: '馬來西亞、新加坡',
    cities: [['檳城', 8, 5.414, 100.329], ['吉隆坡', 8, 3.139, 101.687], ['馬六甲', 4, 2.189, 102.25], ['新加坡', 6, 1.352, 103.82]],
    buffer: 2, anchor: 3,
    experiences: ['在喬治市逛老街與小販中心', '步行探索馬六甲河岸', '逛新加坡濱海灣花園與熟食中心'],
    transit: '從峴港飛檳城，依航班安排轉機。馬來半島內以火車或長途巴士移動，留時間辦理新馬陸路通關。',
    budget: [19000, 28000, 15000, 8000],
    official: [['馬來西亞移民局', 'https://www.imi.gov.my/'], ['新加坡移民與關卡局', 'https://www.ica.gov.sg/']]
  },
  {
    region: '東北亞', heading: '日本街區與首爾巷弄', countries: '日本、韓國',
    cities: [['東京', 8, 35.676, 139.65], ['京都', 7, 35.012, 135.768], ['大阪', 5, 34.694, 135.502], ['首爾', 8, 37.566, 126.978]],
    buffer: 3, anchor: 0,
    experiences: ['用東京地鐵串起幾個想逛的街區', '在京都走東山與鴨川', '到首爾逛宮殿、傳統市場與漢江'],
    transit: '從新加坡飛東京，搭新幹線前往京都、區間列車往大阪，再從關西機場飛首爾。',
    budget: [27500, 37000, 20000, 8000],
    official: [['日本外務省', 'https://www.mofa.go.jp/'], ['韓國簽證入口', 'https://www.visa.go.kr/']]
  },
  {
    region: '歐亞交界', heading: '從伊斯坦堡到愛琴海', countries: '土耳其、希臘',
    cities: [['伊斯坦堡', 8, 41.008, 28.978], ['格雷梅', 6, 38.644, 34.829], ['雅典', 7, 37.984, 23.728], ['塞薩洛尼基', 5, 40.64, 22.944]],
    buffer: 4, anchor: 0,
    experiences: ['搭船看博斯普魯斯海峽兩岸', '在卡帕多奇亞走訪岩窟地景', '留半天給雅典衛城及周邊博物館'],
    transit: '首爾飛伊斯坦堡。從伊斯坦堡轉巴士或國內線前往卡帕多奇亞，回伊斯坦堡轉飛雅典，再搭火車或巴士北上。',
    budget: [39000, 30000, 16000, 11000],
    official: [['土耳其電子簽證', 'https://www.evisa.gov.tr/'], ['歐盟旅遊入境資訊', 'https://travel-europe.europa.eu/']]
  },
  {
    region: '南歐', heading: '從羅馬到伊比利半島', countries: '義大利、西班牙',
    cities: [['羅馬', 8, 41.903, 12.496], ['佛羅倫斯', 6, 43.769, 11.256], ['巴塞隆納', 8, 41.387, 2.169], ['馬德里', 6, 40.417, -3.704]],
    buffer: 3, anchor: 2,
    experiences: ['步行串起羅馬古城的廣場與遺址', '在佛羅倫斯挑一間美術館慢看', '把巴塞隆納建築與馬德里市場排在不同天'],
    transit: '從塞薩洛尼基飛羅馬，依航班安排轉機。義大利境內搭火車，赴巴塞隆納可視交通選擇佛羅倫斯或附近機場，再搭西班牙高鐵。',
    budget: [29000, 44000, 23000, 12500],
    official: [['歐盟旅遊入境資訊', 'https://travel-europe.europa.eu/']]
  },
  {
    region: '西歐', heading: '從塞納河到蘇格蘭', countries: '法國、英國',
    cities: [['巴黎', 9, 48.857, 2.352], ['里昂', 5, 45.764, 4.836], ['倫敦', 8, 51.507, -0.128], ['愛丁堡', 5, 55.953, -3.188]],
    buffer: 3, anchor: 3,
    experiences: ['留一天用步行與地鐵探索巴黎', '在里昂安排市集與老城散步', '在倫敦逛博物館，前往愛丁堡老城'],
    transit: '從馬德里飛巴黎，搭法國高鐵往返里昂。回巴黎轉歐洲之星前往倫敦，再搭英國城際鐵路北上。',
    budget: [31000, 54000, 24000, 13500],
    official: [['歐盟旅遊入境資訊', 'https://travel-europe.europa.eu/'], ['英國政府簽證與入境查詢', 'https://www.gov.uk/check-uk-visa']]
  },
  {
    region: '北美東岸', heading: '穿越大西洋與五大湖', countries: '美國、加拿大',
    cities: [['紐約', 9, 40.713, -74.006], ['波士頓', 5, 42.36, -71.059], ['蒙特婁', 8, 45.502, -73.567], ['多倫多', 6, 43.653, -79.383]],
    buffer: 3, anchor: 0,
    experiences: ['安排紐約公園、渡輪與美術館', '沿波士頓自由之路步行', '逛蒙特婁老城與多倫多湖濱'],
    transit: '從愛丁堡經樞紐轉機飛紐約。搭東北走廊列車往波士頓，之後可搭巴士跨境赴蒙特婁，再搭加拿大城際鐵路。',
    budget: [42500, 57000, 25500, 11000],
    official: [['美國國務院旅遊簽證資訊', 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit.html'], ['加拿大政府訪客入境資訊', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html']]
  },
  {
    region: '北美西岸', heading: '從太平洋西北走到加州', countries: '加拿大、美國',
    cities: [['溫哥華', 8, 49.283, -123.121], ['西雅圖', 6, 47.606, -122.332], ['舊金山', 9, 37.775, -122.419], ['蒙特雷', 5, 36.6, -121.895]],
    buffer: 3, anchor: 2,
    experiences: ['走溫哥華海堤與市區公園', '從西雅圖派克市場走到海濱', '安排舊金山街區與蒙特雷海岸'],
    transit: '多倫多飛溫哥華，搭巴士或火車跨境往西雅圖。前往舊金山灣區可搭飛機或長程列車，加州段接巴士或租車。',
    budget: [42000, 55500, 24000, 10500],
    official: [['加拿大政府訪客入境資訊', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html'], ['美國國務院旅遊簽證資訊', 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit.html']]
  },
  {
    region: '中美洲', heading: '墨西哥市集與瓜地馬拉高地', countries: '墨西哥、瓜地馬拉',
    cities: [['墨西哥城', 9, 19.433, -99.133], ['瓦哈卡', 7, 17.073, -96.726], ['安地瓜', 8, 14.558, -90.729], ['阿蒂特蘭湖', 3, 14.69, -91.156]],
    buffer: 3, anchor: 0,
    experiences: ['在墨西哥城留一整天給人類學博物館', '安排瓦哈卡市場與傳統工藝', '從安地瓜前往阿蒂特蘭湖畔村落'],
    transit: '從蒙特雷回灣區機場飛墨西哥城，搭巴士往瓦哈卡。赴瓜地馬拉可經墨西哥城轉機，再接接駁車到安地瓜和湖區。',
    budget: [30000, 23500, 16500, 8500],
    official: [['墨西哥外交部', 'https://www.gob.mx/sre'], ['瓜地馬拉移民局', 'https://igm.gob.gt/']]
  },
  {
    region: '南美洲', heading: '從秘魯海岸走進安地斯', countries: '秘魯',
    cities: [['利馬', 8, -12.046, -77.043], ['阿雷基帕', 6, -16.409, -71.537], ['庫斯科', 10, -13.532, -71.967], ['奧揚泰坦博', 4, -13.258, -72.264]],
    buffer: 3, anchor: 2,
    experiences: ['在利馬逛海岸與城市街區', '循序到阿雷基帕與庫斯科適應海拔', '視官方票券安排聖谷與馬丘比丘'],
    transit: '從湖區回瓜地馬拉市搭機赴利馬，依航班選擇轉機。秘魯境內以航班與日間巴士銜接，預留高地適應及景點交通時間。',
    budget: [33000, 22000, 14500, 13500],
    official: [['秘魯國家移民局', 'https://www.gob.pe/migraciones'], ['秘魯文化部景點售票入口', 'https://tuboleto.cultura.pe/']]
  },
  {
    region: '南美洲', heading: '智利海港與巴塔哥尼亞', countries: '智利、阿根廷',
    cities: [['聖地牙哥', 6, -33.449, -70.669], ['瓦爾帕萊索', 4, -33.048, -71.612], ['布宜諾斯艾利斯', 7, -34.604, -58.382], ['埃爾卡拉法特', 6, -50.338, -72.264], ['聖地牙哥轉機', 3, -33.449, -70.669]],
    buffer: 4, anchor: 3,
    experiences: ['在瓦爾帕萊索沿山丘步行', '逛布宜諾斯艾利斯街區與藝文空間', '在埃爾卡拉法特安排冰川日遊及天候備用日'],
    transit: '從聖谷經庫斯科與利馬飛聖地牙哥，搭巴士往返海港。進出巴塔哥尼亞以航班為主，依實際航班經布宜諾斯艾利斯回智利。',
    budget: [43500, 32000, 17500, 14500],
    official: [['智利國家移民署', 'https://serviciomigraciones.cl/'], ['阿根廷移民局', 'https://www.argentina.gob.ar/migraciones']]
  },
  {
    region: '大洋洲', heading: '跨越太平洋，回到台灣', countries: '紐西蘭、澳洲',
    cities: [['奧克蘭', 8, -36.851, 174.764], ['羅托魯瓦', 5, -38.137, 176.25], ['雪梨', 8, -33.868, 151.209], ['墨爾本', 5, -37.814, 144.963]],
    buffer: 5, anchor: 0,
    experiences: ['在奧克蘭走港灣，前往羅托魯瓦看地熱地景', '從雪梨市區搭渡輪看港口', '在墨爾本排一日近郊行程，再飛回台灣'],
    transit: '從聖地牙哥飛奧克蘭，留意跨日界線後的抵達日期。紐西蘭段搭巴士，回奧克蘭飛雪梨，再銜接墨爾本及返台航班。',
    budget: [60000, 50500, 24000, 11000],
    official: [['紐西蘭移民局', 'https://www.immigration.govt.nz/'], ['澳洲內政部移民與簽證資訊', 'https://immi.homeaffairs.gov.au/']]
  }
];

export const months = route.map((month, index) => {
  const insurance = 3000;
  const reserve = Math.round((month.budget.reduce((sum, value) => sum + value, 0) + insurance) / 10);
  return {
    ...month,
    number: index + 1,
    days: month.cities.reduce((sum, city) => sum + city[1], month.buffer),
    budget: [...month.budget, insurance, reserve]
  };
});

export const totalDays = months.reduce((sum, month) => sum + month.days, 0);

export function isStartDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  if (value < '2000-01-01' || value > '2099-12-31') return false;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function schedule(start) {
  const dateAt = offset => {
    const date = new Date(start + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + offset);
    return date.toISOString().slice(0, 10);
  };
  let offset = 0;
  return months.map(month => {
    const first = offset;
    offset += month.days;
    return { ...month, start: dateAt(first), end: dateAt(offset - 1) };
  });
}

export function estimate(selection) {
  const amounts = categories.map((_, index) => selection.reduce((sum, month) => sum + month.budget[index], 0));
  const total = amounts.reduce((sum, value) => sum + value, 0);
  return { amounts, total, low: Math.round(total * 0.8), high: Math.round(total * 1.2) };
}

export function routeSegments(points) {
  const segments = [[points[0]]];
  for (let index = 1; index < points.length; index++) {
    const previous = points[index - 1];
    const current = points[index];
    const difference = current[1] - previous[1];
    const segment = segments.at(-1);
    if (Math.abs(difference) <= 180) {
      segment.push(current);
      continue;
    }
    const edge = difference > 0 ? -180 : 180;
    const nextLongitude = current[1] + 2 * edge;
    const seamLatitude = previous[0] + (current[0] - previous[0]) * (edge - previous[1]) / (nextLongitude - previous[1]);
    segment.push([seamLatitude, edge]);
    segments.push([[seamLatitude, -edge], current]);
  }
  return segments;
}
