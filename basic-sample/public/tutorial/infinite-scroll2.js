
const config = {
    chart: {
        backgroundStyle: {
            // backgroundColor: '#F2F1EF',
        },
    },
    body: {
        projection: 'equalearth',
        // projection: 'mercator',
        zoomable: true,
        scrollable: true,
        // scroll: 160,
    },
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sido-low.geo.json',
            url: '../map/wooritech/v1/maps/geojson/usa-state-low.geo.json',
            // exclude: ['AK', 'HI'],
            insets: [
                // RealMap.preset('alaska'),
                RealMap.preset('hawaii'),
            ],
            offset: true,
        }
    ],
    
    axis: {
        crosshair: true,
        grid: {
            visible: true,
            fitTo: 'body',
        },
        guide: [
            {
            type: 'range',
            from: [124.60, 38.65], 
            to: [131.87, 33.10],
            style: { stroke: '#333', strokeWidth: '2px', fill: '#00008810' },
            label: {
                text: 'Korea',
            }
        }, 
        {
            type: 'range',
            from: [-125.00, 49.38], 
            to: [-66.94, 24.52],
            style: { stroke: '#333', strokeWidth: '2px', fill: '#00008810' },
            label: {
                text: 'USA',
            }
        }]
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
            // scope: 'body',
            type: 'text',
            text: '좌우 방향 무한스크롤(wrap-around)',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    series: [{
        pointLabel: {
            visible: true,
            effect: 'outline'
        },
        data: [{
            id: 'KOR',
            value: 123
        }, {
            id: 'CHN',
            value: 532
        }, {
            id: 'BRA',
            value: 235
        }],
        backgroundStyle: {
            backgroundColor: 'red',
        }
    }]
};

let chart;

function setActions(container) {
    createButton(container, 'Test', function (e) {
        chart.title.updateOption('text', new Date().getTime().toString())
    });
    createCheckBox(
        container,
        'Zoomable',
        async function (e) {
            config.body.zoomable = _getChecked(e);
            await chart.loadAsync(config);
        },
        false
    );
    createButton(container, 'Scroll---', function (e) {
        chart.body.scroll -= 60;
        chart.title.updateOption('text', chart.body.scroll);
    });
    createButton(container, 'Scroll--', function (e) {
        chart.body.scroll -= 10;
        chart.title.updateOption('text', chart.body.scroll);
    });
    createButton(container, 'Scroll-', function (e) {
        chart.body.scroll -= 1;
        chart.title.updateOption('text', chart.body.scroll);
    });
    createButton(container, 'Scroll+', function (e) {
        chart.body.scroll += 1;
        chart.title.updateOption('text', chart.body.scroll);
    });
    createButton(container, 'Scroll++', function (e) {
        chart.body.scroll += 10;
        chart.title.updateOption('text', chart.body.scroll);
    });
    createButton(container, 'Scroll+++', function (e) {
        chart.body.scroll += 60;
        chart.title.updateOption('text', chart.body.scroll);
    });

    createButton(container, 'zoom 200', function (e) {
        chart.body.zoom = 200;
    });
    createButton(container, 'zoom to Korea', function (e) {
        // chart.body.zoomTo(300, [128.235, 35.875]);
        chart.body.zoomToBounds([124.60, 38.65], [131.87, 33.10]);
    });
    createButton(container, 'zoom to USA', function (e) {
        chart.body.zoomToBounds([-125.00, 49.38],[-66.94, 24.52]);
    });
}



const tool = {
    description: [
        '- Scroll은 Zoom & Panning과 다른 개념으로 마치 구(Globe) 지도를 표현하듯 연속적 스크롤이 가능하도록 합니다.',
        '- Scroll 기능은 기본으로 비활성화되어 있습니다.'
    ]
}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LoADED!')
    });

    setActions('actions');
}
