const config = {
    title: false,
    credits: { visible: false },
    map: [
        {
            url: '../maps/geojson/world-low.geo.json',
            // url: '../maps/geojson/usa-state-low.geo.json',
            // exclude: ['ATA']
            // useOffset: true,
        },
    ],
    body: {
        projection: 'equalearth',
        // projection: 'mercator',
        zoomable: true,
        scrollable: true,
        scroll: 150,
        mapBackground: {
            visible: true,
            style: {
                fill: '#0088ff10',
            },
        },
    },
    axis: {
        crosshair: true,
        grid: {
            visible: true,
            line: {
                step: 30,
            },
        },
        tick: {
            visible: true,
            label: {
                style: {
                    fill: '#0088ff80',
                    fill: 'red',
                },
            },
        },
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
    series: [
        {
            pointLabel: {
                visible: true,
                effect: 'outline',
            },
            hoverStyle: {
                strokeWidth: 2,
                filter: 'brightness(1.07)',
            },
            style: {
                stroke: '#ccc'
            },
            data: [
                {
                    id: 'KOR',
                    value: 123,
                },
                {
                    id: 'CHN',
                    value: 532,
                },
                {
                    id: 'BRA',
                    value: 235,
                },
            ],
            nullHovering: true,
        },
        {
            type: 'point',
            data: [
                {
                    coord: [1, 1],
                    name: 'xxx',
                },
                {
                    coord: [127, 37],
                    name: 'zzz',
                },
            ],
            pointLabel: true,
        },
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
    createButton(container, 'Scroll---', function (e) {
        mapChart.body.scroll -= 60;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Scroll--', function (e) {
        mapChart.body.scroll -= 10;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Scroll-', function (e) {
        mapChart.body.scroll -= 1;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Scroll+', function (e) {
        mapChart.body.scroll += 1;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Scroll++', function (e) {
        mapChart.body.scroll += 10;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Scroll+++', function (e) {
        mapChart.body.scroll += 60;
        mapChart.title.updateOption('text', mapChart.body.scroll);
    });
    createButton(container, 'Auto Scroll', function (e) {
        const started = e.target.value == 'Auto Scroll';
        e.target.value = started ? 'Stop Scroll' : 'Auto Scroll';
        function update(start) {
            start ||= e.target.value != 'Auto Scroll';
            requestAnimationFrame(function () {
                mapChart.body.scroll += 1;
                start && update();
            });
        }

        update(started);
    });

    createButton(container, 'zoom 200', function (e) {
        mapChart.body.zoom = 200;
    });
    createButton(container, 'zoom to Korea', function (e) {
        // mapChart.body.zoomTo(300, [128.235, 35.875]);
        mapChart.body.zoomToBounds([124.6, 38.65], [131.87, 33.1]);
    });
    createButton(container, 'zoom to USA', function (e) {
        mapChart.body.zoomToBounds([-125.0, 49.38], [-66.94, 24.52]);
    });
}

async function init() {
    mapChart = await RealMap.createChartAsync(
        document,
        'realmap',
        config,
        true,
        () => {
            console.log('LoADED!');
        }
    );

    setActions('actions');
}
