const config = {
    templates: {
        '@series': {
            map: {
                hoverColor: '#d9dcd6',
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
            url: '../maps/geojson/kr-sido-low.geo.json',
            padding: '0.8 0 0.3 0'
        },
    ],
    body: {
        projection: 'mercator',
        zoomable: true,
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
                fill: '#35A1BD',
            },
        },
        {
            front: true,
            // scope: 'body',
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
                
                if (ratio < -0.5) return '#DCEEF3';
                if (ratio < 0) return '#C2E2EA';
                if (ratio < 10) return '#A7D5E1';
                return '#8DC8D8';
            },
        },
        {
            type: 'bar',
            name: '전국 서점 수',
            width: 40,
            pointLabel: {
                text: '${name}<br><t style="opacity:0.7">${qty}</t>',
            },
            width: '25',
            color: '#35A1BD',
            tooltipText: false,
            mapKeys: ['b-code', 'id'],
            dataUrl: '../data/kr-bookstore.json',
            valueField: 'qty',
            style: {
                opacity: 1
            }
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
