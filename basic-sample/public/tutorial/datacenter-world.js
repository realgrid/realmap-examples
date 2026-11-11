const COUNTRIES = [
    { id: 'USA', code: 'US', name: '미국', value: 45 },
    { id: 'CHN', code: 'CN', name: '중국', value: 19.6 },
    { id: 'IND', code: 'IN', name: '인도', value: 2.4 },
    { id: 'DEU', code: 'DE', name: '독일', value: 1.8 },
    { id: 'JPN', code: 'JP', name: '일본', value: 2.2 },
    { id: 'GBR', code: 'GB', name: '영국', value: 2 },
    { id: 'CAN', code: 'CA', name: '캐나다', value: 1.7 },
    { id: 'FRA', code: 'FR', name: '프랑스', value: 1.1 },
    { id: 'NGA', code: 'NG', name: '나이지리아', value: 0.1 },
    { id: 'KOR', code: 'KR', name: '대한민국', value: 1 },
    { id: 'ARE', code: 'AE', name: '아랍에미리트', value: 0.6 },
    { id: 'COL', code: 'CO', name: '콜롬비아', value: 0.15 },
    { id: 'AUS', code: 'AU', name: '호주', value: 1.6 },
    { id: 'MYS', code: 'MY', name: '말레이시아', value: 1.3 },
    { id: 'BRA', code: 'BR', name: '브라질', value: 0.7 },
    { id: 'SAU', code: 'SA', name: '사우디아라비아', value: 0.4 },
    { id: 'ESP', code: 'ES', name: '스페인', value: 0.5 },
    { id: 'NZL', code: 'NZ', name: '뉴질랜드', value: 0.15 },
    { id: 'ITA', code: 'IT', name: '이탈리아', value: 0.6 },
    { id: 'CHL', code: 'CL', name: '칠레', value: 0.2 },
    { id: 'MEX', code: 'MX', name: '멕시코', value: 0.3 },
    { id: 'IDN', code: 'ID', name: '인도네시아', value: 0.45 },
    { id: 'EGY', code: 'EG', name: '이집트', value: 0.15 },
    { id: 'TUR', code: 'TR', name: '튀르키예', value: 0.3 },
    { id: 'ZAF', code: 'ZA', name: '남아프리카공화국', value: 0.3 }
];

const TOTAL = COUNTRIES.reduce(function (sum, c) { return sum + c.value; }, 0);

const config = {
    credits: false,
    general: { theme: 'dark' },
    map: [{
        url: '../maps/geojson/world-low.geo.json',
        exclude: ['ATA'],
        padding: '0.02 0.02 0.12 0.02'
    }],
    body: {
        projection: 'miller',
        style: { fill: 'none' }
    },
    colorScale: {
        location: 'body',
        solidFill: true,
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        offsetX: -12,
        offsetY: -8,
        barWidth: 10,
        barLength: 300,
        marker: { visible: false },
        tick: { maxVisible: false },
        steps: [
            { to: 0.5, color: '#6366f1', label: '0.5 미만' },
            { from: 0.5, to: 1, color: '#3b82f6', label: '0.5~1' },
            { from: 1, to: 3, color: '#22d3ee', label: '1~3' },
            { from: 3, color: '#e0f2fe', label: '3 이상' }
        ]
    },
    title: false,
    annotations: [
        {
            type: 'text',
            front: true,
            offsetX: 0,
            offsetY: 0,
            text: '글로벌 AI 데이터센터 전력 용량',
            style: { fontSize: '15pt', fontWeight: 700, fill: '#f1f5ff' }
        },
        {
            type: 'text',
            front: true,
            offsetX: 0,
            offsetY: 30,
            text: '데이터센터 가동 용량(GW) · ' + COUNTRIES.length + '개국 합계 ' + TOTAL.toFixed(1) + ' GW · 더미 데이터',
            style: { fontSize: '10pt', fill: '#93a4c8' }
        }
    ],
    series: [
        {
            useMapData: true,
            legend: false,
            tooltipText: false,
            style: { fill: '#1a2745', stroke: '#2d3f6b', strokeWidth: 0.6 }
        },
        {
            type: 'bubble',
            name: 'bubbles',
            colorScale: 0,
            sizeMode: 'area',
            minSize: '4.8%',
            maxSize: '8.5%',
            position: 'center',
            callout: {
                visible: true,
                auto: { visible: true, minLength: 0.2, always: ['KOR', 'JPN'] },
                usePointColor: false,
                style: {
                    stroke: '#e0f2fe',
                    strokeWidth: 1.25,
                    filter: 'drop-shadow(0 0 1px rgba(2, 6, 23, 0.9)) drop-shadow(0 0 4px rgba(56, 189, 248, 0.75))'
                },
                anchorPoint: {
                    radius: 3.5,
                    style: {
                        fill: '#f8fafc',
                        filter: 'drop-shadow(0 0 1px rgba(2, 6, 23, 0.9)) drop-shadow(0 0 6px rgba(125, 211, 252, 1))'
                    }
                }
            },
            style: { fillOpacity: 0.96, stroke: '#e6f0ff', strokeWidth: 1 },
            tooltipText: '<b>${name}</b><br>${value;;0.0} GW',
            pointLabel: {
                visible: true,
                effect: 'none',
                autoContrast: true,
                style: { fontSize: '0.32em', fontWeight: 700 },
                textCallback: function (point) {
                    return point.source.code;
                }
            },
            styleCallback: (args) => window.datacenter?.styleOf(args),
            data: COUNTRIES
        },
        {
            type: 'bar',
            name: '상위 5개국',
            legend: false,
            tooltipText: false,
            width: 300,
            height: 66,
            barWidth: 0.6,
            categories: [
                { name: '미국', color: '#e0f2fe' },
                { name: '중국', color: '#e0f2fe' },
                { name: '인도', color: '#22d3ee' },
                { name: '일본', color: '#22d3ee' },
                { name: '영국', color: '#22d3ee' }
            ],
            style: { opacity: 1, fillOpacity: 1, stroke: 'none' },
            pointLabel: { style: { fontSize: 11, fontWeight: 600, fill: '#93a4c8' } },
            barLabel: {
                visible: true,
                position: 'top',
                style: { fontSize: 10, fontWeight: 700, fill: '#f1f5ff' },
                textCallback: function (args) {
                    return ['미국', '중국', '인도', '일본', '영국'][args.barIndex] + ' ' + args.source.value[args.barIndex].toFixed(1);
                }
            },
            data: [{ name: '상위 5개국 전력 용량(GW)', lon: 83, lat: 79, value: [45.0, 19.6, 2.4, 2.2, 2.0] }]
        }
    ]
};

let mapChart;

function onChartLoaded(mapChart) {
    const QUOTE = String.fromCharCode(39);
    const NEW_LINE = String.fromCharCode(10);
    const TOP3 = ['USA', 'CHN', 'IND'];
    const DEFAULTS = { distance: 0.1, gap: 0.1, minLength: 0.4, radial: 1.2 };
    const TUNED = { minLength: 0.2 };
    const state = Object.assign({ enabled: true, always: ['KOR', 'JPN'] }, DEFAULTS, TUNED);

    const literal = function (list) {
        return '[' + list.map(function (id) { return QUOTE + id + QUOTE; }).join(', ') + ']';
    };

    const configText = function () {
        if (!state.enabled) {
            return 'callout: { auto: false },';
        }

        const lines = Object.keys(DEFAULTS).filter(function (name) {
            return state[name] !== DEFAULTS[name];
        }).map(function (name) {
            return ' '.repeat(8) + name + ': ' + state[name] + ',';
        });

        if (state.always.length > 0) {
            lines.push(' '.repeat(8) + 'always: ' + literal(state.always) + ',');
        }
        return ['callout: {', ' '.repeat(4) + 'auto: {'].concat(lines, [' '.repeat(4) + '},', '},']).join(NEW_LINE);
    };

    const showConfig = function () {
        const preview = document.querySelector('[data-docs-preview=auto-config]');

        if (preview) {
            preview.textContent = configText();
        }
    };

    const apply = function () {
        mapChart.seriesByType('bubble').updateOptions({
            callout: {
                auto: {
                    visible: state.enabled,
                    distance: state.distance,
                    gap: state.gap,
                    minLength: state.minLength,
                    radial: state.radial,
                    always: state.always,
                },
            }
        });
        showConfig();
    };

    window.datacenter = {
        set: function (name, value) {
            state[name] = value;
            apply();
        },
        setEnabled: function (on) {
            state.enabled = on;
            apply();
        },
        styleOf: function (args) {
            if (TOP3.indexOf(args.id) >= 0) {
                return { stroke: '#fbbf24', strokeWidth: 3, strokeDasharray: '6 3' };
            }
        },
        resize: function (size) {
            const parts = size.split('x');
            const container = document.getElementById('realmap');

            container.style.width = parts[0] + 'px';
            container.style.height = parts[1] + 'px';
        }
    };
    showConfig();
}

const tool = {
    width: 850,
    height: 560,
    options: {
        css: '#realmap { background: radial-gradient(900px 560px at 28% 14%, #16264a 0%, #0b1226 62%, #070c1a 100%); border-radius: 10px; overflow: hidden; } ' +
            '#realmap .rm-control { background-color: transparent; } ' +
            '#realmap g.rm-series.rm-bubble-series path.rm-point { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.32)); }'
    },
    events: {
        onChartLoaded,
    },
    actions: [
        {
            type: 'check',
            label: '자동 배치',
            value: true,
            action: ({ value }) => window.datacenter?.setEnabled(value)
        },
        {
            type: 'select',
            label: '차트 크기',
            value: '850x560',
            data: ['850x560', '680x460', '520x380'],
            labels: ['기본 (850 x 560)', '작게 (680 x 460)', '아주 작게 (520 x 380)'],
            action: ({ value }) => window.datacenter?.resize(value)
        },
        {
            type: 'range',
            label: 'distance',
            value: 0.1,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.datacenter?.set('distance', value)
        },
        {
            type: 'range',
            label: 'gap',
            value: 0.1,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.datacenter?.set('gap', value)
        },
        {
            type: 'range',
            label: 'minLength',
            value: 0.2,
            data: { min: 0, max: 2, step: 0.05 },
            action: ({ value }) => window.datacenter?.set('minLength', value)
        },
        {
            type: 'range',
            label: 'radial',
            value: 1.2,
            data: { min: 0, max: 4, step: 0.1 },
            action: ({ value }) => window.datacenter?.set('radial', value)
        },
        {
            type: 'preview',
            label: '버블 시리즈 callout 설정',
            id: 'auto-config',
            value: "callout: { auto: { minLength: 0.2, always: ['KOR', 'JPN'] } },"
        }
    ]
};

async function init() {
    const style = document.createElement('style');

    style.textContent = tool.options.css;
    document.head.appendChild(style);
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    tool.events.onChartLoaded(mapChart);
    tool.actions.filter(function (item) { return item.type === 'range'; }).forEach(function (item) {
        createRangeSlider('actions', item.label, item.data, item.value, function (value) { item.action({ value: value }); });
    });
}
