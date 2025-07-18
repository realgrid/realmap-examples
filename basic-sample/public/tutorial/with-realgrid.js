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
            mapKeys: ['iso-a3', 'countryCode'],
            dataUrl: '../data/world-economic2.json',
            hoverColor: '#f2f6fc',
            tooltipText:
                '<t style="font-weight: bold;">${name}(${value})</t>',
            style: {
                stroke: '#000',
                strokeWidth: 0.5,
                cursor: 'pointer'
            },
            onPointClick: (args) => {
                const point = chart.seriesByType('map').pointByProp('iso-a3', args.source.countryCode);

                if (window.prevPoint2) {
                    window.prevPoint2.setSelected(false);
                }

                const { grid: { gridView, provider } } = window;

                point.setSelected(true);
                chart.render();

                window.prevPoint2 = point;

                const { countryCode } = args.source;

                const searchResult = gridView.searchCell({
                    value: countryCode,
                    fields: provider.getOrgFieldNames(),
                });

                gridView.setSelection({
                    style: 'singleRow',
                    startItem: searchResult.itemIndex,
                    endItem: searchResult.itemIndex,
                });
            },
        },
    ],
    exporting: {
        visible: true,
    },
};

async function onChartLoaded() {
    const provider = new RealGrid.LocalDataProvider();
    const gridView = new RealGrid.GridView('realgrid');

    window.grid = {
        gridView: gridView,
        provider: provider,
    };

    gridView.setDataSource(provider);

    const fields = [
        { fieldName: 'countryCode', dataType: 'text' },
        { fieldName: 'countryName', dataType: 'text' },
        { fieldName: 'gdp', dataType: 'number' },
        { fieldName: 'gdpGrowth', dataType: 'number' },
        { fieldName: 'gdpPerCapita', dataType: 'number' },
        { fieldName: 'currentAccount', dataType: 'number' },
        { fieldName: 'inflation', dataType: 'number' },
        { fieldName: 'unemployment', dataType: 'number' },
        { fieldName: 'industrialProduction', dataType: 'number' },
        { fieldName: 'exports', dataType: 'number' },
        { fieldName: 'imports', dataType: 'number' },
    ];

    provider.setFields(fields);
    gridView.setColumns(
        fields.map((f) => ({
            fieldName: f.fieldName,
            styleName: 'normal-cell'
        }))
    );

    const data = await fetch('../data/world-economic2.json').then((res) => res.json());

    provider.setRows(data);

    // gridView 설정
    let prevSelection = null;

    gridView.displayOptions.selectionStyle = 'singleRow';
    gridView.onSelectionChanged = (_, clickData) => {
        const { startItem } = clickData;

        const code = gridView.getValue(startItem, 'countryCode');

        const point = chart.seriesByType('map').pointByProp('iso-a3', code);

        if (point) {
            if (prevSelection) {
                prevSelection.setSelected(false);
            }

            point.setSelected(true);
            prevSelection = point;

            chart.body.zoomToArea(point.area.id, 0.3);
        }
    };

    gridView.setEditOptions({
        editable: false,
        commitByCell: true,
    });
    gridView.orderBy("gdp", 'descending');
    gridView.columnByName('gdpGrowth').header.styleName = 'editable-header';
    gridView.columnByName('gdpGrowth').styleName = 'editable-cell';
    gridView.columnByName('gdpGrowth').styleCallback = () => {
        return {
            editable: true,
        };
    };
    provider.onRowUpdated = (provider, row) => {
        const code = provider.getValue(row, 'countryCode');
        const gdpGrowth = provider.getValue(row, 'gdpGrowth');

        // RealMap
        const mapSeries = chart.seriesByType('map');
        const point = mapSeries.pointByProp('iso-a3', code);

        mapSeries.updatePoint(point, { value: gdpGrowth });
    };
}

let chart;
let grid;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);

    // Provider, GridView 설정
    await onChartLoaded();
}
