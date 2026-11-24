const BUBBLE_DATA = [
    { id: '11', name: '서울', value: 1243 },
    { id: '23', name: '인천', value: 60 },
    { id: '31', name: '경기', value: 308 },
    { id: '32', name: '강원', value: 36 },
    { id: '33', name: '충북', value: 31 },
    { id: '34', name: '충남', value: 37 },
    { id: '29', name: '세종', value: 5 },
    { id: '25', name: '대전', value: 58 },
    { id: '35', name: '전북', value: 46 },
    { id: '12', name: '전남광주', value: 61 },
    { id: '22', name: '대구', value: 68 },
    { id: '37', name: '경북', value: 48 },
    { id: '26', name: '울산', value: 25 },
    { id: '38', name: '경남', value: 64 },
    { id: '21', name: '부산', value: 131 },
    { id: '39', name: '제주', value: 13 },
    { id: '32030', name: '강릉', value: 8 },
    { id: '12010', name: '목포', value: 6, offset: [[0, -0.3], [-0.85, 0]] },
    { id: '37011', name: '포항', value: 15 },
    { name: '전국', value: 2245, lon: 125.2, lat: 38.3 },
];

const config = {
    title: false,
    credits: false,
    general: { locale: 'ko' },
    map: [
        {
            url: '../maps/2026-07/maps/geojson/kr-sido-low.geo.json',
            insets: ['제주', '울릉', '백령'],
            dokdo: 0.2,
            areas: ['../maps/areas-2026-07.geo.json'],
            unions: [
                { members: ['37011', '37012'], id: '37011', properties: { name: '포항', 'en-name': 'Pohang-si' }, center: [129.33, 36.03] },
            ],
            padding: '0.2 0 0.2 0',
        },
    ],
    body: { projection: 'mercator' },
    legend: { visible: false },
    zoomPanel: { visible: false },
    series: [
        {
            useMapData: true,
            style: { stroke: '#b3bdcc', strokeWidth: 0.7, fill: '#e3e8ef' },
        },
        {
            type: 'bubble',
            name: 'bubbles',
            minSize: '11%',
            maxSize: '11%',
            position: 'center',
            callout: { visible: true, auto: true },
            color: '#b4cdee',
            style: { stroke: '#3f6cae', strokeWidth: 1, fillOpacity: 0.92 },
            tooltipText: '<b>${name}</b><br>${value;;#,##0}',
            styleCallback: (args) => window.calloutAuto?.styleOf(args),
            onPointClick: (args) => {
                window.calloutAuto?.assign(args.id);
            },
            data: BUBBLE_DATA,
            pointLabel: {
                visible: true,
                style: { fontSize: 10, fill: '#14263d' },
                textCallback: function (point) {
                    return point.name;
                },
            },
        },
    ],
};

let mapChart;

function onChartLoaded(mapChart) {
    const DEFAULTS = { mode: 'overlap', distance: 0.1, gap: 0.1, minLength: 0.4, radial: 1.2, always: [], never: [] };
    const QUOTE = String.fromCharCode(39);
    const NEW_LINE = String.fromCharCode(10);
    const state = { enabled: true, pick: 'always', mode: DEFAULTS.mode, distance: DEFAULTS.distance, gap: DEFAULTS.gap, minLength: DEFAULTS.minLength, radial: DEFAULTS.radial, always: DEFAULTS.always, never: DEFAULTS.never };

    const changedOptions = function () {
        const result = {};

        Object.keys(DEFAULTS).forEach(function (name) {
            const value = state[name];
            const isDefault = Array.isArray(value) ? value.length === DEFAULTS[name].length : value === DEFAULTS[name];

            if (!isDefault) {
                result[name] = state[name];
            }
        });
        return result;
    };

    const literal = function (value) {
        if (Array.isArray(value)) {
            return '[' + value.map(literal).join(', ') + ']';
        }
        return typeof value === 'string' ? QUOTE + value + QUOTE : String(value);
    };

    const configText = function () {
        if (!state.enabled) {
            return 'callout: { auto: false },';
        }

        const changed = changedOptions();
        const names = Object.keys(changed);

        if (names.length === 0) {
            return 'callout: { auto: true },';
        }

        const lines = ['callout: {', ' '.repeat(4) + 'auto: {'];

        names.forEach(function (name) {
            lines.push(' '.repeat(8) + name + ': ' + literal(changed[name]) + ',');
        });
        lines.push(' '.repeat(4) + '},', '},');
        return lines.join(NEW_LINE);
    };

    const showConfig = function () {
        const preview = document.querySelector('[data-docs-preview=auto-config]');

        if (preview) {
            preview.textContent = configText();
        }
    };

    const apply = function () {
        mapChart.seriesByName('bubbles').mergeOptions({
            callout: {
                auto: {
                    visible: state.enabled,
                    mode: state.mode,
                    distance: state.distance,
                    gap: state.gap,
                    minLength: state.minLength,
                    radial: state.radial,
                    always: state.always,
                    never: state.never,
                },
            },
        });
        showConfig();
    };

    window.calloutAuto = {
        set: function (name, value) {
            state[name] = value;
            apply();
        },
        pick: function (mode) {
            state.pick = mode;
        },
        assign: function (id) {
            const had = state[state.pick] ? state[state.pick].indexOf(id) >= 0 : false;

            state.always = state.always.filter(function (v) { return v !== id; });
            state.never = state.never.filter(function (v) { return v !== id; });
            if (state.pick === 'always' && !had) {
                state.always = state.always.concat([id]);
            } else if (state.pick === 'never' && !had) {
                state.never = state.never.concat([id]);
            }
            apply();
        },
        reset: function () {
            state.always = [];
            state.never = [];
            apply();
        },
        styleOf: function (args) {
            if (state.always.indexOf(args.id) >= 0) {
                return { stroke: '#d97706', strokeWidth: 3, strokeDasharray: '6 3' };
            }
            if (state.never.indexOf(args.id) >= 0) {
                return { stroke: '#0f172a', strokeWidth: 3.5 };
            }
        },
        resize: function (size) {
            const parts = size.split('x');
            const container = document.getElementById('realmap');

            container.style.width = parts[0] + 'px';
            container.style.height = parts[1] + 'px';
        },
    };
    showConfig();
}

const tool = {
    width: 850,
    height: 520,
    options: {
        css: '#realmap { background: #fafbfd; } ' +
            '#realmap g.rm-series.rm-bubble-series path.rm-point { cursor: pointer; } ' +
            '#realmap .rm-callout-line { stroke: #5b7aa6 !important; stroke-width: 1.2px !important; } ' +
            '#realmap .rm-callout-anchor { fill: #34558a !important; }'
    },
    events: {
        onChartLoaded,
    },
    actions: [
        {
            type: 'check',
            label: '자동 배치',
            value: true,
            action: ({ value }) => window.calloutAuto?.set('enabled', value)
        },
        {
            type: 'radio',
            label: 'mode',
            value: 'overlap',
            data: ['overlap', 'all'],
            labels: ['overlap (겹치는 것만 지도 밖으로)', 'all (모두 지도 밖으로)'],
            action: ({ value }) => window.calloutAuto?.set('mode', value)
        },
        {
            type: 'radio',
            label: '버블을 클릭하면',
            value: 'always',
            data: ['always', 'never', 'clear'],
            labels: ['항상 밖으로 빼기 (always)', '제자리에 두기 (never)', '지정 해제'],
            action: ({ value }) => window.calloutAuto?.pick(value)
        },
        {
            type: 'button',
            label: '지정 모두 해제',
            value: '',
            data: '',
            action: () => window.calloutAuto?.reset()
        },
        {
            type: 'select',
            label: '차트 크기',
            value: '850x520',
            data: ['850x520', '680x420', '520x330'],
            labels: ['기본 (850 x 520)', '작게 (680 x 420)', '아주 작게 (520 x 330)'],
            action: ({ value }) => window.calloutAuto?.resize(value)
        },
        {
            type: 'range',
            label: 'distance',
            value: 0.1,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.calloutAuto?.set('distance', value)
        },
        {
            type: 'range',
            label: 'gap',
            value: 0.1,
            data: { min: 0, max: 1, step: 0.05 },
            action: ({ value }) => window.calloutAuto?.set('gap', value)
        },
        {
            type: 'range',
            label: 'minLength',
            value: 0.4,
            data: { min: 0, max: 2, step: 0.05 },
            action: ({ value }) => window.calloutAuto?.set('minLength', value)
        },
        {
            type: 'range',
            label: 'radial',
            value: 1.2,
            data: { min: 0, max: 4, step: 0.1 },
            action: ({ value }) => window.calloutAuto?.set('radial', value)
        },
        {
            type: 'preview',
            label: '버블 시리즈 callout 설정',
            id: 'auto-config',
            value: 'callout: { auto: true },'
        }
    ]
};

async function init() {
    const style = document.createElement('style');

    style.textContent = tool.options.css;
    document.head.appendChild(style);
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    tool.events.onChartLoaded(mapChart);
}
