const config = {
    title: false,
    credits: {visible: false},
    map: [
        {
            url: '../maps/geojson/kr-sido-low.geo.json',
            // url: '../maps/geojson/kr-sigun-low.geo.json',
            // url: '../maps/geojson/kr-dong-low.geo.json',
            padding: 0.1,
            showDummies: true,
            // insets: [],
            dokdo: 0.2,
            insets: [
                RealMap.preset('제주도', {
                    frame: undefined,
                    // frame: '0.05 0.1',
                    // border: '-0.2 h-0.05 w-0.1 h+0.1 w+0.2 h'
                }),
                RealMap.preset('울릉도'),
                RealMap.preset('백령도'),
            ],
            // insets: [RealMap.preset('제주도', false), RealMap.preset('울릉도', false)],
            // insets_1: [RealMap.preset('제주도')],
            // insets_2: [RealMap.preset('울릉도')],
            // insets_3: [
            //     RealMap.preset('읍면동_제주도'),
            //     RealMap.preset('읍면동_백령도'),
            //     RealMap.preset('읍면동_울릉도'),
            // ],
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
            // scope: 'body',
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
        // hoverColor: '#9DB2CD',
        nullHovering: true,
        nullStyle: {
            fill: '#D2DEEC',
            stroke: '#6d6d6d',
            strokeWidth: 0.5,
        },
        style: {
            stroke: '#6d6d6d',
            fill: '#6989AF'
        },
        hoverStyle: {
            filter: 'brightness(0.9)',
            stroke: '#5d5d5d'
        },
        mapKeys: 'name',// [ 'name', 'name' ],
        data: [
            { name: '제주특별자치도' },
            { name: '경상북도' },
        ]
    }, {
        type: 'point',
        name: '전국 서점 수',
        width: 40,
        pointLabel: {
            text: '${name}<br><t style="opacity:0.7">${qty}</t>',
        },
        width: '25',
        color: 'red',
        tooltipText: false,
        mapKeys: ['b-code', 'id'],
        dataUrl: '../data/kr-bookstore.json',
        valueField: 'qty',
        style: {
            opacity: 1,
        }
    }],
};

let mapChart;

function setActions(container) {
    createListBox(
        container,
        '독도 표시',
        ['undefined', 1, 0.5, 0.2, 0.1, 0.05, 0],
        async function (e) {
            config.map[0].source = undefined; // 이전 loadAsync에서 설정함.
            config.map[0].dokdo = +_getValue(e);
            await mapChart.loadAsync(config);
        },
        '0.2'
    );

    createListBox(
        container,
        '제주도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            updateInsetArea('제주', _getValue(e));

            config.map[0].source = undefined;
            await mapChart.loadAsync(config);
        },
        'border'
    );
    createListBox(
        container,
        '울릉도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            updateInsetArea('울릉', _getValue(e));

            config.map[0].source = undefined;
            await mapChart.loadAsync(config);
        },
        'frame'
    );
    createListBox(
        container,
        '백령도 inset',
        ['none', 'frame', 'border'],
        async function (e) {
            updateInsetArea('백령', _getValue(e));

            config.map[0].source = undefined;
            await mapChart.loadAsync(config);
        },
        'frame'
    );
    createCheckBox(
        container,
        '북한영역',
        async function (e) {
            config.map[0].source = undefined; // 이전 loadAsync에서 설정함.
            config.map[0].showDummies = _getChecked(e);
            await mapChart.loadAsync(config);
        },
        true
    );

    /**
     * 지정한 대상에 대한 inset 영역을 업데이트합니다.
     * 
     * @param {'울릉' | '제주' | '백령' | undefined} target 업데이트 대상.
     * @param {'frame' | 'border' | 'none'} option inset 옵션.
     */
    function updateInsetArea(target , option) {
        const insetNameMap = {
            '제주특별자치도': '제주도',
            '울릉도': '울릉도',
            '백령도': '백령도',
        };

        const newInsets = mapChart.map._insets.map((inset) => {
            const option = inset.frame ? undefined : { frame: undefined };

            return {
                name: insetNameMap[inset.name],
                option,
            };
        });

        const targetInset = newInsets.find(inset => inset.name.startsWith(target));
        const insetOption = option === 'border' ? { frame: undefined } : undefined;
        
        if (targetInset && option !== 'none') {
            targetInset.option = insetOption;
        } else if (targetInset && option === 'none') {
            // 인셋 옵션 제거하는 상황
            newInsets.splice(newInsets.indexOf(targetInset), 1);
        } else if (!targetInset && option !== 'none' ) {
            // 인셋 옵션 추가하는 상황
            newInsets.push({
                name: target,
                option: insetOption,
            });
        }

        config.map[0].insets = newInsets.map((inset) => RealMap.preset(inset.name, inset.option));
    }
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LOADED!')
    });
    setActions('actions');
}
