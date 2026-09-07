const config = {
    title: {
        text: 'RealMap Theme',
        align: 'left',
    },
    subtitle: {
        text: 'general.theme 옵션으로 전체 스타일을 변경합니다. (지역 클릭→드릴다운, 마우스 이동→크로스헤어/툴팁, 범례 클릭→숨김)',
        align: 'left',
    },
    credits: {
        text: 'RealMap Theme Demo',
        visible: true,
    },
    general: {
        clickAction: 'drilldown',
    },
    drilldownPanel: true,
    map: [{
        name: '시도',
        url: '../maps/topojson/kr-sido-low.topo.json',
        showDummies: true,
        insets: [RealMap.preset('울릉도'), RealMap.preset('제주도')],
        padding: '0.75, 0.1, 0.1, 0.1',
    }, {
        name: '시군구',
        url: '../maps/geojson/kr-sigun-low.geo.json',
        showDummies: true,
        insets: [RealMap.preset('울릉도'), RealMap.preset('제주도')],
        padding: 0.1,
    }],
    axis: {
        crosshair: true,
        grid: {
            visible: true,
            line: { step: 1 },
        },
        tick: {
            visible: true,
        },
        guide: [{
            type: 'line',
            axis: 'lat',
            position: 38,
            label: { text: '38°N' },
        }, {
            type: 'line',
            axis: 'lon',
            position: 127,
            label: { text: '127°E' },
        }],
    },
    body: {
        projection: 'mercator',
        zoomable: true,
    },
    tooltip: '${name}<br/>인구밀도: ${value}',
    zoomPanel: {
        verticalAlign: 'bottom',
    },
    legend: {
        location: 'left',
        visible: true,
        footer: {
            text: '범례 footer',
        },
    },
    colorScale: {
        location: 'bottom',
        display: 'legend',
        maxColor: '#e27486',
        stepCount: 5,
        nullStep: {
            visible: true,
            label: 'No Data',
        },
        footer: {
            text: '색상자 footer',
        },
        tick: {
            label: {
                numberFormat: ',0',
            },
        },
    },
    bubbleScale: {
        location: 'right',
        steps: [500, 2000, 5000],
        footer: {
            text: '버블스케일 footer',
        },
        tick: {
            label: {
                numberFormat: ',0',
            },
        },
    },
    series: [{
        name: '시도 인구밀도',
        map: '시도',
        dataUrl: '../data/kr-sido-population-density.json',
        tooltipText: '${name}<br/>인구밀도: ${value}',
        pointLabel: {
            text: '${name}',
            visible: true,
        },
        style: {
            stroke: '#fff',
            strokeWidth: 0.5,
        },
        detail: {
            name: '시군구',
            map: '시군구',
            dataUrl: '../data/kr-sigun-population-density.json',
            tooltipText: '${sido} ${name}<br/>인구밀도: ${value}',
        },
    }, {
        type: 'bubble',
        name: '경제활동인구',
        mapKeys: ['b-code', 'b-code'],
        valueField: 'laborForce',
        dataUrl: '../data/sido-labor-force.json',
        minSize: 22,
        pointLabel: {
            text: '${laborForce;;#,0}',
            visible: true,
        },
        style: {
            fill: '#FFDB9A',
            stroke: '#FFAB70',
            strokeWidth: 1.5,
        },
    }],
};

let mapChart;

function setActions(container) {
    createListBox(container, 'general.theme', ['', 'dark', 'real'], function (e) {
        const theme = _getValue(e);
        if (!config.general) {
            config.general = {};
        }
        config.general.theme = theme;
        mapChart.updateOptions({ general: { theme } });
    }, '');
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LOADED!');
    });
    setActions('actions');
}
