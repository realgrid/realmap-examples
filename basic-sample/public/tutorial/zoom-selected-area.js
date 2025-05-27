
const config = {
    title: false,
    map: [
        { url: '../realmap/maps/geojson/kr-sigun-low.geo.json'},
    ],
    
    body: {
        projection: 'mercator',
        zoomable: true,
        onClickArea: (e) => {
            const areaId = e.area.id;

            if (chart.body.zoom > 100) {
                chart.body.zoomTo(100, [127.7, 36.6]);
            } else {
                chart.body.zoomToArea(areaId);
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
            text: '선택한 지역 확대',
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
            pointLabel: false,
            useMapData: true,
            style: { 
                fill: '#B4CBEF',
                stroke: '#fff',
                strokeWidth: 0.5,
            },
            hoverColor: '#83A8DC',
            onPointClick: (e) => {
                if (chart.body.zoom === 800) {
                    chart.body.zoomTo(100, e.series.getCenter(e.id));
                } else {
                    chart.body.zoomTo(800, e.series.getCenter(e.id));
                }
                
            }
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
