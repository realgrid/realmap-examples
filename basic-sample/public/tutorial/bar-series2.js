const data = [
    { "name": "NORTH AMERICA", "coord": [-100.0, 45.0], "value": [19, 40, 41] },
    { "name": "EUROPE", "coord": [10.0, 55.0], "value": [29, 35, 36] },
    { "name": "ASIA / ASIA-PACIFIC", "coord": [100.0, 40.0], "value": [30, 19, 51] },
    { "name": "LATIN AMERICA", "coord": [-60.0, -15.0], "value": [15, 47, 38] },
    { "name": "MIDDLE EAST / AFRICA", "coord": [30.0, -5.0], "value": [21, 35, 44] }
]

const config = {
    title: false,
    map: [
        {
            url: '../realmap/maps/geojson/world-low.geo.json',
            exclude: ['ATA'],
            padding: '40 0 0 0'
        },
    ],
    body: {
        projection: 'miller',
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
                fill: '#333',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '마인크래프트 지역별 플랫폼 점유율',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
        {
            front: true,
            type: 'image',
            height: 180,
            verticalAlign: 'bottom',
            offsetX: 50,
            offsetY: 120,
            imageUrl: '../images/minecraft/alex.png',
        }
    ],
    legend: {
        location: 'body',
        offsetY: 100,
        align: 'center'
    },
    series: [
        {
            name: 'World',
            tooltipText: false,
            nullStyle: {
                fill: '#ddd',
                stroke: '#ddd'
            }
        },
        {
            type: 'bar',
            width: 50,
            height: 120,
            barWidth: 0.9,
            categories: [
                { name: 'PC/Java Version', color: '#A4C76C' },
                { name: 'Console', color: '#F7CB55' },
                { name: 'Pocket Edition', color: '#A77C57' }  
            ],
            legendByCategory: true,
            pointLabel: {
                text: '${name}<br><t style="opacity:0.7">🖥️ ${value.0}%</t> <t style="opacity:0.7">🎮 ${value.1}%</t> <t style="opacity:0.7">📱 ${value.2}%</t>',
            },
            tooltipText: false,
            data,
            style: {
                opacity: 1,
                stroke: 'none'
            }
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
