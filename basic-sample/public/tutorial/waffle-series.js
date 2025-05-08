const config = {
    templates: {
        '@series': {
            map: {
                hoverColor: '#F1F0E9',
                pointLabel: false,
                allAreas: false,
                style: {
                    stroke: '#fff',
                    strokeWidth: 0.7
                },
                tooltipText: '${name}<br />${qty} 지점',
            },
        },
    },
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sido-low.geo.json', 
            padding: '0.8 0 0.2 0',
            dokdo: 0.1
        },
    ],

    body: {
        projection: 'mercator',
    },
    legend: false,
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
                fill: '#4D8771',
            },
        },
        {
            front: true,
            type: 'text',
            text: '2019년 전국 서점 수 통계',
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
            name: '행정구역경계(시도)',
            tooltipText: '${name}<br/>${qty}',
            mapKeys: ['b-code', 'id'],
            dataUrl: '../data/kr-bookstore.json',
            pointColors: (args) => {
                const ratio = args.source.ratio;
                
                if (ratio < -0.5) return '#E4EFE7';
                if (ratio < 0) return '#FFF5E4';
                if (ratio < 10) return '#C1D8C3';
                return '#C1D8C3';
            },
        },
        {
            type: 'waffle',
            name: '전국 서점 수',
            fillDirection: 'row',
            fillThreshold: 6,
            pointLabel: {
                text: '${name}<br><t style="opacity:0.7">${qty}</t>',
            },
            color: '#4D8771',
            tooltipText: false,
            mapKeys: ['b-code', 'id'],
            dataUrl: '../data/kr-bookstore.json',
            valueField: 'qty',
            callout: true,
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
