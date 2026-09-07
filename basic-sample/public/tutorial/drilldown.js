const config = {
    title: false,
    credits: {visible: false},
    general: {
        clickAction: 'drilldown'
    },
    drilldownPanel: {
        // type: 'button'
    },
    map: [
        {
            name: '시도',
            // url: '../maps/geojson/kr-sido-low.geo.json',
            url: '../maps/topojson/kr-sido-low.topo.json',
            dokdo: 0.1,
            showDummies: true,
            // insets: [RealMap.preset('제주도')],
            insets: [RealMap.preset('울릉도'), RealMap.preset('제주도')],
            padding: '0.8, 0.1, 0.1, 0.1',
            // useOffset: true
        },
        {
            name: '시군구',
            url: '../maps/geojson/kr-sigun-low.geo.json',
            dokdo: 0,//0.1,
            showDummies: true,
            // insets: [RealMap.preset('제주도')],
            insets: [RealMap.preset('울릉도'), RealMap.preset('제주도')],
            padding: 0.1
        },
    ],
    axis: {
        crosshair: true,
        grid: {
            visible: true,
            line: { step: 1 }
        }
    },
    annotations: [
        {
            front: true,
            type: 'shape',
            shape: 'rectangle',
            offsetX: 20,
            offsetY: 20,
            width: 10,
            height: 28,
            style: {
                fill: '#83A8DC',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '시군구별 인구 밀도 - Drilldown',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    body: {
        projection: 'mercator',
        // projection: 'equalearth',
        style: {
            fill: '#0088ff04',
            padding: '0 0.1 0.1 0.1',
        }
        // onZoomChanged: (args) => {
        //     const sigunguMap = mapChart.seriesByName('시군구');
        //     const sidoMap = mapChart.seriesByName('시도');

        //     if (args.zoom > 200 && !sigunguMap.visible) {
        //         sidoMap.hide();
        //         sigunguMap.show();
        //     }
        //     else if (args.zoom <= 200 && sigunguMap.visible) {
        //         sigunguMap.hide();
        //         sidoMap.show();
        //     }
        // }
    },
    colorScale: {
        maxColor: '#e27486',
        stepCount: 6,
        steps: [
            { from: 0,    to: 50,    color: '#D5DEEF' },
            { from: 50,   to: 250,   color: '#B1C9EF' },
            { from: 250,  to: 500,   color: '#8AAEE0' },
            { from: 500,  to: 1000,  color: '#628ECB' },
            { from: 1000, to: 5000,  color: '#395886' },
            { from: 5000,            color: '#395886' },
        ],
    },
    // drilldownPanel: {
    //     type: 'button'
    // },
    series: [
        {
            name: '시도',
            map: '시도',
            dataUrl: '../data/kr-sido-population-density.json',
            tooltipText: [
                '<t style="font-size: 18px; font-weight: 700;">${name}</t>',
                '인구 밀도: <t style="font-weight: 700;">${value}</t>',
            ].join('<br />'),
            style: {
                stroke: '#fff',
                strokeWidth: 0.5,
            },
            hoverStyle: {
                stroke: '#6d6d6d'
            },
            detail: {
                name: '시군구',
                map: '시군구',
                dataUrl: '../data/kr-sigun-population-density.json',
                tooltipText: [
                    '<t style="font-size: 18px; font-weight: 700;">${sido} ${name}</t>',
                    '인구 밀도: <t style="font-weight: 700;">${value}</t>',
                ].join('<br />'),
                style: {
                    stroke: '#4f4f4f',
                    strokeWidth: 0.5,
                },
                onPointClick: args => {
                    mapChart.drillup(mapChart.series);
                },
                hoverStyle: {
                    stroke: '#6d6d6d'
                }
            }
        },
        // {
        //     name: '시군구',
        //     // map: '시군구',
        //     dataUrl: '../data/kr-sigun-population-density.json',
        //     tooltipText: [
        //         '<t style="font-size: 18px; font-weight: 700;">${sido} ${name}</t>',
        //         '인구 밀도: <t style="font-weight: 700;">${value}</t>',
        //     ].join('<br />'),
        //     hoverColor: '#777',
        //     style: {
        //         stroke: '#4f4f4f',
        //         strokeWidth: 0.5,
        //     },
        // },
    ],
};

let mapChart;

function setActions(container) {
    createButton(container, 'Drilldown', function (e) {
        mapChart.drilldown(mapChart.series);
    });
    createButton(container, 'Drillup', function (e) {
        mapChart.drillup(mapChart.series);
    });
    createCheckBox(
        container,
        'Zoomable',
        async function (e) {
            config.body.zoomable = _getChecked(e);
            await mapChart.loadAsync(config);
        },
        false
    );
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LOADED!')
    });

    setActions('actions');
}
