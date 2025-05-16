const data = [
    {
        name: '서울 구로구청장',
        coord: [126.889, 37.4954],
        imageUrl: '더불어민주당.svg',
        party: '더불어민주당',
        elect: '장인홍',
        offset: [[-2, 0], [-0.1, 0.2]]
    },
    {
        name: '충남 아산시장',
        coord: [126.9711, 36.7926],
        imageUrl: '더불어민주당.svg',
        party: '더불어민주당',
        elect: '오세현',
        offset: [[-2, 0], [-0.1, -0.1]]
    },
    {
        name: '전남 담양군수',
        coord: [126.9874, 35.3216],
        imageUrl: '조국혁신당.svg',
        party: '조국혁신당',
        elect: '정철원',
        offset: [[-1.8, 0], [-0.1, 0.2]]
    },
    {
        name: '경북 김천시장',
        coord: [128.1189, 36.1398],
        imageUrl: '국민의힘.svg',
        party: '국민의힘',
        elect: '배낙호',
        offset: [[2, 0], [0.1, 0.2]]
    },
    {
        name: '경남 거제시장',
        coord: [128.6217, 34.8806],
        imageUrl: '더불어민주당.svg',
        party: '더불어민주당',
        elect: '변광용',
        offset: [[1.5, 0], [0.1, 0.2]]
    }
];
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
            insets: [RealMap.preset('울릉도', { frame: undefined,  })],
            dokdo: 0.1,
        }
    ],

    body: {
        projection: 'miller',
        zoomable: false,
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
                fill: '#83A8DC',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '기초자치단체장 선거결과',
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
            useMapData: true,
            tooltipText: false,
            // hoverColor: 'var(--area-color-1)',
            hoverStyle: { fill: 'inherited '},
            style: {
                fill: '#dadada'
            }
        },
        {
            type: 'panel',
            minWidth: 140,
            header: {
                style: {
                    strokeWidth: 0,
                    fill: '#fff'
                },
                backgroundStyle: {
                    fill: '#004EA1',
                    stroke: '#004EA1'
                },
            },
            body: {
                text: '<t>${elect}</t> <t style="fill:#004EA1;font-weight:800;">당선</t>',
                backgroundStyle: {
                    stroke: 'none'
                }
            },
            callout: {
                visible: true,
                anchorPoint: false,
                style: {
                    stroke: '#004EA1',
                }
            },
            style: {
                stroke: '#004EA1',
                strokeWidth: 2
            },
            data: data.filter(r => r.party == '더불어민주당')
        },
        {
            type: 'panel',
            minWidth: 140,
            header: {
                style: {
                    stroke: 'none',
                    fill: '#fff'
                },
                backgroundStyle: {
                    fill: '#D1333E',
                    stroke: '#D1333E'
                },
            },
            body: {
                text: '<t>${elect}</t> <t style="fill:#D1333E;font-weight:800;">당선</t>',
                backgroundStyle: {
                    stroke: 'none'
                }
            },
            callout: {
                visible: true,
                anchorPoint: false,
                style: {
                    stroke: '#D1333E'
                }
            },
            style: { 
                stroke: '#D1333E',
                strokeWidth: 2
            },
            data: data.filter(r => r.party == '국민의힘')
        },
        {
            type: 'panel',
            minWidth: 140,
            header: {
                style: {
                    strokeWidth: 0,
                    fill: '#fff'
                },
                backgroundStyle: {
                    fill: '#006CB6',
                    stroke: '#006CB6'
                },
            },
            body: {
                text: '<t>${elect}</t> <t style="fill:#006CB6;font-weight:800;">당선</t>',
                backgroundStyle: {
                    stroke: 'none'
                }
            },
            callout: {
                visible: true,
                anchorPoint: false,
                style: {
                    stroke: '#006CB6'
                }
            },
            style: { 
                stroke: '#006CB6',
                strokeWidth: 2
            },
            data: data.filter(r => r.party == '조국혁신당')
        },
        {
            type: 'image',
            imageWidth: 64,
            imageHeight: 64,
            position: 'center',
            style: {
                opacity: 1,
            },
            tooltipText: null,
            rootUrl: '../images/parties/',
            data
        },
    ],
};

let chart;

async function init() {
    chart = RealMap.createChartAsync(document, 'realmap', config, true);
}
