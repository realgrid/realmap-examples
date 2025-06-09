const config = {
    title: false,
    map: [
        {
            url: '../maps/geojson/world-low.geo.json',
        },
    ],
    
    axis: {
        grid: true,
    },
    body: {
        zoomable: true,
        projection: '',
        // projection: 'mercator',
        // projection: 'equalearth',
        // projection: 'miller',
        // projection: 'orthographic',
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
                fill: '#8ABABA',
            },
        },
        {
            front: true,
            type: 'text',
            text: '도법 동적 변경',
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
            useMapData: true,
            style: { 
                stroke: '#fff',
                fill: '#C7D9DD',
                strokeWidth: 0.7,
            },
            hoverColor: '#8ABABA',
            pointLabel: false,
        },
    ],
};

function setActions(container) {
    createButton(container, '도법 미지정', async function (e) {
        chart.body.updateOption('projection', '');
    });

    createButton(container, '메르카토르', async function (e) {
        chart.body.updateOption('projection', 'mercator');
    });

    createButton(container, 'EqualEarth', async function (e) {
        chart.body.updateOption('projection', 'equalearth');
    });

    createButton(container, '밀러', async function (e) {
        chart.body.updateOption('projection', 'miller');
    });

    createButton(container, '직교투영', async function (e) {
        chart.body.updateOption('projection', 'orthographic');
    });
}

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
    
    setActions('actions');
}
