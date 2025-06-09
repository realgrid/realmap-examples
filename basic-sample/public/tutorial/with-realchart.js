/**
 * @demo
 *
 */
const config = {
    title: false,
    asset: [
        {
            type: 'pattern',
            id: 'pattern-3',
            pattern: 3,
            style: {
                fill: '#F87986',
            },
            backgroundStyle: {
                fill: '#FFE8E2',
            },
        },
    ],
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
        // -20.1115759693272 75.0613769262435
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
            hoverColor: '#f2f6fc',
            tooltipText:
                '<t style="font-weight: bold;">${name} 2023년 GDP 성장률: ${value}</t>',
            style: {
                stroke: '#000',
                strokeWidth: 0.5,
                cursor: 'pointer'
            },
            onPointClick: (args) => {
                const { id } = args.source;
                const point = chart.seriesByType('map').pointByProp('iso-a2', id);

                if (window.prevPoint2) {
                    window.prevPoint2.setSelected(false);
                }

                point.setSelected(true);
                chart.render();

                window.prevPoint2 = point;
                
                const foundData = chartData.find((data) => data.id === id);

                if (!foundData) {
                    return;
                }

                chart.body.zoomToArea(point.area.id, 0.3);
                
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
            crosshair: true
        },
        yAxis: {},
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

let chart;
let realchart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);

    await onChartLoaded(chart);
}
