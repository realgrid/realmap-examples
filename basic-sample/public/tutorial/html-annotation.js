const config = {
        title: { visible: false },
        map: [
            {
                url: '../maps/geojson/continent-low.geo.json',
            }
        ],
        body: {
            projection: 'mercator',
            zoom: 480,
            panX: 30,
            panY: -5,
            movable: false,
            style: {
                fill: '#4f4f4f',
            },
        },
        annotation: [
            {
                name: 'memo',
                front: true,
                type: 'html',
                offsetX: 30,
                offsetY: 300,
                html: '#template2',
            },
            {
                name: 'intro',
                front: true,
                type: 'html',
                width: 810,
                height: 710,
                offsetX: 0,
                offsetY: 0,
                html: '#template1',
            },
        ],
        series: [
            {
                nullStyle: {
                    fill: '#d1d1d1',
                    stroke: '#2b2b2b',
                },
            },
            {
                type: 'point',
                radius: 10,
                style: {
                    strokeWidth: '2',
                    stroke: '#2b2b2b',
                },
                pointLabel: {
                    position: 'right',
                    offset: 8,
                    effect: 'background',
                    backgroundStyle: {
                        padding: '5',
                        strokeWidth: '3',
                        stroke: '#3d3d3d',
                        fill: '#4f4f4f'
                    },
                    style: {
                        stroke: 'white',
                        fill: 'white',
                        fontWeight: '400',
                    },
                },
                data: [
                    {
                        name: '아르디피테쿠스 라미두스',
                        coord: [39.26, 6.5],
                        color: '#bb5502',
                    },
                    {
                        name: '사헬란트로푸스 차덴시스',
                        coord: [16.64, 14.76],
                        color: '#008000',
                    },
                    {
                        name: '오로린 투게넨시스',
                        coord: [35.84, -3.5],
                        color: '#c20e43',
                    },
                    {
                        name: '오스트랄로피테쿠스 아나멘시스',
                        coord: [35.84, 2],
                        color: '#ff5757',
                    },
                    {
                        name: '오스트랄로피테쿠스 아파렌시스',
                        coord: [41, 11.32],
                        color: '#78a9e2',
                    },
                ],
            },
        ],
    };

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
