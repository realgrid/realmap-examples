const config = {
    options: {
        theme: '',
    },
    title: false,
    map: [
        {
            url: '../realmap/maps/geojson/kr-sido-low.geo.json',
            showDummies: true,
            padding: '0.8 0 0 0',
            insets: [RealMap.preset('울릉도', { frame: undefined })],
            dokdo: 0.1,
        }
    ],

    body: {
        projection: 'miller',
        zoomable: true,
        style: {
            fill: '#fff',
        },
    },
    legend: false,
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
                fill: '#939393',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '시도별 심플 로고',
            offsetX: 40,
            offsetY: 20,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    series: [
        {
            hoverEffect: 'none',
            hoverColor: '#E3E3E3',
            tooltipText: '${id}',
            mapKeys: ['name', 'id'],
            colorField: 'color',
            style: {
                stroke: '#fff',
            },
            data: [
                { id: '서울특별시', color: '#C4DEED' },
                { id: '경기도', color: '#CCE2CF' },
                { id: '강원특별자치도', color: '#F2C7CE' },
                { id: '인천광역시', color: '#C4E4E2' },
                { id: '충청남도', color: '#E7D2E4' },
                { id: '충청북도', color: '#DBD2E2' },
                { id: '세종특별자치시', color: '#C4E4EC' },
                { id: '대전광역시', color: '#C9CDDD' },
                { id: '전북특별자치도', color: '#C5DCE0' },
                { id: '광주광역시', color: '#F2CFC7' },
                { id: '전라남도', color: '#F5DBCA' },
                { id: '경상남도', color: '#F5E6C4' },
                { id: '경상북도', color: '#C4D9E8' },
                { id: '부산광역시', color: '#F2C4DD' },
                { id: '대구광역시', color: '#C4DFCF' },
                { id: '울산광역시', color: '#C4E4E8' },
                { id: '제주특별자치도', color: '#F5DECE' },
            ],
        },
        {
            type: 'image',
            imageWidth: 48,
            imageHeight: 48,
            style: {
                opacity: 1,
            },
            position :'center',
            pointLabel: {
                visible: !true,
                style: {
                    fontSize: '10pt',
                    fontWeight: 500,
                    fill: '#171717',
                    textShadow: '1px 1px 1px white',
                },
            },
            tooltipText: false,
            rootUrl: '../images/kr-sido-woori/',
            callout: {
                visible: true,
                style: {
                    fill: '#999',
                    stroke: '#999'
                }
            },
            data: [
                {
                    name: '서울특별시',
                    coord: [126.978, 37.5665],
                    imageUrl: '서울특별시.svg',
                    offset: [0, 0.4],
                },
                {
                    name: '부산광역시',
                    coord: [129.1356, 35.2006],
                    imageUrl: '부산광역시.svg',
                    offset: [0.6, 0]
                },
                {
                    name: '대구광역시',
                    coord: [128.6514, 35.9714],
                    imageUrl: '대구광역시.svg',
                    offset: [1, 0]
                },
                {
                    name: '인천광역시',
                    coord: [126.6552, 37.4563],
                    imageUrl: '인천광역시.svg',
                    offset: [-0.6, 0]
                },
                {
                    name: '광주광역시',
                    coord: [126.813, 35.1195],
                    imageUrl: '광주광역시.svg',
                    offset: [-1, 0]
                },
                {
                    name: '대전광역시',
                    coord: [127.3845, 36.3504],
                    imageUrl: '대전광역시.svg',
                    offset: [[-0.1, -0.1],[-1.2, 0]]
                },
                {
                    name: '울산광역시',
                    coord: [129.3114, 35.5884],
                    imageUrl: '울산광역시.svg',
                    offset: [[1, 0]]
                },
                {
                    name: '세종특별자치시',
                    coord: [127.249, 36.5801],
                    imageUrl: '세종특별자치시.svg',
                    offset: [[-0.1, 0.3] ,[-1.2, 0]]
                },
                {
                    name: '제주특별자치도',
                    coord: [126.5312, 33.3996],
                    imageUrl: '제주특별자치도.svg',
                    offset: [[0, 0.2],[-0.8, 0]]
                },
                {
                    name: '전북특별자치도',
                    coord: [127.1088, 35.7475],
                    imageUrl: '전북특별자치도.svg',
                },
                {
                    name: '전라남도',
                    coord: [127.1877, 34.8679],
                    imageUrl: '전라남도.svg',
                },
                {
                    name: '경상남도',
                    coord: [128.244, 35.3598],
                    imageUrl: '경상남도.svg',
                },
                {
                    name: '경상북도',
                    coord: [128.7342, 36.5919],
                    imageUrl: '경상북도.svg',
                },
                {
                    name: '충청남도',
                    coord: [126.8054, 36.5588],
                    imageUrl: '충청남도.svg',
                },
                {
                    name: '충청북도',
                    coord: [127.8216, 36.9354],
                    imageUrl: '충청북도.svg',
                },
                {
                    name: '강원특별자치도',
                    coord: [128.3115, 37.8228],
                    imageUrl: '강원특별자치도.svg',
                },
                {
                    name: '경기도',
                    coord: [127.5096, 37.5751],
                    imageUrl: '경기도.svg',
                },
            ],
        },
    ],
};

let chart;

async function init() {
    chart = RealMap.createChartAsync(document, 'realmap', config, true);
}
