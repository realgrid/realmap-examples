const config = {
    map: [{ 
        url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
        exclude: ['ATA'],
        padding: '8 0 0 0'
    }],
    asset: [
        {
            type: 'pattern',
            id: 'pattern-0',
            pattern: 0,
            style: {
                stroke: '#FF6512',
            },
            backgroundStyle: {
                fill: '#FFF5E4',
            },
        },
        {
            type: 'pattern',
            id: 'pattern-1',
            pattern: 1,
            style: {
                fill: '#6A9C89',
            },
            backgroundStyle: {
                fill: '#E4EFE7',
            },
        },
        {
            type: 'pattern',
            id: 'pattern-2',
            pattern: 2,
            style: {
                fill: '#83A8DC',
            },
            backgroundStyle: {
                fill: '#E7F0F9',
            },
        },
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
        {
            type: 'pattern',
            id: 'pattern-4',
            pattern: 4,
            style: {
                fill: '#7F88CC',
            },
            backgroundStyle: {
                fill: '#fff',
            },
        },
        {
            type: 'pattern',
            id: 'pattern-5',
            pattern: 5,
            style: {
                fill: '#AD4296',
            },
            backgroundStyle: {
                fill: '#F8DADF',
            },
        },
        {
            type: 'pattern',
            id: 'pattern-6',
            pattern: 6,
            style: {
                fill: '#7A87B8',
            },
            backgroundStyle: {
                fill: '#E6E6F2',
            },
        },
        {
            type: 'pattern',
            id: 'pattern-7',
            pattern: 3,
            style: {
                fill: '#009',
            },
            transform: 'scale(0.5) rotate(135)'
        },
        {
            type: 'linearGradient',
            id: 'gradient-0',
            color: ['#BAFFF1', '#3EADA4'],
            dir: 'up',
            
        },
        {
            type: 'linearGradient',
            id: 'gradient-1',
            color: ['#FFDFF9', '#35A1BD'],
            dir: 'right',
        },
        {
            type: 'linearGradient',
            id: 'gradient-2',
            color: ['#9DE1FF', '#B664D0'],
            dir: 'up',
        },
        {
            type: 'linearGradient',
            id: 'gradient-3',
            color: ['#FBDEB5', '#FD787F'],
            dir: 'up',
        },
        {
            type: 'linearGradient',
            id: 'gradient-4',
            color: ['#B8F8FA', '#1986D4'],
            dir: 'up',
        },
        {
            type: 'linearGradient',
            id: 'gradient-5',
            color: ['#5BC8C4', '#5F67B1'],
            dir: 'right',
        },
        {
            type: 'linearGradient',
            id: 'gradient-6',
            color: ['#FAF09A', '#FD7C6B'],
            dir: 'up',
        },
    ],
    title: {
        type: 'text',
        text: 'Fill Assets(Pattern, Gradient)',
        align: 'left',
        style: {
            fontSize: '15pt',
            fontWeight: 700,
        },
    },
    body: {
        projection: 'mercator',
        zoomable: false,
    },
    axis: {
        grid: true,
    },
    tooltip: false,
    series: [
        {
            name: 'map',
            pointLabel: {
                visible: true,
                effect: 'outline',
            },
            pointColors: [
                'url(#pattern-0)',
                'url(#pattern-1)',
                'url(#pattern-2)',
                'url(#pattern-3)',
                'url(#pattern-4)',
                'url(#pattern-5)',
                'url(#pattern-6)',
                'url(#pattern-7)',
            ],
            data: [
                {
                    id: 'CHN',
                },
                {
                    id: 'USA',
                },
                {
                    id: 'RUS',
                },
                {
                    id: 'CAN',
                },
                { 
                    id: 'AUS'
                },
                {
                    id: 'BRA',
                },
                {
                    id: 'GRL',
                },
                {
                    id: 'ARG',
                },
            ],
        },
    ],
};

let chart;

function setActions(container) {
    createListBox(
        container,
        'Projection',
        ['', 'equalearth', 'mercator', 'miller', 'orthographic'],
        function (e) {
            config.body.projection = _getValue(e);
            chart.load(config);
        },
        'equalearth'
    );
    createListBox(
        container,
        'fill asset type',
        ['pattern', 'gradient'],
        async function(e) {
            const suffix = _getValue(e);
            const pointColors = Array.from({ length: 7 }, (_, i) => `url(#${suffix}-${i})`);
            config.series[0].pointColors = pointColors;
            await chart.loadAsync(config);
        },
        'pattern'
    )
}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
    setActions('actions');
}
