/**
 * @demo
 * 
 * 시도별 경찰관 1인당 담당 인구수 현황
 * https://www.data.go.kr/data/3073020/fileData.do
 */
const config = {
    body: {
        projection: 'mercator',
    },
    title: '시도별 경찰관 1인당 담당 인구수 현황',
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sido-low.geo.json',
        },
    ],
    series: [
        {
            pointLabel: false,
            hoverColor: '#c9dcf4',
            dataUrl: '../data/sido-police-coverage.json',
            mapKeys: ['name', 'sido'],
            pointColors: (args) => {
                const perOfficer = +args.source.perOfficer;
    
                if (perOfficer < 400) return '#e0ebf9';
                if (perOfficer < 500) return '#e7e7e7';
                if (perOfficer < 550) return '#ffdddd';
                return '#ff9494';
            },
            // onPointerClick이나 Hover 콜백이 호출되면, HTML 시리즈 내용을 호버한 대상으로 교체
            // 초기에는 데이터가 없으니 추가해야함
            onPointClick: (args) => {
                console.log(args.source);
            },
            tooltipText: '<t style="font-size: 16px;">${sido}</t><br /><t style="opacity: 0.7;">경찰관 1인당 담당 인구수: ${perOfficer}</t>',
            style: {
                fill: '#d1d1d1',
                stroke: '#808080',
                strokeWidth: 2,
            },
        },
        {
            type: 'html',
            coord: [34.58, 130.26],
            html: [
                '<div>',
                    '<h1>${sido}</h1>',
                    '<p>${population}</p>',
                    '<p>${officers}</p>',
                    '<p>${perOfficer}</p>',
                '</div>',
            ].join(''),
            // Map Area hover, click 콜백 호출시 해당 데이터를 수정,
            data: []
        }
    ]
};

let chart;

function setActions(container) {}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {});

    setActions('actions');
}
