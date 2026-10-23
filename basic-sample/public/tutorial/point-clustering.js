const config = {
    title: false,
    credits: { visible: false },
    map: [
        {
            url: '../maps/geojson/world-high.geo.json',
            exclude: ['ATA'],
        },
    ],
    body: {
        projection: 'equalearth',
        zoomable: true,
        scrollable: false,
        scroll: 150,
        mapBackground: {
            visible: true,
            style: {
                fill: '#F4F4F5',
            },
        },
        style: {
            fill: '#FFFFFF',
        },
    },
    axis: {
        grid: {
            visible: true,
            line: {
                step: 30,
                style: {
                    stroke: '#E4E4E7',
                    strokeWidth: 0.6,
                },
            },
        },
    },
    legend: {
        visible: false,
    },
    zoomPanel: {
        align: 'right',
        verticalAlign: 'bottom',
    },
    annotations: [
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:15pt;font-weight:bold;fill:#0F172A">세계 규모 6.7 이상 지진</t><br><t style="font-size:10pt;fill:#64748B">2000–2025 · 출처 USGS</t>',
            offsetX: 12,
            offsetY: 12,
            backgroundStyle: {
                fill: '#FFFFFF',
                fillOpacity: 0.92,
                stroke: '#E4E4E7',
                rx: 8,
                padding: '10 16 10 28',
            },
        },
        {
            front: true,
            type: 'shape',
            shape: 'rectangle',
            offsetX: 24,
            offsetY: 22,
            width: 6,
            height: 40,
            style: {
                fill: '#1E40AF',
                rx: 2,
            },
        },
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:8pt;fill:#64748B">총 지진</t><br><t style="font-size:16pt;font-weight:bold;fill:#0F172A">760</t>',
            offsetX: 250,
            offsetY: 12,
            backgroundStyle: {
                fill: '#FFFFFF',
                fillOpacity: 0.92,
                stroke: '#E4E4E7',
                rx: 8,
                padding: '10 16 10 16',
            },
        },
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:8pt;fill:#64748B">규모 7 이상</t><br><t style="font-size:16pt;font-weight:bold;fill:#1D4ED8">387</t>',
            offsetX: 337,
            offsetY: 12,
            backgroundStyle: {
                fill: '#FFFFFF',
                fillOpacity: 0.92,
                stroke: '#E4E4E7',
                rx: 8,
                padding: '10 16 10 16',
            },
        },
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:8pt;fill:#64748B">최대 규모</t><br><t style="font-size:16pt;font-weight:bold;fill:#1E3A8A">9.1</t>',
            offsetX: 425,
            offsetY: 12,
            backgroundStyle: {
                fill: '#FFFFFF',
                fillOpacity: 0.92,
                stroke: '#E4E4E7',
                rx: 8,
                padding: '10 16 10 16',
            },
        },
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:9pt;font-weight:bold;fill:#0F172A">규모</t>  <t style="fill:#60A5FA;font-size:12pt">●</t><t style="font-size:9pt;fill:#475569"> 6.7–7  </t><t style="fill:#2563EB;font-size:12pt">●</t><t style="font-size:9pt;fill:#475569"> 7–8  </t><t style="fill:#1E3A8A;font-size:12pt">●</t><t style="font-size:9pt;fill:#475569"> 8 이상  </t><t style="fill:#B45309;font-size:12pt">○</t><t style="font-size:9pt;fill:#475569"> 8.8 이상 대지진</t><br><t style="font-size:9pt;fill:#64748B">배지 숫자는 묶인 지진 수 · 클릭하면 나뉩니다</t>',
            align: 'left',
            verticalAlign: 'bottom',
            offsetX: 12,
            offsetY: 12,
            backgroundStyle: {
                fill: '#FFFFFF',
                fillOpacity: 0.92,
                stroke: '#E4E4E7',
                rx: 8,
                padding: '8 12 8 12',
            },
        },
    ],
    series: [
        {
            name: '지도',
            useMapData: true,
            hoverColor: '#D4D4D8',
            tooltipText: '${name}',
            style: {
                fill: '#E4E4E7',
                stroke: '#FFFFFF',
                strokeWidth: 0.6,
            },
        },
        {
            type: 'point',
            name: '지진',
            dataUrl: '../data/world-earthquake-m65.json',
            radius: 6,
            tooltipText: '<b>${place}</b><br/>규모 ${mag} · 깊이 ${depth}km · ${date}',
            pointLabel: {
                visible: false,
            },
            style: {
                stroke: '#FFFFFF',
                strokeWidth: 1.5,
            },
            pointColors: (args) => {
                const mag = args.source.mag;
                if (mag >= 8) return '#1E3A8A';
                if (mag >= 7) return '#2563EB';
                return '#60A5FA';
            },
            cluster: {
                visible: true,
                distance: 40,
                minDensity: 2,
                zoomLimit: 5000,
                ranges: [
                    { to: 5, radius: 13, color: '#2563EB' },
                    { to: 15, radius: 16, color: '#1D4ED8' },
                    { to: 40, radius: 19, color: '#1E40AF' },
                    { to: 100, radius: 22, color: '#1E3A8A' },
                    { radius: 26, color: '#172554' },
                ],
            },
        },
        {
            type: 'point',
            name: '대지진',
            shape: 'circle',
            radius: 6,
            tooltipText: '<b>${place}</b><br/>규모 ${mag} · ${date}',
            style: {
                fill: '#FFFFFF',
                stroke: '#B45309',
                strokeWidth: 3,
            },
            pointLabel: {
                visible: true,
                offset: 4,
                effect: 'outline',
                positionCallback: (args) => args.point.source.labelPosition,
                style: {
                    fontSize: '9pt',
                    fontWeight: 700,
                    fill: '#78350F',
                },
            },
            data: [
                { name: '2004 수마트라 M9.1', coord: [95.982, 3.295], place: '2004 Sumatra - Andaman Islands Earthquake', mag: 9.1, date: '2004-12-26', labelPosition: 'left' },
                { name: '2011 동일본 M9.1', coord: [142.373, 38.297], place: '2011 Great Tohoku Earthquake, Japan', mag: 9.1, date: '2011-03-11', labelPosition: 'right' },
                { name: '2010 칠레 M8.8', coord: [-72.898, -36.122], place: '2010 Maule, Chile Earthquake', mag: 8.8, date: '2010-02-27', labelPosition: 'bottom' },
                { name: '2025 캄차카 M8.8', coord: [160.239, 52.495], place: '2025 Kamchatka Peninsula, Russia Earthquake', mag: 8.8, date: '2025-07-29', labelPosition: 'left' },
            ],
        },
    ],
};

let mapChart;

const tool = {
    height: 600,
    options: {
        css: `
#realmap .rm-root {
    --rm-button-background-fill: #1E40AF;
}
`,
    },
};

function applyDemoCss() {
    const style = document.createElement('style');
    style.textContent = tool.options.css;
    document.head.appendChild(style);
}

function addDebugActions() {
    const status = document.createElement('span');
    const show = () => {
        status.textContent = ' scrollable: ' + !!mapChart.body.isScrollable() + ' · scroll: ' + Math.round(mapChart.body.scroll);
    };

    createButton('actions', '스크롤 토글', () => {
        mapChart.updateOptions({ body: { scrollable: !mapChart.body.isScrollable() } });
        setTimeout(show, 50);
    });
    document.getElementById('actions').appendChild(status);
    show();
}

async function init() {
    applyDemoCss();
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    addDebugActions();
}
