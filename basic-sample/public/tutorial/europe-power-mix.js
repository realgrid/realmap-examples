const COUNTRIES = [
    { id: 'NOR', name: '노르웨이', lon: 6.6, lat: 61.2 },
    { id: 'SWE', name: '스웨덴', lon: 15.2, lat: 61.0 },
    { id: 'FIN', name: '핀란드', lon: 26.0, lat: 62.0 },
    { id: 'GBR', name: '영국', lon: -3.2, lat: 53.0 },
    { id: 'NLD', name: '네덜란드', lon: 5.3, lat: 52.3, offset: [[-1.2, 0], [0, 9.6], [-4.2, 0]] },
    { id: 'DEU', name: '독일', lon: 10.2, lat: 50.8 },
    { id: 'POL', name: '폴란드', lon: 19.4, lat: 52.0 },
    { id: 'FRA', name: '프랑스', lon: 2.4, lat: 46.6 },
    { id: 'ESP', name: '스페인', lon: -3.7, lat: 40.0 },
    { id: 'ITA', name: '이탈리아', lon: 13.4, lat: 42.2 },
    { id: 'GRC', name: '그리스', lon: 22.0, lat: 39.4 }
];

const MIX_2025 = {
    NOR: [0, 1.61, 0, 145.11, 14.09],
    SWE: [0, 2.08, 47.1, 78.2, 43.33],
    FIN: [0.16, 2.85, 32.82, 22.91, 23.56],
    GBR: [0.33, 103.68, 36.38, 46.76, 105.16],
    NLD: [9.55, 52.32, 3.99, 6.9, 62.2],
    DEU: [103.15, 101.58, 0, 70.09, 225.65],
    POL: [87.32, 31.35, 0, 10.42, 44.17],
    FRA: [1.74, 27.61, 392.07, 70.25, 78.31],
    ESP: [0.92, 72.09, 54.07, 39.15, 121.66],
    ITA: [3.73, 131.86, 0, 63, 66.11],
    GRC: [2.74, 26.57, 0, 4.13, 24.83]
};

const config = {
    title: false,
    credits: false,
    zoomPanel: { visible: false },
    map: [{
        url: '../maps/geojson/world-mid.geo.json',
        bounds: [-12, 34, 34, 71.5]
    }],
    body: {
        projection: 'naturalearth',
        style: { fill: 'none' }
    },
    legend: {
        visible: true,
        location: 'body',
        align: 'left',
        verticalAlign: 'bottom',
        reversed: true,
        offsetX: 20,
        offsetY: -16,
        markerSize: 11,
        markerGap: 6,
        itemGap: 16,
        style: { fontSize: '12px', fill: '#64748b' }
    },
    annotations: [
        {
            name: 'title',
            front: true,
            type: 'text',
            text: '유럽 전력 생산 구성',
            offsetX: 24,
            offsetY: 20,
            style: { fontSize: '21px', fontWeight: 700, fill: '#1b2838' }
        },
        {
            name: 'subtitle',
            front: true,
            type: 'text',
            text: '2025년 · 발전원별 발전량(TWh)',
            offsetX: 24,
            offsetY: 50,
            style: { fontSize: '13px', fill: '#64748b' }
        },
        {
            name: 'source',
            front: true,
            type: 'text',
            align: 'right',
            verticalAlign: 'bottom',
            text: '출처: Ember, Energy Institute (Our World in Data 가공)',
            offsetX: 16,
            offsetY: 12,
            style: { fontSize: '11px', fill: '#94a3b8' }
        }
    ],
    series: [
        {
            useMapData: true,
            legend: false,
            tooltipText: false,
            style: { fill: '#fbfcfd', stroke: '#d4dbe3', strokeWidth: 0.6 }
        },
        {
            type: 'bar',
            name: 'mix',
            layout: 'stack',
            minValue: 0,
            maxValue: 650,
            width: '6%',
            height: '30%',
            barWidth: 0.8,
            categories: [
                { name: '석탄', color: '#3b4048' },
                { name: '가스·석유', color: '#9ba2aa' },
                { name: '원자력', color: '#22456b' },
                { name: '수력·바이오', color: '#5a86b1' },
                { name: '풍력·태양광', color: '#b3cde6' }
            ],
            style: { fillOpacity: 1, stroke: '#ffffff', strokeWidth: 0.8 },
            legendByCategory: true,
            barLabel: {
                visible: true,
                autoContrast: true,
                darkStyle: { fill: '#1b2838' },
                lightStyle: { fill: '#ffffff' },
                style: { fontSize: '11px', fontWeight: 600 },
                visibleCallback: function (args) {
                    const v = args.source.value[args.barIndex];

                    return v >= (args.source.share ? 13 : 50);
                },
                textCallback: function (args) {
                    const v = args.source.value[args.barIndex];

                    return args.source.share ? Math.round(v) + '%' : String(Math.round(v));
                }
            },
            callout: {
                visible: true,
                usePointColor: false
            },
            pointLabel: {
                visible: true,
                position: 'bottom',
                style: { fontSize: '12px', fontWeight: 700, fill: '#1b2838' },
                textCallback: function (point) {
                    return point.labelIndex === 1 ? point.source.total + ' TWh' : point.name;
                }
            },
            tooltipCallback: function (point) {
                const names = ['석탄', '가스·석유', '원자력', '수력·바이오', '풍력·태양광'];
                const sum = point.value.reduce(function (a, v) { return a + v; }, 0);
                const rows = [];

                names.forEach(function (n, i) {
                    const share = point.value[i] / sum;

                    if (point.value[i] > 0) {
                        rows.unshift(n + ' ' + Math.round(share * point.source.total) + ' TWh (' + Math.round(share * 100) + '%)');
                    }
                });

                return '<b>' + point.name + '</b> · 합계 ' + point.source.total + ' TWh<br>' + rows.join('<br>');
            },
            subLabel: {
                visible: true,
                position: 'bottom',
                offset: 14,
                style: { fontSize: '11px', fill: '#64748b' }
            },
            data: COUNTRIES.map(function (c) {
                const values = MIX_2025[c.id];
                const total = values.reduce(function (sum, v) { return sum + v; }, 0);

                return Object.assign({}, c, { value: values, total: Math.round(total) });
            })
        }
    ]
};

let mapChart;

async function onChartLoaded(mapChart) {
    const NEW_LINE = String.fromCharCode(10);
    const state = { year: 2025, mode: 'twh' };
    const byYear = {};

    const groupRow = function (cols) {
        const n = cols.map(Number);
        const round = function (v) { return Math.round(v * 100) / 100; };

        return [n[11], n[9] + n[10], n[8], n[7] + n[4] + n[3], n[6] + n[5]].map(round);
    };

    const text = await fetch('../data/europe-electricity-mix.csv').then(function (res) { return res.text(); });

    text.split(NEW_LINE).slice(1).filter(function (line) { return line; }).forEach(function (line) {
        const cols = line.split(',');
        const year = cols[2];

        byYear[year] = byYear[year] || {};
        byYear[year][cols[1]] = groupRow(cols);
    });

    const buildData = function (countries) {
        const mix = byYear[state.year];
        const share = state.mode === 'share';

        return countries.map(function (c) {
            const values = mix[c.id];
            const total = values.reduce(function (sum, v) { return sum + v; }, 0);
            const shown = share
                ? values.map(function (v) { return Math.round(v / total * 1000) / 10; })
                : values;

            return Object.assign({}, c, { value: shown, total: Math.round(total), share: share });
        });
    };

    const subtitle = function () {
        return state.year + '년 · ' + (state.mode === 'share' ? '발전원별 비중(%)' : '발전원별 발전량(TWh)');
    };

    const render = function () {
        const countries = countryList();

        if (countries.length === 0) {
            requestAnimationFrame(render);
            return;
        }
        mapChart.seriesByName('mix').mergeOptions({
            maxValue: state.mode === 'share' ? 100 : 650,
            height: state.mode === 'share' ? '19%' : '30%',
            data: buildData(countries)
        });
        mapChart.getAnnotation('subtitle').mergeOptions({ text: subtitle() });
    };

    const countryList = function () {
        return mapChart.seriesByName('mix').getPoints().map(function (p) {
            return { id: p.source.id, name: p.source.name, lon: p.source.lon, lat: p.source.lat, offset: p.source.offset };
        });
    };

    window.powerMix = {
        setYear: function (year) {
            state.year = Number(year);
            render();
        },
        setMode: function (mode) {
            state.mode = mode;
            render();
        }
    };
}

const tool = {
    width: 850,
    height: 700,
    options: {
        css: '#realmap { background: #edf1f5; border: 1px solid #d4dbe3; border-radius: 12px; overflow: hidden; } ' +
            '#realmap .rm-control { background-color: transparent; } ' +
            '#realmap .rm-callout-line { stroke: #7b8794; } ' +
            '#realmap .rm-callout-anchor { fill: #7b8794; }'
    },
    events: {
        onChartLoaded,
    },
    actions: [
        {
            type: 'range',
            label: '연도',
            value: 2025,
            data: { min: 2014, max: 2025, step: 1 },
            action: ({ value }) => window.powerMix?.setYear(value)
        },
        {
            type: 'radio',
            label: '보기',
            value: 'twh',
            data: ['twh', 'share'],
            labels: ['발전량(TWh)', '비중(%)'],
            action: ({ value }) => window.powerMix?.setMode(value)
        }
    ]
};

async function init() {
    const style = document.createElement('style');

    style.textContent = tool.options.css;
    document.head.appendChild(style);
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    await tool.events.onChartLoaded(mapChart);
    setActions('actions');
}

function setActions(container) {
    const year = tool.actions[0];
    const mode = tool.actions[1];

    createRangeSlider(container, year.label, year.data, year.value, function (value) { year.action({ value: value }); });
    createRadioGroup(container, mode.label, mode.data, mode.labels, function (e) { mode.action({ value: e.target.value }); });
    document.querySelector('#' + container + ' input[value="' + mode.value + '"]').checked = true;
}
