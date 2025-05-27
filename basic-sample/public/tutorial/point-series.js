const config = {
    title: false,
    map: [
        { 
            url: '../realmap/maps/geojson/kr-sido-low.geo.json', 
            padding: '0.8 0 0.3 0',
        },
    ],

    body: {
        projection: 'mercator',
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
                fill: '#858FD5',
            },
        },
        {
            front: true,
            type: 'text',
            text: '전국 장애인 복지관 현황',
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
            visibleInLegend: false,
            tooltipText: '${id}<br />복지관: ${welfareCount}개',
            mapKeys: ['name', 'id'],
            hoverColor: '#C0D2AC',
            style: {stroke: '#fff'},
            pointStyle: {
                stroke: '#fff'
            },
            pointColors: (args) => {
                const { welfareCount } = args.source;
                if (welfareCount < 10) return '#EEF1DA';
                if (welfareCount < 20) return '#D5E5D5';
                if (welfareCount < 50) return '#C7D9DD';
                return '#EEF1DA'
            },
            dataUrl: '../data/kr-welfare-center-statistic.json',
        },
        {
            type: 'point',
            name: '복지관 분포',
            dataUrl: '../data/kr-welfare-center.json',
            tooltipText: false,
            radius: 3,
            pointLabel: {
                zoomLevel: 300,
                text: '<t style="opacity: 0.7">${name}</t>'
            },
            style: {
                stroke: '#858FD5',
                strokeWidth: '2px',
                fill: '#fff',
            },
        },
        {
            type: 'bar',
            name: '시도별 복지관 개수',
            width: '25',
            sizeMode: 'width',
            baseLine: {
                style: { stroke: '#858FD5' },
              },
            tooltipText: false,
            valueField: 'welfareCount',
            pointLabel: {
                text: '<t style="font-size: 16px">${id}</t><br/><t style="opacity: 0.7">복지관: ${welfareCount}개</t>'
            },
            dataUrl: '../data/kr-welfare-center-statistic.json',
            callout: true,
            style : {
                fill: '#858FD5',
                opacity: 1,
                stroke: 'none' ,
            }
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
