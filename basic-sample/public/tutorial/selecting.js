
const config = {
    chart: {
        clickAction: 'click'
    },
    title: 'Selecting',
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
        },
    ],
    
    axis: {
        grid: true,
        crosshair: !true,
    },
    body: {
        zoomable: true
    },
    series: [
        {
            useMapData: true,
            style: { 
                stroke: '#fff',
                fill: '#C7D9DD',
                strokeWidth: 0.7,
            },
            hoverColor: '#8ABABA',
            pointLabel: false,
        },
    ],
};

function setActions(container) {
    createButton(container, '도법 미지정', async function (e) {
        chart.body.updateOption('projection', '');
    });

    createButton(container, '메르카토르', async function (e) {
        chart.body.updateOption('projection', 'mercator');
    });

    createButton(container, 'EqualEarth', async function (e) {
        chart.body.updateOption('projection', 'equalearth');
    });

    createButton(container, '밀러', async function (e) {
        chart.body.updateOption('projection', 'miller');
    });

    createButton(container, '직교투영', async function (e) {
        chart.body.updateOption('projection', 'orthographic');
    });
}



const tool = {
    description: ['- 리얼맵은 동적으로 지도에 적용된 도법(Projection)을 변경할 수 있습니다. 화면의 Select 버튼을 눌러 체험해보세요.'],
    actions: [
        {
            type: 'select',
            label: 'body.projection',
            value: '',
            data: [ '', 'mercator', 'equalearth', 'miller', 'orthographic' ],
            labels: ['도법 미지정', '메르카토르', 'EqualEarth', '밀러', '직교투영(3D)'],
            action: ({ value }) => {
                chart.body.updateOption('projection', value);
            },
        },
    ]
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);

    setActions('actions');
}
