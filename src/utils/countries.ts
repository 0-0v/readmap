export interface Country {
  nameKo: string
  code: string       // ISO alpha-3
  numeric: string    // ISO numeric (geo.id from world-atlas)
  coordinates: [number, number]
}

export const COUNTRIES: Country[] = [
  { nameKo: '한국', code: 'KOR', numeric: '410', coordinates: [127.7669, 35.9078] },
  { nameKo: '미국', code: 'USA', numeric: '840', coordinates: [-95.7129, 37.0902] },
  { nameKo: '영국', code: 'GBR', numeric: '826', coordinates: [-3.436, 55.3781] },
  { nameKo: '프랑스', code: 'FRA', numeric: '250', coordinates: [2.2137, 46.2276] },
  { nameKo: '독일', code: 'DEU', numeric: '276', coordinates: [10.4515, 51.1657] },
  { nameKo: '일본', code: 'JPN', numeric: '392', coordinates: [138.2529, 36.2048] },
  { nameKo: '중국', code: 'CHN', numeric: '156', coordinates: [104.1954, 35.8617] },
  { nameKo: '이탈리아', code: 'ITA', numeric: '380', coordinates: [12.5674, 41.8719] },
  { nameKo: '스페인', code: 'ESP', numeric: '724', coordinates: [-3.7492, 40.4637] },
  { nameKo: '러시아', code: 'RUS', numeric: '643', coordinates: [105.3188, 61.524] },
  { nameKo: '캐나다', code: 'CAN', numeric: '124', coordinates: [-96.8165, 56.1304] },
  { nameKo: '호주', code: 'AUS', numeric: '36', coordinates: [133.7751, -25.2744] },
  { nameKo: '브라질', code: 'BRA', numeric: '76', coordinates: [-51.9253, -14.235] },
  { nameKo: '멕시코', code: 'MEX', numeric: '484', coordinates: [-102.5528, 23.6345] },
  { nameKo: '인도', code: 'IND', numeric: '356', coordinates: [78.9629, 20.5937] },
  { nameKo: '아르헨티나', code: 'ARG', numeric: '32', coordinates: [-63.6167, -38.4161] },
  { nameKo: '콜롬비아', code: 'COL', numeric: '170', coordinates: [-74.2973, 4.5709] },
  { nameKo: '칠레', code: 'CHL', numeric: '152', coordinates: [-71.543, -35.6751] },
  { nameKo: '노르웨이', code: 'NOR', numeric: '578', coordinates: [8.4689, 60.472] },
  { nameKo: '스웨덴', code: 'SWE', numeric: '752', coordinates: [18.6435, 60.1282] },
  { nameKo: '덴마크', code: 'DNK', numeric: '208', coordinates: [9.5018, 56.2639] },
  { nameKo: '핀란드', code: 'FIN', numeric: '246', coordinates: [25.7482, 61.9241] },
  { nameKo: '네덜란드', code: 'NLD', numeric: '528', coordinates: [5.2913, 52.1326] },
  { nameKo: '벨기에', code: 'BEL', numeric: '56', coordinates: [4.4699, 50.5039] },
  { nameKo: '스위스', code: 'CHE', numeric: '756', coordinates: [8.2275, 46.8182] },
  { nameKo: '오스트리아', code: 'AUT', numeric: '40', coordinates: [14.5501, 47.5162] },
  { nameKo: '폴란드', code: 'POL', numeric: '616', coordinates: [19.1451, 51.9194] },
  { nameKo: '체코', code: 'CZE', numeric: '203', coordinates: [15.473, 49.8175] },
  { nameKo: '헝가리', code: 'HUN', numeric: '348', coordinates: [19.5033, 47.1625] },
  { nameKo: '그리스', code: 'GRC', numeric: '300', coordinates: [21.8243, 39.0742] },
  { nameKo: '포르투갈', code: 'PRT', numeric: '620', coordinates: [-8.2245, 39.3999] },
  { nameKo: '아일랜드', code: 'IRL', numeric: '372', coordinates: [-8.2439, 53.4129] },
  { nameKo: '터키', code: 'TUR', numeric: '792', coordinates: [35.2433, 38.9637] },
  { nameKo: '이란', code: 'IRN', numeric: '364', coordinates: [53.688, 32.4279] },
  { nameKo: '이스라엘', code: 'ISR', numeric: '376', coordinates: [34.8516, 31.0461] },
  { nameKo: '이집트', code: 'EGY', numeric: '818', coordinates: [30.8025, 26.8206] },
  { nameKo: '남아프리카', code: 'ZAF', numeric: '710', coordinates: [25.09, -28.9341] },
  { nameKo: '나이지리아', code: 'NGA', numeric: '566', coordinates: [8.6753, 9.082] },
  { nameKo: '케냐', code: 'KEN', numeric: '404', coordinates: [37.9062, -0.0236] },
  { nameKo: '에티오피아', code: 'ETH', numeric: '231', coordinates: [40.4897, 9.145] },
  { nameKo: '모로코', code: 'MAR', numeric: '504', coordinates: [-7.0926, 31.7917] },
  { nameKo: '파키스탄', code: 'PAK', numeric: '586', coordinates: [69.3451, 30.3753] },
  { nameKo: '인도네시아', code: 'IDN', numeric: '360', coordinates: [113.9213, -0.7893] },
  { nameKo: '베트남', code: 'VNM', numeric: '704', coordinates: [108.2772, 14.0583] },
  { nameKo: '태국', code: 'THA', numeric: '764', coordinates: [100.9925, 15.87] },
  { nameKo: '말레이시아', code: 'MYS', numeric: '458', coordinates: [109.6976, 4.2105] },
  { nameKo: '필리핀', code: 'PHL', numeric: '608', coordinates: [121.774, 12.8797] },
  { nameKo: '싱가포르', code: 'SGP', numeric: '702', coordinates: [103.8198, 1.3521] },
  { nameKo: '뉴질랜드', code: 'NZL', numeric: '554', coordinates: [174.886, -40.9006] },
  { nameKo: '페루', code: 'PER', numeric: '604', coordinates: [-75.0152, -9.19] },
  { nameKo: '우크라이나', code: 'UKR', numeric: '804', coordinates: [31.1656, 48.3794] },
  { nameKo: '루마니아', code: 'ROU', numeric: '642', coordinates: [24.9668, 45.9432] },
  { nameKo: '쿠바', code: 'CUB', numeric: '192', coordinates: [-77.7812, 21.5218] },
  { nameKo: '알제리', code: 'DZA', numeric: '12', coordinates: [1.6596, 28.0339] },
]

// alpha-3 → 좌표
export const countryCoordinatesMap = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c.coordinates])
) as Record<string, [number, number]>

// ISO 숫자코드 → alpha-3 (WorldMap의 geo.id 매칭용)
export const numericToAlpha3 = Object.fromEntries(
  COUNTRIES.map((c) => [c.numeric, c.code])
) as Record<string, string>

export const findCountry = (nameKo: string) =>
  COUNTRIES.find((c) => c.nameKo === nameKo)
