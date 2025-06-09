const config = {
    title: false,
    map: [
        {
            url: '../maps/geojson/kr-sido-low.geo.json',
            url_1: '../maps/geojson/kr-sido-low.geo.json',
            url_2: '../maps/geojson/kr-sigun-low.geo.json',
            padding: 0.1,
            showDummies: true,
            insets: [],
            insets_1: [RealMap.preset('제주도')],
            insets_2: [RealMap.preset('울릉도')],
        },
    ],
    axis: {
        grid: {
            visible: true,
            fitTo: 'body',
            line: {
                step: 1
            }
        }
    },
    body: {
        zoomable: true,
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
                fill: '#6989AF',
            },
        },
        {
            front: true,
            type: 'text',
            text: '한국 지도 - 독도 & Insets',
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
        pointLabel: false,
        hoverColor: '#9DB2CD',
        nullHovering: true,
        nullStyle: {
            fill: '#D2DEEC',
            stroke: '#fff',
            strokeWidth: 0.5,
        },
        style: {
            stroke: 'none',
            fill: '#6989AF'
        },
        mapKeys: [ 'name', 'name' ],
        data: [
            { name: '제주특별자치도' },
            { name: '경상북도' },
        ]
    },],
};

let chart;
let 제주;
let 울릉;
let 백령;

function setActions(container) {
    createCheckBox(
        container,
        '시군구',
        async function (e) {
            config.map[0].source = undefined; // 이전 loadAsync에서 설정함.
            config.map[0].url = _getChecked(e)
                ? config.map[0].url_2
                : config.map[0].url_1;
            await chart.loadAsync(config);
        },
        false
    );
    createListBox(
        container,
        '독도 표시',
        ['undefined', 1, 0.5, 0.2, 0.1, 0.05, 0],
        async function (e) {
            config.map[0].source = undefined; // 이전 loadAsync에서 설정함.
            config.map[0].dokdo = +_getValue(e);
            await chart.loadAsync(config);
        },
        ''
    );
    createListBox(
        container,
        '제주도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            const map = config.map[0];

            switch (_getValue(e)) {
                case 'frame':
                    map.insets = [RealMap.preset('제주도')];
                    제주 = 'frame';
                    break;
                case 'border':
                    map.insets = [
                        RealMap.preset('제주도', {
                            frame: undefined
                        }),
                    ];
                    제주 = 'border';
                    break;
                default:
                    map.insets = [];
                    제주 = undefined;
                    break;
            }
            울릉 &&
                map.insets.push(
                    RealMap.preset(
                        '울릉도',
                        울릉 === 'border' ? { frame: undefined } : undefined
                    )
                );
            백령 &&
                map.insets.push(
                    RealMap.preset(
                        '백령도',
                        백령 === 'border' ? { frame: undefined } : undefined
                    )
                );

            map.source = undefined; // 이전 loadAsync에서 설정함.
            await chart.loadAsync(config);
        },
        ''
    );
    createListBox(
        container,
        '울릉도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            const map = config.map[0];

            switch (_getValue(e)) {
                case 'frame':
                    map.insets = [RealMap.preset('울릉도')];
                    울릉 = 'frame';
                    break;
                case 'border':
                    map.insets = [
                        RealMap.preset('울릉도', { frame: undefined }),
                    ];
                    울릉 = 'border';
                    break;
                default:
                    map.insets = [];
                    울릉 = undefined;
                    break;
            }
            제주 &&
                map.insets.push(
                    RealMap.preset(
                        '제주도',
                        제주 === 'border' ? { frame: undefined } : undefined
                    )
                );
            백령 &&
                map.insets.push(
                    RealMap.preset(
                        '백령도',
                        백령 === 'border' ? { frame: undefined } : undefined
                    )
                );

            map.source = undefined; // 이전 loadAsync에서 설정함.
            await chart.loadAsync(config);
        },
        ''
    );
    createListBox(
        container,
        '백령도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            const map = config.map[0];

            switch (_getValue(e)) {
                case 'frame':
                    map.insets = [RealMap.preset('백령도')];
                    백령 = 'frame';
                    break;
                case 'border':
                    map.insets = [
                        RealMap.preset('백령도', { frame: undefined }),
                    ];
                    백령 = 'border';
                    break;
                default:
                    map.insets = [];
                    백령 = undefined;
                    break;
            }
            제주 &&
                map.insets.push(
                    RealMap.preset(
                        '제주도',
                        제주 === 'border' ? { frame: undefined } : undefined
                    )
                );
            울릉 &&
                map.insets.push(
                    RealMap.preset(
                        '울릉도',
                        울릉 === 'border' ? { frame: undefined } : undefined
                    )
                );

            map.source = undefined; // 이전 loadAsync에서 설정함.
            await chart.loadAsync(config);
        },
        ''
    );
    createCheckBox(
        container,
        '북한영역',
        async function (e) {
            config.map[0].source = undefined; // 이전 loadAsync에서 설정함.
            config.map[0].showDummies = _getChecked(e);
            await chart.loadAsync(config);
        },
        true
    );
}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LOADED!')
    });
    setActions('actions');
}
