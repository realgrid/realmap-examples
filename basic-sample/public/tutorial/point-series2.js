const $ds = {
    Flooding: [],
    Wettest: [],
    Wet: [],
    Normal: [],
    Dry: [],
    Drier: [],
    Driest: [],
    'No data': [],
};

const MAX_ROWS = 1000;
const $dsKeys = Object.keys($ds);

data.sort(() => 0.5 - Math.random());
data.forEach((row) => {
    $ds[row.cat]?.length < MAX_ROWS && $ds[row.cat].push(row);
});

const config = {
    title: false,
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
                fill: '#5b63aa',
            },
        },
        {
            front: true,
            type: 'text',
            text: '<t style="font-size:15pt;font-weight:bold">U.S River Conditions</t> <t style="font-size:9pt;fill:#999">2025-03-18</t>',
            offsetX: 40,
            offsetY: 20,
            height: 28,
        },
    ],
    map: [
        {
            name: 'usa',
            url: '../map/wooritech/v1/maps/geojson/usa-state-low.geo.json',
            exclude: ['HI', 'AK'],
            padding: '0 0 -3 0'
        },
    ],
    body: {
        projection: 'mercator',
    },
    series: [
        {
            name: 'usa',
            visibleInLegend: false,
            nullStyle: { fill: '#efefef' },
            style: {
                stroke: '#fff',
                strokeWidth: 2,
            },
        },
        {
            name: 'Flooding',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            radius: 3,
            color: 12,
        },
        {
            name: 'Wettest',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            color: 1,
            radius: 3,
        },
        {
            name: 'Wet',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            color: 2,
            radius: 3,
        },
        {
            name: 'Normal',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            color: 'lightgray',
            radius: 3,
        },
        {
            name: 'Dry',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            style: {
                fill: 'none',
                stroke: 'var(--color-4)',
            },
            radius: 1,
        },
        {
            name: 'Drier',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            style: {
                fill: 'none',
                stroke: 'var(--color-5)',
            },
            radius: 2,
        },
        {
            name: 'Driest',
            type: 'point',
            valueField: 'val',
            shape: 'circle',
            style: {
                fill: 'none',
                stroke: 'var(--color-3)',
            },
            radius: 3,
        },
        {
            name: 'No data',
            type: 'point',
            valueField: 'val',
            shape: 'triangle',
            style: {
                fill: 'none',
                stroke: 'gray',
            },
            radius: 3,
        },
    ],
    tooltip: {
        text: '<i>Gage Height</i><br/>${series}: ${value}ft',
    },
};

let chart;

function runSteps(stepIndex = 0) {
    if (stepIndex >= $dsKeys.length) return;

    requestAnimationFrame(() => {
        const cat = $dsKeys[stepIndex];
        chart.getSeries(cat).updateOptions({
            data: $ds[cat],
        });
        runSteps(stepIndex + 1);
    });
}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true, runSteps);

}
