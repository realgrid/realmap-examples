
const config = {
    title: {
        text: '시군구별 인구 밀도',
        align: 'left',
        style: {
            fontSize: '15pt',
            fontWeight: 700,
        },
    },
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sigun-low.geo.json',
        },
    ],
    body: {
        projection: 'mercator',
        zoomable: true,
    },
    colorScale: {
        location: 'right',
        steps: [
            { from: 0,    to: 50,    color: '#d5deef' },
            { from: 50,   to: 250,   color: '#b1c9ef' },
            { from: 250,  to: 500,   color: '#8aaee0' },
            { from: 500,  to: 1000,  color: '#628ecb' },
            { from: 1000, to: 5000,  color: '#395886' },
            { from: 5000,            color: '#395886' },
        ],
    },
    series: [
        {
            name: '지도',
            dataUrl: '../data/kr-sigun-population-density.json',
            tooltipText: [
                '<t style="font-size: 18px; font-weight: 700;">${sido} ${name}</t>',
                '인구 밀도: <t style="font-weight: 700;">${value}</t>',
            ].join('<br />'),
            hoverColor: '#FBDEB5',
            style: {
                stroke: '#fff',
                strokeWidth: 0.5,
            },
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
