const config = {
    title: false,
    credits: {visible: false},
    map: [
        { url: '../maps/geojson/kr-sigun-low.geo.json'},
    ],

    body: {
        projection: 'mercator',
        zoomable: true,
        onClickArea: (e) => {
            const areaId = e.area.id;

            if (mapChart.body.zoom > 100) {
                mapChart.body.zoomTo(100, [127.7, 36.6]);
            } else {
                mapChart.body.zoomToArea(areaId);
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
                if (mapChart.body.zoom === 800) {
                    mapChart.body.zoomTo(100, e.series.getCenter(e.id));
                } else {
                    mapChart.body.zoomTo(800, e.series.getCenter(e.id));
                }
            }
        }
    ],
};

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(
        document,
        'realmap',
        config,
        true,
    );
}
