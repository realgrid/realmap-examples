const config = {
    title: false,
    credits: false,
    legend: { visible: false },
    general: {
        clickAction: 'select',
        onSelectionChanged: () => window.sidoCompare?.handleSelectionChanged(),
        onFocusChanged: (args) => window.sidoCompare?.handleFocusChanged(args),
    },
    tooltip: {
        nanText: '--',
    },
    map: [
        {
            name: '시도',
            url: '../maps/geojson/kr-sido-mid.geo.json',
            padding: '0.05 0.9 0.05 0.1',
        },
    ],
    body: {
        projection: 'mercator',
    },
    colorScale: {
        minColor: '#dbeafe',
        maxColor: '#60a5fa',
        stepCount: 5,
        location: 'left',
        title: { text: '주민등록 인구' },
    },
    annotations: [
        {
            name: 'panel',
            type: 'html',
            front: true,
            align: 'right',
            verticalAlign: 'top',
            offsetX: 16,
            offsetY: 16,
            width: '34%',
            height: 680,
            html: '<div class="sc-panel"></div>',
        },
    ],
    series: [
        {
            name: '시도',
            map: '시도',
            dataUrl: '../data/kr-sido-indicators.json',
            valueField: 'population',
            style: { stroke: '#ffffff', strokeWidth: 1 },
            hoverStyle: { stroke: '#1e3a8a', strokeWidth: 1.6 },
            tooltipText: '<b>${name}</b><br>${value;;#,##0}',
            pointLabel: {
                visible: true,
                effect: 'outline',
                hideOverlapped: true,
                style: { fill: '#1e293b', fontSize: '11px' },
            },
            selection: {
                visible: true,
                style: { stroke: '#1d4ed8', strokeWidth: 1.6 },
                unselectedStyle: { opacity: 0.35 },
                focus: { style: { stroke: '#d97706', strokeWidth: 2.6 } },
            },
        },
    ],
};

async function onChartLoaded(mapChart) {
    const SERIES = '시도';
    const PANEL = 'panel';
    const INDICATORS = {
        population: { label: '주민등록 인구', unit: '명', asOf: '2026.07', format: 'int' },
        agedRatio: { label: '65세 이상 인구 비율', unit: '', asOf: '2026.05', format: 'pct' },
        grdpPerCapita: { label: '1인당 지역내총생산', unit: '만원', asOf: '2024 잠정', format: 'int' },
        grdp: { label: '지역내총생산', unit: '조원', asOf: '2024 잠정', format: 'one' },
    };
    const REGIONS = {
        수도권: ['11', '23', '31'],
        영남권: ['21', '22', '26', '37', '38'],
        호남권: ['24', '35', '36'],
        충청권: ['25', '29', '33', '34'],
    };
    const Q = String.fromCharCode(34);
    let indicator = 'population';
    let rows = [];

    const formatValue = function (value, format) {
        if (value === undefined || value === null || isNaN(value)) {
            return '--';
        }
        if (format === 'pct') {
            return value.toFixed(1) + '%';
        }
        if (format === 'one') {
            return value.toFixed(1);
        }
        return Math.round(value).toLocaleString('ko-KR');
    };

    const rowOf = function (id) {
        return rows.find(function (row) { return String(row.id) === String(id); });
    };

    const series = function () {
        return mapChart.seriesByName(SERIES);
    };

    const selectedRows = function () {
        const selection = mapChart.selection;
        const list = [];

        for (let i = 0; i < selection.count; i++) {
            const row = rowOf(selection.get(i).id);
            row && list.push(row);
        }
        return list;
    };

    const nationValue = function (key) {
        const total = rows.reduce(function (sum, row) { return sum + row.population; }, 0);

        if (key === 'population' || key === 'grdp') {
            return rows.reduce(function (sum, row) { return sum + row[key]; }, 0);
        }
        return rows.reduce(function (sum, row) { return sum + row[key] * row.population; }, 0) / total;
    };

    const indicatorRow = function (row, key, isMain) {
        const meta = INDICATORS[key];
        const cls = isMain ? 'sc-row sc-row-main' : 'sc-row';

        return '<div class=' + Q + cls + Q + '><span class=' + Q + 'sc-row-label' + Q + '>' + meta.label + '</span>'
            + '<span class=' + Q + 'sc-row-value' + Q + '>' + formatValue(row[key], meta.format) + '<small>' + meta.unit + '</small></span></div>';
    };

    const cardOf = function (row, order, isFocus) {
        const cls = isFocus ? 'sc-card sc-card-focus' : 'sc-card';
        const badge = isFocus ? '<span class=' + Q + 'sc-badge' + Q + '>FOCUS</span>' : '';
        const detail = isFocus
            ? Object.keys(INDICATORS).filter(function (key) { return key !== indicator; })
                .map(function (key) { return indicatorRow(row, key, false); }).join('')
            : '';

        return '<div class=' + Q + cls + Q + ' data-id=' + Q + row.id + Q + '>'
            + '<div class=' + Q + 'sc-card-head' + Q + '><span class=' + Q + 'sc-order' + Q + '>' + order + '</span>'
            + '<span class=' + Q + 'sc-card-name' + Q + '>' + row.name + '</span><span class=' + Q + 'sc-region' + Q + '>' + row.region + '</span>' + badge + '</div>'
            + indicatorRow(row, indicator, true) + detail + '</div>';
    };

    const renderPanel = function () {
        const meta = INDICATORS[indicator];
        const selected = selectedRows();
        const focus = mapChart.selection.focusedPoint;
        let body;

        if (selected.length === 0) {
            body = '<div class=' + Q + 'sc-empty' + Q + '>'
                + '<div class=' + Q + 'sc-empty-title' + Q + '>시도를 클릭해 비교를 시작하세요</div>'
                + '<div class=' + Q + 'sc-empty-text' + Q + '>Shift 클릭으로 여러 시도를 누적 선택하고, 선택된 시도를 Shift 클릭하면 해제됩니다. 마지막에 선택한 시도가 focus가 되어 상세 지표가 펼쳐집니다.</div>'
                + '</div>';
        } else {
            body = selected.map(function (row, i) {
                return cardOf(row, i + 1, focus && String(focus.id) === String(row.id));
            }).reverse().join('');
        }

        const html = '<div class=' + Q + 'sc-panel' + Q + '>'
            + '<div class=' + Q + 'sc-head' + Q + '><div class=' + Q + 'sc-title' + Q + '>시도 지표 비교</div>'
            + '<div class=' + Q + 'sc-sub' + Q + '>' + meta.label + ' · ' + meta.asOf + '</div></div>'
            + '<div class=' + Q + 'sc-nation' + Q + '><span class=' + Q + 'sc-row-label' + Q + '>전국</span>'
            + '<span class=' + Q + 'sc-row-value' + Q + '>' + formatValue(nationValue(indicator), meta.format) + '<small>' + meta.unit + '</small></span></div>'
            + '<div class=' + Q + 'sc-count' + Q + '>선택 ' + selected.length + '개</div>'
            + '<div class=' + Q + 'sc-cards' + Q + '>' + body + '</div>'
            + '</div>';

        mapChart.getAnnotation(PANEL).updateOption('html', html);
    };

    const handleSelectionChanged = function () {
        renderPanel();
    };

    const handleFocusChanged = function (args) {
        renderPanel();
    };

    const setIndicator = function (key) {
        const meta = INDICATORS[key];
        const selectedIds = selectedRows().map(function (row) { return row.id; });
        const numberFormat = meta.format === 'int' ? '#,##0' : '#,##0.0';

        indicator = key;
        mapChart.selection.clear();
        series().updateOptions({
            valueField: key,
            data: rows,
            tooltipText: '<b>${name}</b><br>${value;;' + numberFormat + '} ' + meta.unit,
        });
        mapChart.colorScale.updateOptions({ title: { text: meta.label } });
        if (selectedIds.length > 0) {
            mapChart.selection.addPoints({ 시도: selectedIds });
        }
        renderPanel();
    };

    const selectRegion = function (name) {
        mapChart.selection.addPoints({ 시도: REGIONS[name] });
    };

    const clearSelection = function () {
        mapChart.selection.clear();
    };

    const setFocusVisible = function (visible) {
        series().selection.focus.updateOption('visible', visible);
    };

    rows = await fetch('../data/kr-sido-indicators.json').then(function (res) { return res.json(); });
    if (mapChart.isDestroying()) {
        return;
    }
    window.sidoCompare = { handleSelectionChanged, handleFocusChanged, setIndicator, selectRegion, clearSelection, setFocusVisible, renderPanel };
    renderPanel();
}

let mapChart;

const tool = {
    width: 1056,
    height: 720,
    actions: [
        {
            type: 'select',
            label: '지표',
            value: 'population',
            data: ['population', 'agedRatio', 'grdpPerCapita', 'grdp'],
            labels: ['주민등록 인구', '65세 이상 인구 비율', '1인당 지역내총생산', '지역내총생산'],
            action: ({ value }) => window.sidoCompare?.setIndicator(value),
        },
        { type: 'button', label: '수도권 선택', action: () => window.sidoCompare?.selectRegion('수도권') },
        { type: 'button', label: '영남권 선택', action: () => window.sidoCompare?.selectRegion('영남권') },
        { type: 'button', label: '호남권 선택', action: () => window.sidoCompare?.selectRegion('호남권') },
        { type: 'button', label: '충청권 선택', action: () => window.sidoCompare?.selectRegion('충청권') },
        { type: 'button', label: '전체 해제', action: () => window.sidoCompare?.clearSelection() },
        {
            type: 'check',
            label: 'focus 표시',
            value: true,
            action: ({ value }) => window.sidoCompare?.setFocusVisible(value),
        },
    ],
    events: {
        onChartLoaded,
    },
    options: {
        css: `
#realmap .rm-control {
    --rm-background: #f8fafc;
}
#realmap .rm-root {
    --rm-text-fill: #1e293b;
    --rm-point-label-fill: #1e293b;
    --rm-tooltip-bg: #ffffff;
    --rm-tooltip-border-color: #cbd5e1;
    --rm-tooltip-color: #1e293b;
    --rm-color-scale-box-stroke: none;
    --rm-color-scale-split-stroke: #f8fafc;
    --rm-color-scale-marker-fill: #1e293b;
    --rm-color-scale-tick-line-stroke: #cbd5e1;
    --rm-color-scale-tick-label-fill: #475569;
    --rm-color-scale-null-box-stroke: #cbd5e1;
    --rm-map-series-inset-stroke: #cbd5e1;
    --rm-map-series-selected-filter: none;
}
#realmap .sc-panel {
    font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: #1e293b;
    background: #ffffff;
    border: 1px solid #dbeafe;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(30, 58, 138, 0.08);
    padding: 16px 16px 12px;
    box-sizing: border-box;
    width: 100%;
    height: 680px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
#realmap .sc-title {
    font-size: 16px;
    font-weight: 700;
    color: #1e3a8a;
    letter-spacing: -0.01em;
}
#realmap .sc-sub {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
}
#realmap .sc-nation {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 8px 12px;
    border-radius: 8px;
    background: #eff6ff;
    font-size: 12px;
}
#realmap .sc-count {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
}
#realmap .sc-cards {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    min-height: 0;
}
#realmap .sc-empty {
    padding: 20px 12px;
    border: 1px dashed #bfdbfe;
    border-radius: 10px;
    background: #f8fafc;
    text-align: center;
}
#realmap .sc-empty-title {
    font-size: 13px;
    font-weight: 600;
    color: #1e3a8a;
    margin-bottom: 6px;
}
#realmap .sc-empty-text {
    font-size: 11px;
    line-height: 1.5;
    color: #64748b;
}
#realmap .sc-card {
    border: 1px solid #e2e8f0;
    border-left: 4px solid #1d4ed8;
    border-radius: 8px;
    padding: 8px 12px;
    background: #ffffff;
}
#realmap .sc-card-focus {
    border-color: #fcd34d;
    border-left-color: #d97706;
    background: #fffbeb;
}
#realmap .sc-card-head {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    font-size: 13px;
}
#realmap .sc-order {
    font-size: 10px;
    color: #94a3b8;
    font-variant-numeric: tabular-nums;
    min-width: 14px;
}
#realmap .sc-card-name {
    font-weight: 600;
    color: #0f172a;
}
#realmap .sc-region {
    font-size: 10px;
    color: #64748b;
}
#realmap .sc-badge {
    margin-left: auto;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #ffffff;
    background: #d97706;
    border-radius: 4px;
    padding: 2px 6px;
}
#realmap .sc-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 11px;
    color: #334155;
    padding: 1px 0;
}
#realmap .sc-row-main {
    font-size: 12px;
    color: #0f172a;
}
#realmap .sc-row-label {
    color: #64748b;
}
#realmap .sc-row-value {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}
#realmap .sc-row-value small {
    font-size: 10px;
    font-weight: 400;
    color: #64748b;
    margin-left: 3px;
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
        if (action.type === 'button') {
            createButton(container, action.label, action.action);
        } else if (action.type === 'select') {
            createListBox(container, action.label, action.data, (e) => action.action({ value: e.target.value }), action.value);
        } else if (action.type === 'check') {
            createCheckBox(container, action.label, (e) => action.action({ value: e.target.checked }), action.value);
        }
    });
}

async function init() {
    applyDemoCss();
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    onChartLoaded(mapChart);
    setActions('actions');
}
