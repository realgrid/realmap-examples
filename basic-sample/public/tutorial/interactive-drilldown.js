const config = {
    title: false,
    credits: false,
    legend: { visible: false },
    general: {
        clickAction: 'drilldown',
        onClick: (args) => window.interactiveDrilldown?.handleClick(args),
        onDrilldown: (args) => window.interactiveDrilldown?.handleDrilldown(args),
        onDrillup: (args) => window.interactiveDrilldown?.handleDrillup(args),
    },
    drilldownPanel: {
        type: 'text',
        align: 'left',
        verticalAlign: 'top',
    },
    tooltip: {
        nanText: '--',
    },
    map: [
        {
            name: '시도',
            url: '../maps/2026-07/maps/topojson/kr-sido-low.topo.json',
            insets: ['제주도', '울릉도', '백령도'],
            dokdo: 0.2,
            padding: '0.2 0.1 0.1 0.1',
        },
        {
            name: '시군구',
            url: '../maps/2026-07/maps/topojson/kr-sigun-low.topo.json',
            insets: ['울릉도'],
            dokdo: 0.2,
            padding: '0.2 0.7 0.1 0.7',
        },
    ],
    body: {
        projection: 'mercator',
    },
    colorScale: {
        minColor: '#16294a',
        maxColor: '#7dd3fc',
        stepCount: 5,
        logBase: 10,
        barLength: 360,
        minValue: 19.5,
        maxValue: 25692,
        nullStep: { visible: true, color: '#4b5563', label: '자료 없음', gap: 14 },
    },
    series: [
        {
            name: '대한민국',
            map: '시도',
            dataUrl: '../data/kr-sido-population-density-2026-07.json',
            tooltipText: '<b>${name}</b><br>${value;;#,##0.#} 명/㎢<br>클릭하면 시군구 보기',
            style: { stroke: '#2b3a55', strokeWidth: 0.8 },
            hoverStyle: { stroke: '#e2e8f0', strokeWidth: 1.6 },
            pointLabel: { visible: true, effect: 'outline', hideOverlapped: true },
            drilldown: {
                scope: 'selected',
                transition: 'zoom',
                duration: 500,
                fillRatio: 0.85,
            },
            detail: {
                name: '시군구',
                map: '시군구',
                dataUrl: '../data/kr-sigun-population-density-2026-07.json',
                tooltipText: '<b>${name}</b><br>${value;;#,##0.#} 명/㎢',
                style: { stroke: '#2b3a55', strokeWidth: 0.8 },
                hoverStyle: { stroke: '#e2e8f0', strokeWidth: 1.6 },
                pointLabel: { visible: true, effect: 'outline', hideOverlapped: true },
                selectStyle: { stroke: '#fb923c', strokeWidth: 2.4 },
            },
        },
    ],
};

function onChartLoaded(mapChart) {
    const NATION_DENSITY = 531.8;
    const COMPARE_SERIES = '인구밀도 비교';
    const COMPARE_COLORS = { nation: '#64748b', sido: '#38bdf8', sigun: '#fb923c' };
    const COMPARE_SIDE = 110;
    const COMPARE_LABEL_GAP = 6;
    const COMPARE_ABOVE = 140;
    const COMPARE_BELOW = 125 + COMPARE_LABEL_GAP;

    let drilledSidoId;

    const formatDensity = function (value) {
        const density = isNaN(value) ? '--' : Math.round(value).toLocaleString('ko-KR');
        return density + ' 명/㎢';
    };

    const clearComparison = function (chart) {
        chart.removeSeries(COMPARE_SERIES);
        chart.selection.clear();
    };

    const calloutEndOf = function (chart, coord) {
        const container = document.getElementById('realmap');
        const width = container.clientWidth;
        const height = container.clientHeight;
        const onLeft = coord[0] < chart.pointToMap(width / 2, 0)[0];
        const topEnd = chart.pointToMap(onLeft ? COMPARE_SIDE : width - COMPARE_SIDE, COMPARE_ABOVE);
        const bottom = chart.pointToMap(0, height - COMPARE_BELOW)[1];
        const endLat = Math.min(Math.max(coord[1], bottom), topEnd[1]);
        return [topEnd[0], endLat];
    };

    const comparisonSeries = function (sigunName, sigunValue, sidoName, sidoValue, clickCoord, calloutEnd) {
        const ratio = isNaN(sigunValue)
            ? '자료 없음'
            : sidoName + '의 <t style="fill:#fdba74;font-weight:700;">' + (sigunValue / sidoValue).toFixed(1) + '배</t>';
        const swatch = (color) => '<t style="fill:' + color + ';">■</t>';

        return {
            type: 'bar',
            name: COMPARE_SERIES,
            width: 96,
            height: 90,
            barWidth: 0.62,
            categories: [
                { name: '전국', color: COMPARE_COLORS.nation },
                { name: sidoName, color: COMPARE_COLORS.sido },
                { name: sigunName, color: COMPARE_COLORS.sigun },
            ],
            style: { fillOpacity: 1, stroke: 'none' },
            baseLine: { style: { stroke: '#94a3b8', strokeWidth: 1 } },
            callout: {
                visible: true,
                usePointColor: false,
                style: {
                    stroke: '#f8fafc',
                    strokeWidth: 1.25,
                    filter: 'drop-shadow(0 0 1px rgba(2, 6, 23, 0.9)) drop-shadow(0 0 4px rgba(56, 189, 248, 0.75))',
                },
                anchorPoint: {
                    radius: 3.5,
                    style: {
                        fill: '#f8fafc',
                        filter: 'drop-shadow(0 0 1px rgba(2, 6, 23, 0.9)) drop-shadow(0 0 6px rgba(125, 211, 252, 1))',
                    },
                },
            },
            tooltipText: false,
            pointLabel: {
                visible: true,
                position: 'top',
                effect: 'outline',
                style: { fill: '#e2e8f0', fontSize: '13px' },
                text: '<b>' + sigunName + '</b><br>' + ratio,
            },
            subLabel: {
                visible: true,
                position: 'bottom',
                offset: COMPARE_LABEL_GAP,
                effect: 'outline',
                style: { fill: '#e2e8f0', fontSize: '11px', textAlign: 'left' },
                text: [
                    swatch(COMPARE_COLORS.nation) + ' 전국 ' + formatDensity(NATION_DENSITY),
                    swatch(COMPARE_COLORS.sido) + ' ' + sidoName + ' ' + formatDensity(sidoValue),
                    swatch(COMPARE_COLORS.sigun) + ' ' + sigunName + ' ' + formatDensity(sigunValue),
                ].join('<br>'),
            },
            data: [{ coord: clickCoord, value: [NATION_DENSITY, sidoValue, sigunValue], callout: [calloutEnd] }],
        };
    };

    const showComparison = function (chart, areaId, clickCoord) {
        const sigunSeries = chart.firstMapSeries;
        const sigun = sigunSeries.pointById(areaId);
        const sido = sigunSeries.parent.pointById(drilledSidoId);
        const sigunName = chart.map.areaOf(areaId).name;
        const sidoName = sigunSeries.parent.map.areaOf(drilledSidoId).name;

        clearComparison(chart);
        sigunSeries.select(sigun);
        chart.addSeries(comparisonSeries(sigunName, sigun.getValue(), sidoName, sido.getValue(), clickCoord, calloutEndOf(chart, clickCoord)));
    };

    const drillupToSido = function () {
        clearComparison(mapChart);
        mapChart.drillup();
    };

    window.interactiveDrilldown = {
        drillupToSido: drillupToSido,
        handleDrilldown: function (args) {
            drilledSidoId = args.area;
        },
        handleDrillup: function (args) {
            drilledSidoId = undefined;
            clearComparison(args.chart);
        },
        handleClick: function (args) {
            if (!drilledSidoId) return;
            if (args.area && args.chart.map.isChildArea(args.area, drilledSidoId)) {
                showComparison(args.chart, args.area, args.coord);
            }
        },
    };

    if (window.interactiveDrilldownKeydown) {
        document.removeEventListener('keydown', window.interactiveDrilldownKeydown);
    }
    window.interactiveDrilldownKeydown = function (e) {
        const target = e.target;
        if (target && (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
        if (e.key === 'Escape' && !mapChart.isDestroying()) drillupToSido();
    };
    document.addEventListener('keydown', window.interactiveDrilldownKeydown);
}

let mapChart;

const tool = {
    width: 1056,
    height: 720,
    actions: [
        {
            type: 'button',
            label: '시도로 돌아가기',
            action: () => window.interactiveDrilldown?.drillupToSido(),
        },
    ],
    events: {
        onChartLoaded,
    },
    options: {
        css: `
#realmap .rm-control {
    --rm-background: #0d1424;
}
#realmap .rm-root {
    --rm-text-fill: #e2e8f0;
    --rm-point-label-fill: #e2e8f0;
    --rm-tooltip-bg: #1e293b;
    --rm-tooltip-border-color: #334155;
    --rm-tooltip-color: #f1f5f9;
    --rm-drilldown-text-fill: #f1f5f9;
    --rm-drilldown-text-history-fill: #7dd3fc;
    --rm-drilldown-separator-fill: #64748b;
    --rm-color-scale-box-stroke: none;
    --rm-color-scale-split-stroke: #0d1424;
    --rm-color-scale-marker-fill: #e2e8f0;
    --rm-color-scale-tick-line-stroke: #334155;
    --rm-color-scale-tick-label-fill: #94a3b8;
    --rm-color-scale-null-box-stroke: #475569;
    --rm-map-series-inset-stroke: #334155;
}
#realmap .rm-drilldown-text,
#realmap .rm-drilldown-separator {
    font-size: 15px;
}
#realmap .rm-drilldown-text {
    font-weight: 700;
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
    tool.actions.forEach((action) => createButton(container, action.label, action.action));
}

async function init() {
    applyDemoCss();
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    onChartLoaded(mapChart);
    setActions('actions');
}
