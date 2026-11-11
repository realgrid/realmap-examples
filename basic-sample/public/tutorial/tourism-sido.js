const SIDOS = [
    { id: '11', name: '서울', value: 1420 },
    { id: '21', name: '부산', value: 330 },
    { id: '39', name: '제주', value: 290 },
    { id: '31', name: '경기', value: 310 },
    { id: '23', name: '인천', value: 190 },
    { id: '32', name: '강원', value: 150 },
    { id: '12', name: '전남광주', value: 110 },
    { id: '37', name: '경북', value: 100 },
    { id: '38', name: '경남', value: 90 },
    { id: '22', name: '대구', value: 70 },
    { id: '34', name: '충남', value: 60 },
    { id: '35', name: '전북', value: 45 },
    { id: '33', name: '충북', value: 40 },
    { id: '25', name: '대전', value: 40 },
    { id: '26', name: '울산', value: 25 },
    { id: '29', name: '세종', value: 12 }
];

const TOTAL = SIDOS.reduce(function (sum, c) { return sum + c.value; }, 0);

const config = {
    credits: false,
    general: { locale: 'ko' },
    map: [
        {
            url: '../maps/2026-07/maps/geojson/kr-sido-low.geo.json',
            insets: ['제주', '울릉', '백령'],
            dokdo: 0.2,
            areas: ['../maps/areas-2026-07.geo.json'],
            padding: '0.02 0.03 0.14 0.03'
        },
    ],
    body: { projection: 'mercator' },
    legend: { visible: false },
    zoomPanel: { visible: false },
    colorScale: {
        location: 'body',
        solidFill: true,
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        offsetX: -14,
        offsetY: -14,
        barWidth: 10,
        barLength: 180,
        marker: { visible: false },
        tick: { maxVisible: false },
        label: { style: { fill: '#475569' } },
        steps: [
            { to: 50, color: '#93c5fd', label: '50 미만' },
            { from: 50, to: 150, color: '#60a5fa', label: '50~150' },
            { from: 150, to: 500, color: '#2563eb', label: '150~500' },
            { from: 500, color: '#1e3a8a', label: '500 이상' }
        ]
    },
    title: {
        text: '시도별 외국인 관광객 방문',
        align: 'left',
        alignBase: 'chart',
        style: { fontSize: '15pt', fontWeight: 700, fill: '#0f172a' }
    },
    subtitle: {
        text: '2025년 방문객(만 명) · 전국 ' + TOTAL.toLocaleString('en-US') + '만 명 · 예시 데이터',
        align: 'left',
        alignBase: 'chart',
        style: { fontSize: '10pt', fill: '#64748b' }
    },
    series: [
        {
            useMapData: true,
            style: { stroke: '#ffffff', strokeWidth: 0.8, fill: '#dbe4f0' }
        },
        {
            type: 'bubble',
            name: 'bubbles',
            colorScale: 0,
            sizeMode: 'area',
            minSize: '8%',
            maxSize: '15%',
            position: 'center',
            callout: {
                visible: true,
                auto: { visible: true, gap: 0.05, minLength: 0.2 },
                usePointColor: false,
                style: {
                    stroke: '#1e40af',
                    strokeWidth: 1.4
                },
                anchorPoint: {
                    radius: 4,
                    style: {
                        fill: '#1e40af'
                    }
                }
            },
            style: { fillOpacity: 0.95, stroke: '#ffffff', strokeWidth: 1.2 },
            tooltipText: '<b>${name}</b><br>${value;;#,##0}만 명',
            pointLabel: {
                visible: true,
                effect: 'none',
                autoContrast: true,
                style: { fontSize: '0.26em', fontWeight: 700 },
                textCallback: function (point) {
                    return point.name;
                }
            },
            data: SIDOS
        }
    ]
};

let mapChart;

function onChartLoaded(mapChart) {
    const NEW_LINE = String.fromCharCode(10);
    const DEFAULTS = { distance: 0.1, gap: 0.1, minLength: 0.4, radial: 1.2 };
    const TUNED = { gap: 0.05, minLength: 0.2 };
    const state = Object.assign({ enabled: true }, DEFAULTS, TUNED);

    const configText = function () {
        if (!state.enabled) {
            return 'callout: { auto: false },';
        }

        const lines = Object.keys(DEFAULTS).filter(function (name) {
            return state[name] !== DEFAULTS[name];
        }).map(function (name) {
            return ' '.repeat(8) + name + ': ' + state[name] + ',';
        });

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
                },
            }
        });
        showConfig();
    };

    window.tourism = {
        set: function (name, value) {
            state[name] = value;
            apply();
        },
        setEnabled: function (on) {
            state.enabled = on;
            apply();
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
    height: 620,
    options: {
        css: '#realmap { background: #f8fafc; border: 1px solid #dbeafe; border-radius: 10px; overflow: hidden; } ' +
            '#realmap g.rm-series.rm-bubble-series path.rm-point { filter: drop-shadow(0 2px 5px rgba(30, 58, 138, 0.22)); transition: filter 0.15s; } ' +
            '#realmap g.rm-series.rm-bubble-series path.rm-point:hover { filter: drop-shadow(0 3px 8px rgba(30, 58, 138, 0.45)) brightness(1.06); }'
    },
    events: {
        onChartLoaded,
    },
    actions: [
        {
            type: 'check',
            label: '자동 배치',
            value: true,
            action: ({ value }) => window.tourism?.setEnabled(value)
        },
        {
            type: 'select',
            label: '차트 크기',
            value: '850x620',
            data: ['850x620', '680x520', '520x420'],
            labels: ['기본 (850 x 620)', '작게 (680 x 520)', '아주 작게 (520 x 420)'],
            action: ({ value }) => window.tourism?.resize(value)
        },
        {
            type: 'range',
            label: 'distance',
            value: 0.1,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.tourism?.set('distance', value)
        },
        {
            type: 'range',
            label: 'gap',
            value: 0.05,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.tourism?.set('gap', value)
        },
        {
            type: 'range',
            label: 'minLength',
            value: 0.2,
            data: { min: 0, max: 2, step: 0.05 },
            action: ({ value }) => window.tourism?.set('minLength', value)
        },
        {
            type: 'range',
            label: 'radial',
            value: 1.2,
            data: { min: 0, max: 4, step: 0.1 },
            action: ({ value }) => window.tourism?.set('radial', value)
        },
        {
            type: 'preview',
            label: '버블 시리즈 callout 설정',
            id: 'auto-config',
            value: 'callout: { auto: { gap: 0.05, minLength: 0.2 } },'
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
