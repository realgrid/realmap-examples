const config = {
    title: false,
    credits: false,
    map: [
        {
            url: '../maps/geojson/kr-sigun-low.geo.json',
            dokdo: 0.1,
            padding: '1.2 0 0 2'
        },
    ],
    body: {
        projection: 'mercator',
        style: {
            fill: '#fff'
        }
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
                fill: '#FD787F',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '대설 특보',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
        {
            front: true,
            scope: 'container',
            type: 'shape',
            shape: 'rectangle',
            offsetX: 50,
            offsetY: 120,
            width: 28,
            height: 28,
            style: {
                fill: '#FD787F',
            },
        },
        {
            front: true,
            text: '대설 경보',
            scope: 'container',
            offsetX: 90,
            offsetY: 120,
            height: 28,
            style: {
                fill: '#FD787F',
                fontSize: 24,
            },
        },
        {
            front: true,
            text: '강원도 북부 일대 예상 적설량 20cm ~ 25cm',
            scope: 'container',
            offsetX: 90,
            offsetY: 155,
            style: {
                fontSize: 16,
            },
        },
        
        {
            front: true,
            scope: 'container',
            type: 'shape',
            shape: 'rectangle',
            offsetX: 50,
            offsetY: 190,
            width: 28,
            height: 28,
            style: {
                fill: '#ffcc84',
            },
        },
        {
            front: true,
            text: '대설 주의보',
            scope: 'container',
            offsetX: 90,
            offsetY: 190,
            height: 28,
            style: {
                fill: '#ffcc84',
                fontSize: 24,
            },
        },
        {
            front: true,
            text: '서울, 경기 예상 적설량 5cm ~ 10cm',
            scope: 'container',
            offsetX: 90,
            offsetY: 225,
            style: {
                fontSize: 16,
            },
        },
    ],
    series: [
        {
            name: '지도',
            hoverColor: '#919191',
            tooltipText: false,
            legend: -1,
            dataUrl: '../data/kr-snow.json',
            tooltipText: '<t style="font-size: 18px; font-weight: 700;">${name}</t><br /><t style="opacity: 0.7;">${alert}</t>',
            pointColors: (args) => {
                const snowAlert = args.source.alert;

                if (snowAlert === '대설 경보') return '#FD787F';
                if (snowAlert === '대설 주의보') return '#ffcc84';
                return '#EFEFEF';
            },
            style: {
                stroke: '#fff',
                fill: '#e0ebf9',
                strokeWidth: 0.5,
            },
        },
        {
            type: 'point',
            radius: 8,
            shape: 'diamond',
            style: {
                stroke: 'orange',
                fill: 'white',
                strokeWidth: 4,
            },
            style: {
                color: 'white'
            },
            pointLabel: {
                text: '<t style="font-size: 16px; color: white;">${name}</t>'
            },
            data: [
                { name: '대설 경보', coord: [129.4, 38.1], color: '#FD787F' },
                { name: '대설 주의보', coord: [129.9,37.4], color: '#ffcc84' },
            ]
        }
    ],
};

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
