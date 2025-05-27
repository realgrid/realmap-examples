
const config = {
    title: false,
    map: [
        { url: '../realmap/maps/geojson/world-low.geo.json', exclude: ['ATA'] },
    ],
    
    axis: {
        grid: true,
    },
    body: {
        projection: 'equalearth',
        zoomable: true,
        zoom: 300,
        onClickArea: (e) => {
            const areaId = e.area.id;
            if (chart.body.zoom > 100) {
                chart.body.zoomTo(100, [127.7, 36.6]);
            } else {
                chart.body.zoomToArea(areaId, 0.7);
            }
            
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
            type: 'text',
            text: '지도 확대 및 이동',
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
                fill: '#B4CBEF',
                strokeWidth: 0.6,
            },
            hoverColor: '#83A8DC',
            pointLabel: false,
        }
    ],
};



function setActions(container) {
    createButton(container, 'LEFT', async function (e) {
        chart.body.updateOption('panX', chart.body.panX - 5);
    });

    createButton(container, 'RIGHT', async function (e) {
        chart.body.updateOption('panX', chart.body.panX + 5);
    });

    createButton(container, 'UP', async function (e) {
        chart.body.updateOption('panY', chart.body.panY - 5);
    });

    createButton(container, 'DOWN', async function (e) {
        chart.body.updateOption('panY', chart.body.panY + 5);
    });

    createButton(container, 'ZOOM_IN', async function (e) {
        chart.body.updateOption('zoom', chart.body.zoom + 5);
    });

    createButton(container, 'ZOOM_OUT', async function (e) {
        chart.body.updateOption('zoom', chart.body.zoom - 5);
    });
}

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);

    setActions('actions');
}
