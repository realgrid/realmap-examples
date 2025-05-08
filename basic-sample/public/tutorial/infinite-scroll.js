
const config = {
    body: {
        projection: 'equalearth',
        zoomable: true,
        scrollable: true,
        scroll: 160,
    },
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
        }
    ],
    
    axis: {
        grid: true,
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
            type: 'text',
            text: '좌우 방향 무한스크롤(wrap-around)',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    series: [{
        pointLabel: {
            visible: true,
            effect: 'outline'
        },
        data: [{
            id: 'KOR',
            value: 123
        }, {
            id: 'CHN',
            value: 532
        }, {
            id: 'BRA',
            value: 235
        }]
    }]
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
