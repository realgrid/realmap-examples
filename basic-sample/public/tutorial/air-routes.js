/**
* @demo
*
*/
const config = {
    title: false,
    annotations: [
        {
            front: true,
            verticalAlign: 'bottom',
            align: 'right',
            type: 'shape',
            shape: 'rectangle',
            offsetX: 280,
            offsetY: 30,
            width: 10,
            height: 28,
            style: {
                fill: '#FF6B6B',
            },
        },
        {
            verticalAlign: 'bottom',
            align: 'right',
            front: true,
            type: 'text',
            text: '이스타항공, 유플라이 인터라인',
            offsetX: 20,
            offsetY: 30,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
                fill: '#333'
            },
        },
    ],
    map: [
        {
        url: '../map/wooritech/v1/maps/geojson/world-high.geo.json'
        }
    ],
    axis: {
        grid: true,
    },
    body: {
        projection: 'orthographic',
        zoom: 280,
        zoomable: true,
        rotationX: -120,
        rotationY: -30,
        color: '#fff'
    },
    tooltip: '<b>${name}</b>',
    series: [{
        nullStyle: { fill: '#4285f4', opacity: 0.9, stroke: '#fff' },
    }, {
        type: 'point',
        visibleInLegend: false,
        pointLabel: {
            visible: true,
            effect: 'outline'
        },
        style: { fill: '#FFD700', stroke: '#fff' },
        data: [
            { "name": "쿤밍", "coord": [102.8329, 24.8801] },
            { "name": "치앙마이", "coord": [98.9817, 18.7061] },
            { "name": "방콕", "coord": [100.5018, 13.7563] },
            { "name": "하노이", "coord": [105.8544, 21.0285] },
            { "name": "다낭", "coord": [108.2022, 16.0471] },
            { "name": "나트랑", "coord": [109.1967, 12.2388] },
            { "name": "호치민", "coord": [106.6297, 10.8231] },
            // { "name": "송샨", "coord": [121.5525, 25.0694] },
            { "name": "타오위안", "coord": [121.2168, 25.0128] },
            // { "name": "오키나와", "coord": [127.6809, 26.2124] },
            { "name": "후쿠오카", "coord": [130.4017, 33.5904] },
            { "name": "오사카", "coord": [135.5022, 34.6937] },
            { "name": "도쿄", "coord": [139.6917, 35.6895] },
            { "name": "옌지", "coord": [129.5089, 42.8995] },
            { "name": "치토세", "coord": [141.6811, 42.8228] }
          ]
    }, {
        type: 'point',
        visibleInLegend: false,
        pointLabel: {
            visible: true,
            effect: 'outline'
        },
        shape: 'circle',
        style: { fill: '#FF6B6B', stroke: '#fff' },
        data: [
            // { "name": "김포", "coord": [126.7831, 37.5583] },
            { "name": "인천", "coord": [126.7052, 37.4563] },
            // { "name": "청주", "coord": [127.4956, 36.6372] },
            // { "name": "군산", "coord": [126.7160, 35.9676] },
            { "name": "부산", "coord": [129.0756, 35.1796] },
            { "name": "제주", "coord": [126.5312, 33.4996] },
            { "name": "홍콩", "coord": [114.1694, 22.3193] }
        ],
    }, {
        type: 'route',
        visibleInLegend: false,
        style: {
            fill: '#FFD700',
            stroke: '#FFD700', 
            strokeWidth: '2px', 
            strokeDasharray: '3 3',
        },
        styleCallback: ({source}) => {
            if (source.departure == '인천') {
                return {
                    fill: '#FF6B6B',
                    stroke: '#FF6B6B',
                }
            }
        },
        data: [
            {
              "name": "홍콩 - 쿤밍",
              "coords": [[114.1694, 22.3193], [102.8329, 24.8801]]
            },
            {
              "name": "홍콩 - 치앙마이",
              "coords": [[114.1694, 22.3193], [98.9817, 18.7061]]
            },
            {
              "name": "홍콩 - 나트랑",
              "coords": [[114.1694, 22.3193], [109.1967, 12.2388]]
            },
            {
              "name": "인천 - 홍콩",
              "departure": "인천",
              "coords": [[126.7052, 37.4563], [114.1694, 22.3193]]
            },
            {
              "name": "인천 - 후쿠오카",
              "departure": "인천",
              "coords": [[126.7052, 37.4563], [130.4017, 33.5904]]
            },
            {
              "name": "인천 - 오사카",
              "departure": "인천",
              "coords": [[126.7052, 37.4563], [135.5022, 34.6937]]
            },
            {
              "name": "인천 - 도쿄",
              "departure": "인천",
              "coords": [[126.7052, 37.4563], [139.6917, 35.6895]]
            },
            {
              "name": "후쿠오카 - 홍콩",
              "coords": [[130.4017, 33.5904], [114.1694, 22.3193]]
            },
            {
              "name": "오사카 - 홍콩",
              "coords": [[135.5022, 34.6937], [114.1694, 22.3193]]
            },
            {
              "name": "도쿄 - 홍콩",
              "coords": [[139.6917, 35.6895], [114.1694, 22.3193]]
            }
        ]
    }]
};



const tool = {
    description: [
        '- orthographic 투영을 사용한 route series 예제입니다.'
    ]
}

let chart;

function setActions(container) {
    createCheckBox(
        container,
        'Debug',
        function (e) {
            RealMap.setDebugging(_getChecked(e));
            chart.render();
        },
        false
    );
    createButton(container, 'Test', function (e) {
    });
    createCheckBox(container, 'graticules', function (e) {
        chart.series.toggleOption('visible');
    }, false);
    createCheckBox(container, 'latExtent', function (e) {
        chart.series.updateOption('latExtent', _getChecked(e) ? 80 : undefined);
    }, false);
}

async function init() {
    const t1 = +new Date();
    console.log((+new Date() - t1) + ' ms.');

    console.log('RealMap v' + RealMap.getVersion());
    // RealMap.setDebugging(true);
    RealMap.setLogging(true);

    chart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LoADED!')
    });
    setActions('actions');
}
