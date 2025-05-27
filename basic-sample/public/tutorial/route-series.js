const config = {
    title: false,
    map: [
        { url: '../realmap/maps/geojson/world-low.geo.json', exclude: ["ATA"] },
    ],
    
    body: {
        projection: 'mercator',
        zoom: 1400,
        panX: 143,
        panY: 12,
        style: {
            fill: '#0088ff20'
        }
    },
    legend: true,
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
            text: '장보고 무역항로',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    series: [
        {
            visibleInLegend: false,
            tooltipText: false,
            useMapData: true,
            hoverColor: '#83A8DC',
            style: {
                fill: '#B4CBEF',
                stroke: '#fff'
            }
        },
        {
            type: "route",
            name: '무역 항로',
            tooltipText: false,
            color: '#E9715C',
            data: [
                {
                    name: '완도 - 다자이후', 
                    coords: [ [127.32717, 34.47240], [130.05,33.6] ]
                },
                {
                    name: '완도 - 닝보', 
                    coords: [ [127.32717, 34.47240], [121.9,29.8] ]
                },
                {
                    name: '완도 - 초주, 연수(연운항, 롄윈강)', 
                    coords: [ [127.32717, 34.47240], [120.4,34.2] ]
                },
                {
                    name: '완도 - 적산포(웨이하이, 법화원)', 
                    coords: [ [127.32717, 34.47240], [122.2,37.3] ]
                },
            ]
        },
        {
            type: "point",
            visibleInLegend: false,
            name: '항구',
            tooltipText: false,
            radius: 8,
            style: {
                stroke: '#E9715C',
                strokeWidth: '4px',
                fill: 'white',
            },
            pointLabel: {
                text: '<t style="font-size: 20px;">${id}</t><br /><t style="opacity: 0.7">${subId}</t>'
            },
            data: [
                {
                    id: '완도',
                    subId: '청해진',
                    coord: [127.32717, 34.47240]
                },
                {
                    id: '다자이후',
                    subId: '',
                    coord: [130.22348,33.45332]
                },
                {
                    id: '닝보',
                    subId: '',
                    coord: [121.72229,29.64522]
                },
                {
                    id: '초주, 연수',
                    subId: '(연운항, 롄윈강)',
                    coord: [120.22050,34.20422]
                },
                {
                    id: '적산포',
                    subId: '(웨이하이, 법화원)',
                    coord: [121.99046,37.31507]
                },
            ]
        },
        {
            type: "point",
            visibleInLegend: false,
            name: '국가',
            tooltipText: false,
            radius: 0,
            style: {
                stroke: 'transparent',
                strokeWidth: '0px',
            },
            pointLabel: {
                text: '<t style="font-size: 20px; opacity: 0.5">${id}</t>'
            },
            data: [
                {
                    id: '당',
                    coord: [118.53099,31.79063]
                },
                {
                    id: '신라',
                    coord: [127.97080,36.45690]
                },
                {
                    id: '왜',
                    coord: [130.82,32.38062]
                },
                {
                    id: '거란',
                    coord: [117.75327,40.96227]
                },
                {
                    id: '발해',
                    coord: [126.33492,42.51769]
                },
            ]
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
