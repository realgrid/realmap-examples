const config = {
    title: false,
    map: [
        {
            url: `https://cdn.realmap.co.kr/v1/maps/geojson/world-low.geo.json`,
            // url: `https://cdn.realmap.co.kr/v1/maps/geojson/kr-sido-low.geo.json`,
            // url: `https://cdn.realmap.co.kr/v1/maps/geojson/kr-sigun-low.geo.json`,
            // url: `https://cdn.realmap.co.kr/v1/maps/geojson/usa-state-low.geo.json`,
        },
    ],
    body: {
        projection: 'mercator',
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
            text: '기본 지도들',
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
                fill: 'var(--area-color-1)',
                stroke: '#fff',
                strokeWidth: 0.7,
            },
            hoverColor: '#83A8DC',
            tooltipText: '<t style="font-weight: bold;">${name}(${rm-id})</t>',
        },
    ],
    exporting: {
        visible: true
    }
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
