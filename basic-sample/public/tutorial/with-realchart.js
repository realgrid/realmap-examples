const config = {
    title: false,
    credits: {visible: false},
    map: [
        {
            url: `../maps/geojson/world-high.geo.json`,
            exclude: ['ATA', 'GRL'],
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
                fill: '#83A8DC',
            },
        },
        {
            front: true,
            type: 'text',
            text: 'Main economic indicators',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    colorScale: {
        location: 'right',
        valueField: 'gdpGrowth',
        minValue: -25,
        minColor: '#ff5757',
        maxColor: '#78a9e2',
        steps: [
            { from: -25, to: -10, color: '#ff5757' },
            { from: -10, to: 0, color: '#ffc0c0' },
            { from: 0, to: 1, color: '#f2f6fc' },
            { from: 1, to: 3, color: '#c9dcf4' },
            { from: 3, to: 5, color: '#a4c6ec' },
            { from: 5, color: '#78a9e2' },
        ],
    },
    series: [
        {
            mapKeys: ['iso-a2', 'id'],
            dataUrl: '../data/gdp-growth-by-country.json',
            tooltipText:
                '<t style="font-weight: bold;">${name} 2023년 GDP 성장률: ${value}</t>',
            style: {
                stroke: '#000',
                strokeWidth: 0.5,
                cursor: 'pointer'
            },
            hoverStyle: {
                stroke: '#5d5d5d',
                filter: 'brightness(0.9)',
                strokeWidth: 1.5,
            },
            selectStyle: {
                stroke: '#5d5d5d',
                strokeWidth: 2,
                filter: 'none',
            },
            onPointClick: (args) => {
                const { id } = args.source;
                const map = mapChart.seriesByType('map');
                const point = map.pointByProp('iso-a2', id);

                if (window.prevPoint2) {
                    map.unselect(window.prevPoint2);
                }

                map.select(point);

                window.prevPoint2 = point;

                const foundData = chartData.find((data) => data.id === id);

                if (!foundData) {
                    return;
                }

                mapChart.body.zoomToArea(point.area.id, 0.3);

                const seriesData = foundData.data.map(({ year, value }) => ({ x: year + '', y: value }));

                const { realchart } = window;

                realchart.getSeries(0).updateData(seriesData);

                realchart.updateOptions({
                    title: {
                        text: `GDP Growth Rate of ${foundData['name-en']} `
                    }
                });

                window.realchart.title.updateOption('text', `GDP Growth Rate of ${foundData['name-en']} `);
            },
        },
    ],
    exporting: {
        visible: true,
    },
};

async function onChartLoaded(mapChart) {
    window.chartData = await fetch('../data/gdp-growth-by-country.json').then((res) => res.json());

    if (mapChart.isDestroying()) return;

    const point = mapChart.seriesByType('map').pointByProp('iso-a2', 'KR');
    window.prevPoint2 = point;
    point?.setSelected(true);

    const krData = window.chartData.find((data) => data.id === 'KR');

    window.realchart = RealChart.createChart(document, 'realchart', {
        options: {},
        title: {
            text: `GDP Growth Rate of ${krData['name-en']} `,
            align: 'left',
            style: {
                fontSize: '16pt',
                fontWeight: 700,
            },
        },
        xAxis: {
            type: 'category',
            crosshair: true,
        },
        series: {
            type: 'spline',
            marker: {
                visible: true
            },
            pointLabel: true,
            data: krData.data.map(({ year, value }) => ({ x: year + '', y: value })),
        }
    });
}

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);

    await onChartLoaded(mapChart);
}
