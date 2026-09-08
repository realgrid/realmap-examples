const config = {
    title: false,
    credits: {visible: false},
    map: [
        {
            url: '../maps/geojson/kr-sido-low.geo.json',
            padding: 0.1,
            showDummies: true,
            dokdo: 0.2,
            insets: [
                RealMap.preset('제주도', {
                    frame: undefined,
                }),
                RealMap.preset('울릉도'),
                RealMap.preset('백령도'),
            ],
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
        mapKeys: 'name',
        data: [
            { name: '제주특별자치도' },
            { name: '경상북도' },
        ]
    }, {
        type: 'point',
        name: '전국 서점 수',
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
            config.map[0].source = undefined;
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
            config.map[0].source = undefined;
            config.map[0].showDummies = _getChecked(e);
            await mapChart.loadAsync(config);
        },
        true
    );

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
            newInsets.splice(newInsets.indexOf(targetInset), 1);
        } else if (!targetInset && option !== 'none' ) {
            newInsets.push({
                name: target,
                option: insetOption,
            });
        }

        config.map[0].insets = newInsets.map((inset) => RealMap.preset(inset.name, inset.option));
    }
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
    setActions('actions');
}
