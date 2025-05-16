

const data = [
    { "name": "서울특별시", "s_name": "서울", "pm2_5": 25, "pm10": 43, "coord": [126.9780, 37.5665], "offset": [0, 0.1] },
    { "name": "부산광역시", "s_name": "부산", "pm2_5": 19, "pm10": 40, "coord": [129.0756, 35.1796], "offset": [0.3, -0.2] },
    { "name": "대구광역시", "s_name": "대구", "pm2_5": 23, "pm10": 44, "coord": [128.6025, 35.8722] },
    { "name": "인천광역시", "s_name": "인천", "pm2_5": 26, "pm10": 48, "coord": [126.7052, 37.4563], "offset": [-1, 0] },
    { "name": "광주광역시", "s_name": "광주", "pm2_5": 25, "pm10": 57, "coord": [126.8526, 35.1595] },
    { "name": "대전광역시", "s_name": "대전", "pm2_5": 29, "pm10": 59, "coord": [127.3845, 36.3504], "offset": [0.1, -0.2] },
    { "name": "울산광역시", "s_name": "울산", "pm2_5": 25, "pm10": 49, "coord": [129.3114, 35.5384], "offset": [0.3, 0] },
    { "name": "경기도", "s_name": "경기", "pm2_5": 22, "pm10": 49, "coord": [127.5183, 37.4138] , "offset": [0.1, 0]},
    { "name": "강원특별자치도", "s_name": "강원", "pm2_5": 14, "pm10": 27, "coord": [128.1555, 37.8228], "offset": [0.1, 0]},
    { "name": "충청북도", "s_name": "충북", "pm2_5": 20, "pm10": 40, "coord": [127.4917, 36.6357], "offset": [0.8, 0.4] },
    { "name": "충청남도", "s_name": "충남", "pm2_5": 26, "pm10": 56, "coord": [126.8000, 36.5184], "offset": [-0.75, 0] },
    { "name": "전북특별자치도", "s_name": "전북", "pm2_5": 24, "pm10": 58, "coord": [127.1442, 35.7167], "offset": [-0.2 ,0] },
    { "name": "전라남도", "s_name": "전남", "pm2_5": 20, "pm10": 47, "coord": [126.4630, 34.8161], "offset": [0.8, -0.2] },
    { "name": "세종특별자치시", "s_name": "세종", "pm2_5": 24, "pm10": 44, "coord": [127.2890, 36.4800], "offset": [-0.1, 0.2] },
    { "name": "경상북도", "s_name": "경북", "pm2_5": 16, "pm10": 32, "coord": [128.8889, 36.4919] },
    { "name": "경상남도", "s_name": "경남", "pm2_5": 21, "pm10": 43, "coord": [128.2132, 35.4606], "offset": [0, -0.2] },
    { "name": "제주특별자치도", "s_name": "제주", "pm2_5": 17, "pm10": 52, "coord": [126.5312, 33.4996] }
].map(r => { 
    if (r.pm2_5 <= 15) {
        r['pm2_5_color'] = '#30a2ff';
    } else if(r.pm2_5 <= 35) {
        r['pm2_5_color'] = '#03c73c';   
    } else if(r.pm2_5 <= 75) {  
        r['pm2_5_color'] = '#fcc029';
    } else {
        r['pm2_5_color'] = '#e64746';
    }

    if (r.pm10 <= 50) {
        r['pm10_color'] = '#30a2ff';
    } else if(r.pm10 <= 100) {
        r['pm10_color'] = '#03c73c';   
    } else if(r.pm10 <= 250) {
        r['pm10_color'] = '#fcc029';
    }  else { 
        r['pm10_color'] = '#e64746';
    }

    // r['value'] = r.pm2_5;
    return r;
});
const config = {
    title: false,
    chart: {
        backgroundStyle: {
            backgroundColor: '#85c6f8'
        }
    },
    map: [
        {
            url: '../realmap/maps/geojson/kr-sido-low.geo.json',
            padding: '0.8 0 0.3 0',
            insets: [RealMap.preset('울릉도')],
            dokdo: 0.2,
        },
    ],
    body: {
        projection: 'mercator',
        zoomable: true,
    },
    colorScale: {
        maxColor: '#e64746',
        minColor: '#30a2ff',
        steps: [
            { label: '좋음', from: 0, to: 15, color: '#C3E4FF', toColor: '#30a2ff' },
            { label: '보통', from: 15, to: 35, color: '#B4EFC6', toColor: '#03c73c' },
            { label: '나쁨', from: 35, to: 75, color: '#FFE8C0', toColor: '#fcc029' },
            { label: '매우나쁨', from: 75, to: 100, color: '#F8C9C9', toColor: '#e64746' },
        ].map(c => ({ ...c, fromColor: c.color })),
        location: 'right',
        display: 'legend',
    },
    legend: {
        location: 'right',
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
                fill: '#03c73c',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '전국 미세먼지',
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
            type: 'map',
            name: '행정구역경계(시도)',
            tooltipText: '<b>${s_name}</b><br/>초미세먼지: ${pm2_5}',
            mapKeys: 'name',
            valueField: 'pm2_5',
            data,
            visibleInLegend: false,
            style: {
                opacity: 1,
            },
            hoverStyle: {
                stroke: 'white',
                fill: 'inherit',
                opacity: 0.8,
            },
        },
        {
            type: 'figure',
            name: '주요 지역 실거래가',
            figure: 'M36 .72H13.6S0 .72 0 14.4v2.88c0 14.4 13.6 14.4 13.6 14.4H27.2c1.1457 0 2.4 0 3.0546 1.1389l3.6874 3.3187c.8435.7591 2.2112.7591 3.0546 0l3.6874-3.3187C41.6 31.68 43.2 31.68 44 31.68H57.6s13.6.72 13.6-11.52V14.4C71.2.72 57.6.72 57.6.72Z',
            innerLabel: {
                text: '<t style="fill:${pm10_color}">${pm10}</t><t> / </t><t style="fill:${pm2_5_color}">${pm2_5}</t>',
                style: { fill: '#ccc', fontSize: '14px', fontWeight: 'bold', padding: '3 0 0 0' },
                lineHeight: 0.9,
            },
            pointLabel: {
                text: '${s_name}',
                style: {
                    fontSize: '12pt',
                }
            },
            tooltipText: false,
            data,
            style: {
                opacity: 1,
                fill: '#fff',
                strokeWidth: 3,
            },
            styleCallback: ({source}) => {
                return {
                    stroke: source.pm2_5_color,
                };
            },
            callout: {
                visible: true,
                layoutOnly: true
            },
            visibleInLegend: false,
        },
    ],
};



const tool = {
    description: [
        '- 리얼맵은 지역 위에 바 차트 등, 다양한 시리즈의 차트를 그릴 수 있습니다.',
    ],
};

let chart;

async function init() {
    RealMap.setLogging(true);
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
