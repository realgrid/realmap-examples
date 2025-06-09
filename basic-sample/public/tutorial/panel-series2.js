const config = {
    title: false,
    map: [
        {
            url: '../maps/geojson/kr-sido-low.geo.json',
            padding: '0.8 0 0 0',
            dokdo: 0.1
        },
    ],
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
            text: '지역별 기상 예보(서울, 세종, 광주, 제주, 부산)',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],


    body: {
        projection: 'mercator',
        zoomable: true,
    },
    series: [
        {
            name: '시도',
            tooltipText: '<t style="font-size: 15px; font-weight: 700;">${name}</t><br /><t style="opacity=0.7; font-size: 16px;">최저: ${tempMin}°Cㅤ최대: ${tempMax}°C</t>',
            dataUrl: '../data/kr-sido-weather-2.json',
            bringToFront: true,
            hoverColor: '#83A8DC',
            style: {
                stroke: 'none',
                strokeWidth: 1,
                fill: '#83A8DC',
            },
            nullStyle: {
                fill: '#B4CBEF',
                stroke: '#fff'
              },
        },
        {
            type: 'panel',
            name: '최저, 최고 기온',
            headerField: 'name',
            tooltipText: false,
            header: {
                style: {
                    strokeWidth: 0,
                },
            },
            body: {
                text: '최저: <t style="opacity: 0.7;">${tempMin}°C</t>ㅤ최대: <t style="opacity: 0.7;">${tempMax}°C</t>'
            },
            callout: true,
            style: {
                stroke: 'none',
                fill: '#628ECB',
                strokeWidth: 0.2,
            },
            dataUrl: '../data/kr-sido-weather-2.json',
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}