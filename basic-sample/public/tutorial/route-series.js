const config = {
    title: false,
    credits: {visible: false},
    map: [
        { url: '../maps/geojson/world-low.geo.json', exclude: ["ATA"] },
    ],
    
    body: {
        projection: 'mercator',
        zoom: 1500,
        panX: 143,
        panY: 20,
        style: {
            fill: '#0088ff20'
        }
    },
    legend: true,
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
            // scope: 'body',
            type: 'text',
            text: '장보고 무역항로',
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
            legend: -1,
            tooltipText: false,
            useMapData: true,
            hoverColor: '#83A8DC',
            style: {
                fill: '#B4CBEF',
                stroke: '#fff'
            }
        },
        {
            type: "route",
            name: '무역 항로',
            tooltipText: false,
            color: '#E9715C',
            routeMode: 'chart',
            arrowWidth: 10,
            arrowLength: 20,
            lineWidth: 10,
            data: [
                {
                    name: '완도 - 다자이후', 
                    coords: [ [127.32717, 34.47240], [130.05,33.6] ],
                    curveFactor: 0.3
                },
                {
                    name: '완도 - 닝보', 
                    coords: [ [127.32717, 34.47240], [121.9,29.8] ],
                    curveFactor: 1.5
                },
                {
                    name: '완도 - 초주, 연수(연운항, 롄윈강)', 
                    coords: [ [127.32717, 34.47240], [120.4,34.2] ],
                    curveFactor: -0.2
                },
                {
                    name: '완도 - 적산포(웨이하이, 법화원)', 
                    coords: [ [127.32717, 34.47240], [122.2,37.3] ],
                    curveFactor: -1.5
                },
            ]
        },
        {
            type: "point",
            legend: -1,
            name: '항구',
            tooltipText: false,
            radius: 8,
            style: {
                stroke: '#E9715C',
                strokeWidth: '4px',
                fill: 'white',
            },
            pointLabel: {
                text: '<t style="font-size: 20px;">${id}</t><br /><t style="opacity: 0.7">${subId}</t>',
                positionCallback: ({point}) => {
                    const id = point.source.id;
                    
                    switch(id) {
                        case '완도':
                            return 'top';
                        case '다자이후':
                            return 'bottom';
                        case '닝보':
                            return 'bottom';
                        default: 
                            return 'left';
                    }
                },
            },
            data: [
                {
                    id: '완도',
                    subId: '청해진',
                    coord: [127.32717, 34.47240]
                },
                {
                    id: '다자이후',
                    subId: '',
                    coord: [130.22348,33.45332]
                },
                {
                    id: '닝보',
                    subId: '',
                    coord: [121.72229,29.64522]
                },
                {
                    id: '초주, 연수',
                    subId: '(연운항, 롄윈강)',
                    coord: [120.22050,34.20422]
                },
                {
                    id: '적산포',
                    subId: '(웨이하이, 법화원)',
                    coord: [121.99046,37.31507],
                },
            ]
        },
        {
            type: "point",
            legend: -1,
            name: '국가',
            tooltipText: false,
            radius: 0,
            style: {
                stroke: 'transparent',
                strokeWidth: '0px',
            },
            pointLabel: {
                text: '<t style="font-size: 20px; opacity: 0.5">${id}</t>'
            },
            data: [
                {
                    id: '당',
                    coord: [118.53099,31.79063]
                },
                {
                    id: '신라',
                    coord: [127.97080,36.45690]
                },
                {
                    id: '왜',
                    coord: [130.82,32.38062]
                },
                {
                    id: '거란',
                    coord: [117.75327,40.96227]
                },
                {
                    id: '발해',
                    coord: [126.33492,42.51769]
                },
            ]
        }
    ],
};

let mapChart;

function setActions(container) {
    createCheckBox(
        container,
        'Zoomable',
        async function (e) {
            config.body.zoomable = _getChecked(e);
            await mapChart.loadAsync(config);
        },
        false
    );

    createListBox(
        container,
        'arrowDisplay',
        ['none', 'always', 'moving'],
        async function (e) {
            const isChecked = _getValue(e);
            
            config.series[1].arrowDisplay = isChecked;

            mapChart.loadAsync(config, true);
        },
        'always'
    );
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    setActions('actions');
}
