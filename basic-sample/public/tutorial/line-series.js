const data = [
    {
        name: '서울특별시',
        value: [10103, 10022, 9930, 9857, 9766, 9729, 9668, 9509, 9428, 9386],
        coord: [127.1877, 37.67],
    },
    {
        name: '세종특별자치시',
        value: [156, 210, 243, 280, 314, 341, 356, 371, 383, 387],
        coord: [127.33, 36.65],
    },
    {
        name: '제주특별자치도',
        value: [607, 624, 641, 657, 667, 671, 675, 676, 678, 675],
        coord: [126.55186, 33.67692],
    },
    {
        name: '경기도',
        value: [
            12358, 12522, 12716, 12873, 13077, 13240, 13427, 13565, 13589,
            13631,
        ],
        coord: [126.9877, 37.1],
    },
    {
        name: '부산광역시',
        value: [3519, 3513, 3498, 3470, 3441, 3414, 3392, 3350, 3317, 3293],
        coord: [129.4085, 35],
    },
    {
        name: '대구광역시',
        value: [2493, 2487, 2484, 2475, 2462, 2438, 2418, 2385, 2363, 2375],
        coord: [128.61432, 36],
    },
    {
        name: '인천광역시',
        value: [2903, 2925, 2943, 2948, 2955, 2957, 2943, 2948, 2967, 2997],
        coord: [125.92073, 37.57],
    },
    {
        name: '광주광역시',
        value: [1476, 1472, 1469, 1463, 1459, 1456, 1450, 1441, 1431, 1419],
        coord: [127.3567, 35.1],
    },
    {
        name: '대전광역시',
        value: [1532, 1518, 1514, 1502, 1490, 1475, 1464, 1452, 1446, 1442],
        coord: [127.33, 36.2],
    },
    {
        name: '울산광역시',
        value: [1166, 1173, 1172, 1165, 1156, 1148, 1136, 1121, 1110, 1104],
        coord: [129.4085, 35.55727],
    },
    {
        name: '강원특별자치도',
        value: [1544, 1549, 1550, 1550, 1543, 1542, 1543, 1538, 1536, 1528],
        coord: [128.54, 37.77],
    },
    {
        name: '충청북도',
        value: [1579, 1583, 1591, 1594, 1599, 1600, 1601, 1597, 1595, 1593],
        coord: [128.16, 37.0],
    },
    {
        name: '충청남도',
        value: [2062, 2077, 2096, 2116, 2126, 2124, 2121, 2119, 2123, 2130],
        coord: [126.2, 36.55],
    },
    {
        name: '전북특별자치도',
        value: [1872, 1869, 1864, 1854, 1837, 1819, 1804, 1786, 1769, 1755],
        coord: [127.33, 35.67053],
    },
    {
        name: '전라남도',
        value: [1906, 1908, 1903, 1896, 1883, 1869, 1852, 1832, 1817, 1804],
        coord: [127.3567, 34.6],
    },
    {
        name: '경상북도',
        value: [2701, 2702, 2700, 2691, 2677, 2666, 2639, 2626, 2600, 2554],
        coord: [128.61432, 36.5],
    },
    {
        name: '경상남도',
        value: [3350, 3364, 3373, 3380, 3374, 3363, 3340, 3314, 3280, 3251],
        coord: [128.36, 35.31],
    },
].map((r) => {
    // 증감율
    return {
        ...r,
        value: r.value
            .slice(1)
            .map((b, i) => ((b - r.value[i]) / r.value[i]) * 100),
    };
});

const config = {
    title: false,
    map: [
        {
            name: 'sido',
            url: '../map/wooritech/v1/maps/geojson/kr-sido-low.geo.json',
            exclude: '37',
            padding: '0.8 0 0 0',
            showDummies: true
        },
    ],

    body: {
        projection: 'mercator',
    },
    legend: false,
    annotations: [
        {
            front: true,
            type: 'shape',
            shape: 'rectangle',
            offsetX: 20,
            offsetY: 20,
            width: 10,
            height: 28,
            style: {
                fill: '#7B84BD',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '대한민국 시도별 인구 증감율 추이(2014-2023)',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    series: [
        {
            mapKeys: ['name', 'id'],
            nullStyle: {
                fill: '#E0EBF9',
                stroke: '#fff'
            },
        },
        {
            name: '전국',
            type: 'line',
            curved: true,
            area: true,
            area: {
                visible: true,
                style: { fillOpacity: 0.5 },
              },
              baseLine: {
                style: {
                    stroke: 'none',
                 },
              },
            color: '#7B84BD',
            // tooltipText: '${name}',
            pointLabel: true,
            height: 30,
            data: data.filter((d) => d.name != '세종특별자치시'),
            tooltipCallback: ({ name, source: { value } }) => {
                return (
                    name +
                    '<br>' +
                    value
                        .map((v, i) => `${2015 + i}: ${v.toFixed(2)}%`)
                        .join('<br>')
                );
            }
        },
        {
            name: '세종특별자치시',
            type: 'line',
            curved: true,
            area: {
                visible: true,
                style: { fillOpacity: 0.6 },
              },
            color: '#F5A4AB',
            baseLine: {
                style: { stroke: 'none' },
            },
            pointLabel: true,
            height: 30,
            data: data.filter((d) => d.name == '세종특별자치시'),
            tooltipCallback: ({ name, source: { value } }) => {
                return (
                    name +
                    '<br>' +
                    value
                        .map((v, i) => `${2015 + i}: ${v.toFixed(2)}%`)
                        .join('<br>')
                );
            }
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
