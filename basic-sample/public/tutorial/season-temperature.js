const config = {
    title: {
        text: '계절별 평균기온',
        align: 'left',
        style: {
            fontSize: '15pt',
            fontWeight: 700,
        },
    },
    subtitle: {
        visible: true,
        text: '7개 도시 · 단위 ℃ · 예시 데이터',
        position: 'bottom',
        align: 'left',
        style: {
            fontSize: '10pt',
            fontWeight: 400,
        },
    },
    credits: false,
    general: {
        locale: 'ko',
    },
    legend: {
        visible: true,
        location: 'body',
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
    },
    map: [
        {
            url: '../maps/geojson/kr-sido-low.geo.json',
            padding: '0.05 0 0.05 0',
        },
    ],
    body: {
        projection: 'mercator',
    },
    series: [
        {
            legend: false,
            tooltipText: false,
            nullStyle: {
                fill: '#1b2638',
                stroke: '#33435c',
                strokeWidth: 0.8,
            },
        },
        {
            type: 'bar',
            width: 96,
            height: 96,
            barWidth: 0.86,
            tooltipText: false,
            categories: [
                { name: '봄', color: '#f9a8d4' },
                { name: '여름', color: '#fb923c' },
                { name: '가을', color: '#b45309' },
                { name: '겨울', color: '#60a5fa' },
            ],
            legendByCategory: true,
            style: {
                fillOpacity: 1,
                stroke: '#0f172a',
                strokeWidth: 1,
            },
            baseLine: {
                style: {
                    stroke: '#94a3b8',
                    strokeWidth: 1,
                },
            },
            callout: {
                visible: true,
                usePointColor: false,
                style: {
                    stroke: '#64748b',
                },
            },
            data: [
                { id: 'seoul', name: '서울', lon: 126.978, lat: 37.566, value: [12.2, 25.1, 14.6, -0.8] },
                { id: 'gangneung', name: '강릉', lon: 128.9, lat: 37.75, value: [11.0, 23.2, 13.9, 1.9] },
                { id: 'daejeon', name: '대전', lon: 127.385, lat: 36.35, value: [13.0, 25.0, 15.0, 1.1] },
                { id: 'gwangju', name: '광주', lon: 126.85, lat: 35.16, value: [14.0, 25.5, 16.3, 3.3] },
                { id: 'daegu', name: '대구', lon: 128.6, lat: 35.87, value: [14.0, 25.6, 16.1, 2.6] },
                { id: 'busan', name: '부산', lon: 129.075, lat: 35.18, value: [14.3, 24.8, 17.2, 5.0], offset: [[0.75, -0.55]] },
                { id: 'jeju', name: '제주', lon: 126.53, lat: 33.5, value: [15.4, 26.2, 18.4, 8.6] },
            ],
            pointLabel: {
                visible: true,
                position: 'top',
                text: '${name}',
                effect: 'outline',
                style: {
                    fontSize: 14,
                    fontWeight: 700,
                },
            },
            barLabel: {
                visible: true,
                position: 'center',
                autoContrast: true,
                effect: 'outline',
                numberFormat: '#,##0.0',
                darkStyle: { fill: '#0b1220' },
                lightStyle: { fill: '#f8fafc' },
                style: {
                    fontSize: 12,
                    fontWeight: 700,
                },
            },
        },
    ],
};

function onChartLoaded(mapChart) {
    const BRIGHT_SEASON = [true, true, false, true];
    const DARK_TEXT = '#0b1220';

    const MODES = {
        inside: {
            pointPosition: 'top',
            barLabel: { position: 'center', autoContrast: true, styleCallback: null },
        },
        above: {
            pointPosition: 'bottom',
            barLabel: { position: 'top', autoContrast: false, styleCallback: null },
        },
        sides: {
            pointPosition: 'top',
            barLabel: {
                position: ['left', 'center', 'center', 'right'],
                autoContrast: false,
                styleCallback: function (args) {
                    const inside = args.barIndex === 1 || args.barIndex === 2;

                    return inside && BRIGHT_SEASON[args.barIndex] ? { fill: DARK_TEXT } : null;
                },
            },
        },
    };

    const applyMode = function (name) {
        const mode = MODES[name];

        if (mode) {
            mapChart.seriesByType('bar').updateOptions({
                pointLabel: { position: mode.pointPosition },
                barLabel: mode.barLabel,
            });
        }
    };

    window.seasonTemperature = { applyMode: applyMode };
}

let mapChart;

const tool = {
    actions: [
        {
            type: 'select',
            label: '값 라벨 위치',
            value: 'inside',
            data: ['inside', 'above', 'sides'],
            labels: ['막대 안', '막대 위', '양옆'],
            action: ({ value }) => window.seasonTemperature?.applyMode(value),
        },
    ],
    events: {
        onChartLoaded,
    },
    options: {
        css: `
#realmap .rm-control {
    --rm-background: #0f172a;
    border-radius: 12px;
}
#realmap .rm-root {
    --rm-text-fill: #e2e8f0;
    --rm-title-fill: #f8fafc;
    --rm-subtitle-fill: #94a3b8;
    --rm-legend-fill: #e2e8f0;
    --rm-point-label-fill: #f8fafc;
    --rm-point-label-font-weight: 700;
}
`,
    },
};

function applyDemoCss() {
    const style = document.createElement('style');
    style.textContent = tool.options.css;
    document.head.appendChild(style);
}

function setActions(container) {
    createButton(container, '막대 안', () => window.seasonTemperature?.applyMode('inside'));
    createButton(container, '막대 위', () => window.seasonTemperature?.applyMode('above'));
    createButton(container, '양옆', () => window.seasonTemperature?.applyMode('sides'));
}

async function init() {
    applyDemoCss();
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    onChartLoaded(mapChart);
    setActions('actions');
}
