const config = {
    title: false,
    credits: false,
    legend: { visible: false },
    zoomPanel: { visible: false },
    exporting: { visible: false },
    general: {
        clickAction: 'select',
        onSelectionChanged: () => window.worldHeritageAtlas?.handleSelectionChanged(),
    },
    tooltip: {
        nanText: '--',
    },
    map: [
        {
            url: '../maps/geojson/world-high.geo.json',
            exclude: ['ATA'],
        },
    ],
    body: {
        projection: 'orthographic',
        rotationX: -20,
        rotationY: -25,
        zoom: 100,
        mapBackground: { globeFill: '#e9edf3', globeGradient: false },
    },
    axis: { grid: false },
    colorScale: {
        visible: true,
        location: 'right',
        verticalAlign: 'bottom',
        offsetY: 24,
        offsetX: 16,
        barWidth: 14,
        barLength: 170,
        minColor: '#e3e6ee',
        steps: [
            { from: 0, to: 3, color: '#d4d9e5' },
            { from: 3, to: 10, color: '#a9b3cb' },
            { from: 10, to: 20, color: '#7684a8' },
            { from: 20, to: 40, color: '#465582' },
            { from: 40, color: '#252f52' },
        ],
        title: { text: '세계유산 수' },
    },
    annotations: [
        {
            name: 'head',
            type: 'html',
            front: true,
            align: 'left',
            verticalAlign: 'top',
            offsetX: 16,
            offsetY: 16,
            width: 300,
            height: 92,
            html: '<div class="wh-head"></div>',
        },
        {
            name: 'card',
            type: 'html',
            front: true,
            align: 'left',
            verticalAlign: 'bottom',
            offsetX: 16,
            offsetY: 16,
            width: 300,
            height: 132,
            html: '<div class="wh-card"></div>',
        },
    ],
    series: [
        {
            name: 'heritage',
            type: 'map',
            dataUrl: '../data/world-heritage-sites.json',
            allAreas: true,
            nullStyle: { fill: '#ffffff', stroke: '#d5dae3', strokeWidth: 0.5 },
            style: { stroke: '#ffffff', strokeWidth: 0.6 },
            hoverStyle: { stroke: '#ffffff', strokeWidth: 1.6 },
            tooltipText: '<b>${name}</b><br>${value} 곳',
            pointLabel: false,
            selection: {
                visible: true,
                zoomToSelected: true,
                style: { stroke: '#ffffff', strokeWidth: 2 },
                unselectedStyle: { opacity: 0.32 },
                focus: false,
            },
        },
    ],
};

function onChartLoaded(mapChart) {
    const Q = String.fromCharCode(34);
    const CONTINENTS = {
        Asia: '아시아',
        Europe: '유럽',
        Africa: '아프리카',
        'North America': '북아메리카',
        'South America': '남아메리카',
        Oceania: '오세아니아',
    };
    const picked = [];
    let rows = [];

    const areaOf = function (id) {
        return mapChart.getMap(0).areaOf(id);
    };

    const rowsOf = function () {
        if (rows.length === 0) {
            rows = mapChart.seriesByName('heritage').getPoints()
                .filter(function (p) { return !p.isNull; })
                .map(function (p) { return { id: p.id, value: p.value }; });
        }
        return rows;
    };

    const rowOf = function (id) {
        return rowsOf().find(function (row) { return String(row.id) === String(id); });
    };

    const focusRow = function () {
        const focus = mapChart.selection.focusedPoint;

        return focus ? rowOf(focus.id) : null;
    };

    const rankOf = function (row) {
        return rowsOf().filter(function (other) { return other.value > row.value; }).length + 1;
    };

    const headHtml = function () {
        const shown = picked.length > 0
            ? picked.map(function (name) { return CONTINENTS[name]; }).join(', ')
            : '전체 대륙';

        return '<div class=' + Q + 'wh-head' + Q + '>'
            + '<div class=' + Q + 'wh-kicker' + Q + '>WORLD HERITAGE ATLAS</div>'
            + '<div class=' + Q + 'wh-title' + Q + '>세계유산 아틀라스</div>'
            + '<div class=' + Q + 'wh-sub' + Q + '>보는 중 · ' + shown + '</div></div>';
    };

    const cardHtml = function () {
        const row = focusRow();

        if (!row) {
            return '<div class=' + Q + 'wh-card wh-card-empty' + Q + '>'
                + '<div class=' + Q + 'wh-hint' + Q + '>국가를 클릭하면 그 국가로 확대합니다.</div>'
                + '<div class=' + Q + 'wh-hint' + Q + '>대륙 체크박스로 보이는 영역을 고를 수도 있습니다.</div></div>';
        }

        const area = areaOf(row.id);
        const width = Math.round(row.value / 60 * 100);

        return '<div class=' + Q + 'wh-card' + Q + '>'
            + '<div class=' + Q + 'wh-card-name' + Q + '>' + area.name + '</div>'
            + '<div class=' + Q + 'wh-card-meta' + Q + '>' + CONTINENTS[area.source.props.continent] + ' · ' + rankOf(row) + '위 / ' + rowsOf().length + '개국</div>'
            + '<div class=' + Q + 'wh-card-value' + Q + '>' + row.value + '<small> 곳</small></div>'
            + '<div class=' + Q + 'wh-bar' + Q + '><i style=' + Q + 'width:' + Math.min(100, width) + '%' + Q + '></i></div></div>';
    };

    const render = function () {
        mapChart.getAnnotation('head').updateOption('html', headHtml());
        mapChart.getAnnotation('card').updateOption('html', cardHtml());
    };

    const handleSelectionChanged = function () {
        render();
    };

    const syncChecks = function () {
        const labels = Array.from(document.querySelectorAll('label'));

        Object.keys(CONTINENTS).forEach(function (name) {
            const label = labels.find(function (el) { return el.textContent === CONTINENTS[name]; });

            if (label && label.control) {
                label.control.checked = picked.indexOf(name) >= 0;
            }
        });
    };

    const setContinent = function (name, on) {
        const rest = picked.filter(function (n) { return n !== name; });
        const next = on ? rest.concat(name) : rest;
        const filter = next.length > 0 ? { continent: next } : null;

        if (mapChart.setAreaFilter(filter)) {
            picked.splice(0, picked.length, ...next);
            render();
        }
        syncChecks();
    };

    const clearFilter = function () {
        if (mapChart.setAreaFilter(null)) {
            picked.splice(0, picked.length);
            render();
        }
        syncChecks();
    };

    window.worldHeritageAtlas = { render, handleSelectionChanged, setContinent, clearFilter };
    render();
}

let mapChart;

const tool = {
    width: 1056,
    height: 720,
    actions: [
        { type: 'check', label: '아시아', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('Asia', value) },
        { type: 'check', label: '유럽', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('Europe', value) },
        { type: 'check', label: '아프리카', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('Africa', value) },
        { type: 'check', label: '북아메리카', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('North America', value) },
        { type: 'check', label: '남아메리카', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('South America', value) },
        { type: 'check', label: '오세아니아', value: false, action: ({ value }) => window.worldHeritageAtlas?.setContinent('Oceania', value) },
        { type: 'button', label: '전체 보기', action: () => window.worldHeritageAtlas?.clearFilter() },
    ],
    events: {
        onChartLoaded,
    },
    options: {
        css: `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@600;700&display=swap');
#realmap .rm-control {
    --rm-background: #f6f7f9;
}
#realmap .rm-root {
    font-family: 'IBM Plex Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    --rm-text-fill: #1c2230;
    --rm-tooltip-bg: #ffffff;
    --rm-tooltip-border-color: #e3e6ec;
    --rm-tooltip-color: #1c2230;
    --rm-color-scale-box-stroke: none;
    --rm-color-scale-split-stroke: #f6f7f9;
    --rm-color-scale-marker-fill: #1c2230;
    --rm-color-scale-tick-line-stroke: #d5dae3;
    --rm-color-scale-tick-label-fill: #5b6475;
    --rm-color-scale-null-box-stroke: #d5dae3;
}
#realmap .wh-head,
#realmap .wh-card {
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
    color: #1c2230;
}
#realmap .wh-head {
    padding: 4px 0 0 4px;
}
#realmap .wh-kicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: #5b6475;
}
#realmap .wh-title {
    font-family: 'Noto Serif KR', 'AppleMyungjo', serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin: 6px 0 6px;
}
#realmap .wh-sub {
    font-size: 12px;
    color: #5b6475;
}
#realmap .wh-card {
    height: 132px;
    padding: 14px 18px;
    background: #ffffff;
    border: 1px solid #e3e6ec;
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(28, 34, 48, 0.08);
}
#realmap .wh-card-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.7);
}
#realmap .wh-hint {
    font-size: 12px;
    line-height: 1.6;
    color: #5b6475;
}
#realmap .wh-card-name {
    font-family: 'Noto Serif KR', 'AppleMyungjo', serif;
    font-size: 20px;
    font-weight: 700;
}
#realmap .wh-card-meta {
    font-size: 12px;
    color: #5b6475;
    margin: 2px 0 8px;
}
#realmap .wh-card-value {
    font-size: 26px;
    font-weight: 600;
    color: #252f52;
    font-variant-numeric: tabular-nums;
}
#realmap .wh-card-value small {
    font-size: 12px;
    font-weight: 500;
    color: #5b6475;
}
#realmap .wh-bar {
    height: 4px;
    margin-top: 8px;
    border-radius: 2px;
    background: #e9edf3;
    overflow: hidden;
}
#realmap .wh-bar i {
    display: block;
    height: 100%;
    background: #e8590c;
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
    tool.actions.forEach((action) => {
        if (action.type === 'check') {
            createCheckBox(container, action.label, (e) => action.action({ value: e.target.checked }), action.value);
        } else {
            createButton(container, action.label, action.action);
        }
    });
}

async function init() {
    applyDemoCss();
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    onChartLoaded(mapChart);
    setActions('actions');
}
