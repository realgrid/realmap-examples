const REGIONS = [
    { id: 'capital',     name: '수도권', lon: 127.05, lat: 37.55, prev: 25.6, value: 28.4 },
    { id: 'gangwon',     name: '강원권', lon: 128.30, lat: 37.80, prev: 2.4,  value: 3.1 },
    { id: 'chungcheong', name: '충청권', lon: 126.95, lat: 36.40, prev: 8.1,  value: 10.8 },
    { id: 'honam',       name: '호남권', lon: 126.95, lat: 35.30, prev: 6.3,  value: 8.6 },
    { id: 'daegyeong',   name: '대경권', lon: 128.70, lat: 36.35, prev: 5.9,  value: 7.4 },
    { id: 'dongnam',     name: '동남권', lon: 128.85, lat: 35.25, prev: 10.2, value: 12.9 },
    { id: 'jeju',        name: '제주권', lon: 126.55, lat: 33.38, prev: 4.4,  value: 5.6 }
];

const TOTAL_PREV = REGIONS.reduce(function (sum, r) { return sum + r.prev; }, 0);
const TOTAL = REGIONS.reduce(function (sum, r) { return sum + r.value; }, 0);
const GROWTH = ((TOTAL / TOTAL_PREV - 1) * 100).toFixed(1);

const config = {
    title: false,
    credits: false,
    general: { theme: 'dark' },
    map: [{
        url: '../maps/geojson/kr-sido-low.geo.json',
        padding: '0.17 0.04 0.2 0.04'
    }],
    body: {
        projection: 'mercator',
        style: { fill: 'none' }
    },
    colorScale: {
        location: 'body',
        solidFill: true,
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        offsetX: -12,
        offsetY: -6,
        barWidth: 10,
        barLength: 300,
        marker: { visible: false },
        tick: { maxVisible: false },
        steps: [
            { to: 5, color: '#2f5fd0', label: '5 미만' },
            { from: 5, to: 10, color: '#4b8df8', label: '5~10' },
            { from: 10, to: 20, color: '#38bdf8', label: '10~20' },
            { from: 20, color: '#a5f3fc', label: '20 이상' }
        ]
    },
    annotations: [
        {
            front: true,
            type: 'shape',
            shape: 'rectangle',
            offsetX: 20,
            offsetY: 20,
            width: 6,
            height: 62,
            style: { fill: '#38bdf8' }
        },
        {
            front: true,
            type: 'text',
            text: '권역별 전기차 보급 현황',
            offsetX: 38,
            offsetY: 18,
            height: 28,
            style: { fontSize: '15pt', fontWeight: 700, fill: '#f1f5ff' }
        },
        {
            front: true,
            type: 'text',
            text: '2024년 등록 대수(만 대) · 예시 데이터',
            offsetX: 38,
            offsetY: 44,
            height: 20,
            style: { fontSize: '10pt', fontWeight: 400, fill: '#93a4c8' }
        },
        {
            front: true,
            type: 'text',
            text: '전국 ' + TOTAL.toFixed(1) + '만 대 · 전년 대비 +' + GROWTH + '%',
            offsetX: 38,
            offsetY: 66,
            height: 20,
            style: { fontSize: '10pt', fontWeight: 700, fill: '#7dd3fc' }
        }
    ],
    series: [
        {
            useMapData: true,
            legend: false,
            tooltipText: false,
            style: { fill: '#1a2745', stroke: '#36497a', strokeWidth: 0.7 }
        },
        {
            type: 'bubble',
            colorScale: 0,
            sizeMode: 'area',
            minSize: '11%',
            maxSize: '19%',
            style: { fillOpacity: 0.96, stroke: '#e6f0ff', strokeWidth: 1.2 },
            tooltipText: '<b>${name}</b><br>2024년 등록 <b>${value}</b>만 대',
            pointLabel: {
                visible: true,
                effect: 'none',
                autoContrast: true,
                style: { fontSize: '0.16em', fontWeight: 600 },
                textCallback: function (point) {
                    if (point.labelIndex === 1) {
                        return '+' + point.source.rate.toFixed(1) + '%';
                    }
                    return point.name + '<br><t style="font-weight:700">' + point.value.toFixed(1) + '만</t>';
                }
            },
            subLabel: {
                visible: true,
                position: 'top',
                offset: 3,
                effect: 'none',
                autoContrast: false,
                style: { fontSize: '0.1em', fontWeight: 600, fill: '#a9bce3' }
            },
            data: REGIONS.map(function (r) {
                return {
                    id: r.id, name: r.name, lon: r.lon, lat: r.lat, value: r.value,
                    rate: Math.round((r.value / r.prev - 1) * 1000) / 10
                };
            })
        }
    ]
};

const tool = {
    width: 850,
    height: 750,
    options: {
        css: '#realmap { background: radial-gradient(900px 640px at 28% 14%, #16264a 0%, #0b1226 62%, #070c1a 100%); border-radius: 10px; overflow: hidden; } ' +
            '#realmap .rm-control { background-color: transparent; } ' +
            '#realmap g.rm-series.rm-bubble-series path.rm-point { filter: drop-shadow(0 0 9px rgba(56, 189, 248, 0.38)); }'
    },
    actions: [
        {
            type: 'select',
            label: '라벨 글자 크기',
            value: 'em',
            data: ['em', 'px'],
            labels: ['버블 지름의 비율 (em)', '고정 크기 (px)'],
            action: ({ value }) => {
                const sizes = value === 'em' ? ['0.16em', '0.1em'] : ['13px', '10px'];

                mapChart.seriesByType('bubble').updateOptions({
                    pointLabel: { style: { fontSize: sizes[0] } },
                    subLabel: { style: { fontSize: sizes[1] } }
                });
            }
        },
        {
            type: 'select',
            label: '차트 크기',
            value: '850',
            data: ['850', '650', '500'],
            labels: ['기본 (850 x 750)', '좁게 (650 x 750)', '아주 좁게 (500 x 750)'],
            action: ({ value }) => {
                document.getElementById('realmap').style.width = value + 'px';
            }
        }
    ]
};

let mapChart;

async function init() {
    const style = document.createElement('style');

    style.textContent = tool.options.css;
    document.head.appendChild(style);
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
