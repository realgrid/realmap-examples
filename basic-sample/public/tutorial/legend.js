const config = {
    title: false,
    credits: {visible: false},
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
                fill: 'rgba(255,85,85,1)',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '세계 인구 밀도',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    map: [
        { 
            url: '../maps/geojson/world-low.geo.json',
        }
    ],
    axis: {
        grid: true,
    },
    body: {
        projection: 'equalearth',
        // padding: '0 30'
    },
    legend: {
        location: 'left',
        visible: true,   
    },
    colorScale: {
        location: 'bottom',
        // series: 'main',
        display: 'legend',
        // minValue: 1,
        // maxValue: 100000,
        logBase: 10,
        maxColor: '#f00',
        colors: [{
            stop: 0.5,
            color: '#f00'
        }, {
            stop: 1,
            color: '#00f'
        }],
        tick: {
            label: {
                numberFormat: ',0',
                style: {
                    fontSize: '0.9em',
                    // fontWeight: 'bold',
                    // fontFamily: 'Courier New',
                    // fill: '#558'
                }
            }
        },
        // integralSteps: true,
        stepCount: 3,
        steps: [{
            to: 2,
            fromColor: '0%',
            color: '33%',
            label: 'Green'
        }, {
            from: 2,
            to: 4,
            color: '67%',
            label: 'Blue'
        }, {
            to: 5,
            color: '100%',
            label: 'Red'
        }],
    },
    series: [{
        name: 'main',
        idField: 'code3',
        dataUrl: '../data/world-population-density.json',
        // color: 'blue',
        pointLabel: !true,
        // data: [{
        //     id: 'KR',
        //     name: 'Korea',
        //     value: 123
        // }, {
        //     id: 'CN',
        //     value: 532
        // }, {
        //     id: 'BR',
        //     value: 235
        // }]
    }]
};

let mapChart;

function setActions(container) {
    createCheckBox(container, 'graticules', function (e) {
        mapChart.series.toggleOption('visible');
    }, true);
    createCheckBox(container, 'antarctica', function (e) {
        mapChart.map.hiddenAreas = _getChecked(e) ? null : ['ATA'];//['AQ'];
    }, true);
}

async function init() {
    const t1 = +new Date();
    console.log((+new Date() - t1) + ' ms.');
    console.log('RealMap v' + RealMap.getVersion());
    // RealMap.setDebugging(true);
    RealMap.setLogging(true);

    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LoADED!')
    });
    setActions('actions');
}
