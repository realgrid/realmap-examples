const config = {
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sigun-low.geo.json',
            padding: '0.8 0 0 0'
        },
    ],
    body: {
        projection: 'mercator',
        zoom: 235,
        panY: 0.8,
        panX: -0.3,
        zoomable: false
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
            text: '산업단지 가동률',
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
            type: 'map',
            nullStyle: {
                fill: '#E0EBF9',
                stroke: '#fff'
            },
            style: {
                stroke: '#9dafb0',
            },
        },
        {
            type: 'gauge',
            pointLabel: {
                visible: true,
                offset: 5,
                style: {
                    textShadow: '0px 0px 5px white',
                },
            },
            face: {
                visible: true,
                style: {
                    fill: '#fff',
                    opacity: 0.7,
                },
            },
            gaugeLabel: {
                numberFormat: '#0',
                suffix: '%',
                style: {
                    fontSize: '10pt',
                },
            },
            radius: 32,
            innerRadius: 18,
            style: {
                stroke: 'none',
            },
            styleCallback: (ctx) => {
                const value = +ctx.source.value;
                if (value >= 80) {
                    return { 
                        fill: '#8EC1C2' };
                } else if (value >= 70) {
                    return { fill: '#FFD79C' };
                } else {
                    return { fill: '#F87986' };
                }
            },
            maxValue: 100,
            zoomLevel: 250,
            dataUrl: '../data/산업단지가동률-남부.json',
            tooltipText: '<b>${name}</b>: ${value}',
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
