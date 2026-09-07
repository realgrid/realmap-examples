let chart;

const config = {
    templates: {
        '@series': {
            figure: {
                legend: 'harbor',
                tooltipText:
                    '<t style="font-size: 16px; font-weight: 700;">${이름}(${type})</t>',
                pointLabel: {
                    visible: true,
                    text: '${이름}',
                    effect: 'outline',
                    style: {
                        fill: 'black',
                        fontWeight: '400',
                        fontSize: '10px',
                    },
                },
            },
        },
    },
    title: {
        visible: false,
    },
    credits: {
        visible: false,
    },
    map: [
        {
            url: '../maps/topojson/korea-low.topo.json',
            padding: '3',
            showDummies: true,
            needInternal: true,
            needExternal: true,
            borders: [
                {
                    name: 'c2',
                    border: [
                        'CHN',
                        [
                            'PRK-3310',
                            'PRK-3312',
                            'PRK-3314',
                            'PRK-3307',
                            'PRK-5495',
                        ],
                    ],
                },
                {
                    name: 'c3',
                    border: ['RUS', 'PRK-5495'],
                },
                {
                    name: 'c4',
                    border: ['CHN', 'RUS'],
                },
            ],
        },
    ],
    axis: {
        crosshair: {
            visible: false,
        },
    },
    body: {
        projection: 'mercator',
        movable: false,
        zoom: 340,
        panX: -0.5,
        panY: -3.8,
        mapBackground: {
            visible: true,
            style: {
                fill: '#E3F0F8',
            },
        },
    },
    annotation: [
        {
            type: 'html',
            front: true,
            html: '#port-airport-total-summary-template',
            width: 500,
            offsetX: 20,
            offsetY: 20,
            params: {
                totalSum: 1510125439,
                domesticTotal: 233897801,
                foreignTotal: 1276227638,
                foreignShip: 938195309,
                koreanShip: 338032329,
                departureTotal: 431786143,
                departureForeign: 431786143,
                departureForeignShip: 378775860,
                departureKoreanShip: 53010283,
                arrivalTotal: 844441495,
                arrivalForeign: 844441495,
                arrivalForeignShip: 759067449,
                arrivalKoreanShip: 85374046,
                coastalCargoTotal: 223025948,
                coastalCargoDomestic: 223025948,
                coastalPassengerTotal: 10871853,
                coastalPassengerDomestic: 10871853,
            },
        },
        {
            type: 'html',
            front: true,
            html: '#port-airport-harbor-legend-template',
            width: 120,
            offsetX: 20,
            offsetY: 390,
        },
    ],
    legend: [
        {
            visible: true,
            name: 'harbor',
            location: 'body',
            offsetX: 20,
            offsetY: 195,
            layout: 'vertical',
            style: {
                fontSize: '10px',
            },
            title: {
                visible: true,
                text: '항만',
            },
            background: {
                visible: true,
                style: {
                    stroke: 'black',
                    fill: 'white',
                    padding: '10',
                },
            },
        },
        {
            visible: true,
            name: 'airport',
            location: 'body',
            offsetX: 120,
            offsetY: 195,
            layout: 'vertical',
            title: {
                visible: true,
                text: '항공',
            },
            style: {
                fontSize: '10px',
            },
            background: {
                visible: true,
                style: {
                    stroke: 'black',
                    fill: 'white',
                    padding: '10',
                },
            },
        },
    ],
    bubbleScale: [
        {
            location: 'body',
            offsetX: 20,
            offsetY: 295,
            stepCount: 2,
            steps: [
                { label: '50,000,000', value: 50000000 },
                { label: '100,000,000', value: 100000000 },
            ],
            title: {
                visible: true,
                text: '<t style="font-size: 10px; font-weight: bold;">항만</t><t style="font-size: 8px;">(톤)</t>',
            },
            maxRadius: 180,
        },
        {
            location: 'body',
            offsetX: 180,
            offsetY: 295,
            stepCount: 2,
            steps: [
                { label: '5,000,000', value: 5000000 },
                { label: '10,000,000', value: 10000000 },
            ],
            title: {
                visible: true,
                text: '<t style="font-size: 10px; font-weight: bold;">공항 여객</t><t style="font-size: 8px;">(단위)</t>',
            },
            maxRadius: 600,
        },
    ],
    series: [
        {
            name: '지도',
            useMapData: true,
            tooltipText: '${name}',
            hoverColor: '#cacbc3',
            style: {
                stroke: '#bbb4a7',
                strokeWidth: '0.5',
                fill: '#eaebe2',
            },
            dummyStyle: {
                fill: '#ececec',
                stroke: '#3f9cd1',
                strokeWidth: '0.5',
            },
            mapBorders: [
                {
                    visible: true,
                    name: 'c2',
                    style: {
                        strokeWidth: '1.5',
                        strokeDasharray: '5, 5',
                        stroke: 'black',
                    },
                },
                {
                    visible: true,
                    name: 'c3',
                    style: {
                        strokeWidth: '1.5',
                        strokeDasharray: '5, 5',
                        stroke: 'black',
                    },
                },
                {
                    visible: true,
                    name: 'c4',
                    style: {
                        strokeWidth: '3',
                        stroke: '#ececec',
                    },
                },
            ],
        },
        {
            type: 'bubble',
            name: '출 입항선박',
            legend: 'harbor',
            tooltipText: false,
            style: {
                stroke: '#b7dbd8',
                fill: '#b7dbd8',
                fillOpacity: '0.7',
            },
            dataUrl: '../data/port-airport/출입항선박.json',
        },
        {
            type: 'bubble',
            name: '2019년 공항 여객',
            legend: 'airport',
            tooltipText: false,
            style: {
                stroke: '#fef69a',
                fill: '#fef69a',
                fillOpacity: '0.3',
            },
            dataUrl: '../data/port-airport/2019년공항여객.json',
        },
        {
            type: 'bubble',
            name: '2020년 공항 여객',
            legend: 'airport',
            tooltipText: false,
            style: {
                stroke: '#fbd479',
                fill: '#fbd479',
                fillOpacity: '0.3',
            },
            dataUrl: '../data/port-airport/2020년공항여객.json',
        },
        {
            name: '무역항',
            type: 'figure',
            dataUrl: '../data/port-airport/무역항.json',
            innerImage: {
                url: '../images/port-airport/무역항.png',
                width: 16,
            },
            pointLabel: {
                style: {
                    fill: '#005281',
                },
            },
        },
        {
            name: '연안항',
            type: 'figure',
            dataUrl: '../data/port-airport/연안항.json',
            innerImage: {
                url: '../images/port-airport/연안항.png',
                width: 16,
            },
        },
        {
            type: 'html',
            htmlHeight: 250,
            dataUrl: '../data/port-airport/무역항패널.json',
            legend: 'harborPanel',
            html: '#port-airport-panel',
            tooltipText: false,
            callout: {
                visible: true,
                style: {
                    strokeWidth: '0.8',
                },
            },
        },
        {
            name: '공항',
            type: 'figure',
            dataUrl: '../data/port-airport/공항.json',
            legend: 1,
            tooltipText:
                '<t style="font-size: 16px; font-weight: 700;">${이름}공항</t>',
            innerImage: {
                url: '../images/port-airport/공항.png',
                width: 16,
            },
        },
    ],
};

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
