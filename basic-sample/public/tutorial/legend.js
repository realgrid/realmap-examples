const config = {
    title: false,
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
                fill: 'rgba(255,85,85,1)',
            },
        },
        {
            front: true,
            type: 'text',
            text: '세계 인구 밀도',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    map: [
        { 
            url: '../maps/geojson/world-low.geo.json',
        }
    ],
    axis: {
        grid: true,
    },
    body: {
        projection: 'equalearth',
    },
    legend: {
        location: 'left',
        visible: true,   
    },
    colorScale: {
        location: 'bottom',
        display: 'legend',
        logBase: 2,
        maxColor: '#f00',
        colors: [{
            stop: 0.5,
            color: '#f00'
        }, {
            stop: 1,
            color: '#00f'
        }],
        tick: {
            label: {
                numberFormat: ',0',
                style: {
                    fontSize: '0.9em',
                }
            }
        },
        stepCount: 3,
        steps: [{
            to: 100,
            fromColor: '0%',
            color: '33%',
            label: 'Green'
        }, {
            from: 100,
            to: 20000,
            color: '67%',
            label: 'Blue'
        }, {
            to: 30000,
            color: '100%',
            label: 'Red'
        }],
    },
    series: [{
        name: 'main',
        idField: 'code3',
        dataUrl: '../data/world-population-density.json',
    }]
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
