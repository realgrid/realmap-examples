

const $data = {
    '영국 처트시': [
        '영국',
        '독일',
        '프랑스',
        '이탈리아',
        '스페인',
        '네덜란드',
        '폴란드',
        '스웨덴',
        '헝가리',
        '체코',
        '오스트리아',
        '그리스',
        '루마니아',
        '포르투갈',
    ],
    '러시아 모스크바': ['러시아', '우크라이나', '카자흐스탄', '우즈베키스탄'],
    'UAE 두바이': [
        '아랍에미리트',
        '터키',
        '이라크',
        '요르단',
        '모로코',
        '이집트',
        '튀니지',
        '알제리',
    ],
    '인도 구르가온': ['인도', '방글라데시', '스리랑카', '네팔'],
    '남아공 요하네스버그': [
        '남아프리카 공화국',
        '케냐',
        '나이지리아',
        '가나',
        '에티오피아',
        '탄자니아',
        '우간다',
        '코트디부아르',
        '세네갈',
        '모잠비크',
    ],
    '중국 베이징': ['중화인민공화국'],
    '일본 도쿄': ['일본'],
    '싱가포르 싱가포르': [
        '싱가포르',
        '말레이시아',
        '태국',
        '베트남',
        '인도네시아',
        '필리핀',
        '호주',
    ],
    '미국 뉴저지': ['미국', '캐나다'],
    '브라질 상파울루': [
        '브라질',
        '아르헨티나',
        '칠레',
        '페루',
        '콜롬비아',
        '파나마',
    ],
};

let $selected = '브라질 상파울루';
const config = {
    title: false,
    // title: 'S전자 글로벌 네트워크',
    // subtitle: '지역 총괄',
    map: [
        {
            name: 'world',
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
            padding: '0 0 -40 0',
            exclude: ['ATA']
        },
    ],
    body: {
        // projection: 'miller',
        zoomable: true,
        // style: { fill: '#0088ff20' },
        style: { fill: '#fff' },
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
            height: 34,
            style: {
                fill: '#4170B7',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: 'S전자 글로벌 네트워크',
            offsetX: 40,
            offsetY: 20,
            style: {
                fontSize: '18pt',
                fontWeight: 700,
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            align: 'right',
            text: '지역총괄',
            offsetX: 20,
            offsetY: 26,
            backgroundStyle: {
                fill: '#4170B7',
                rx: 14,
                padding: '8 14',
            },
            style: {
                fill: '#fff',
                fontSize: '14pt',
                fontWeight: 500,
            },
        },
    ],
    series: [
        {
            name: 'map',
            mapKeys: ['name', 'id'],
            style: {
                fill: '#B4CBEF',
                stroke: '#fff',
            },
            data: $data[$selected].map((country) => ({ id: country })),
            // hoverColor: '#B4CBEF',
            hoverColor: '#83A8DC',
            hoverEffect: 'none',
        },
        {
            type: 'point',
            color: 3,
            onPointClick: async (e) => {
                $selected = e.name;
                if ($data[e.name]) {
                    chart.series.updateOption('data', $data[e.name].map((country) => ({ id: country })));
                    // config.series[0].data = $data[e.name].map((country) => ({ id: country })),
                    // await chart.loadAsync(config);
                }
            },
            style: {
                cursor: 'pointer'
            },
            styleCallback: (e) => {
                return {
                    fill:
                        e.name == $selected
                            ? '#FF6512'
                            : '#4170B7',
                    stroke: 'none',
                };
            },
            pointLabel: {
                text: '${name}<br>-${affiliate}',
                style: {
                    textShadow: '0px 0px 3px white',
                },
            },
            data: [
                {
                    name: '영국 처트시',
                    coord: [-0.5074, 51.387],
                    affiliate: '유럽 총괄',
                },
                {
                    name: '러시아 모스크바',
                    coord: [37.6173, 55.7558],
                    affiliate: 'CIS 총괄',
                },
                {
                    name: 'UAE 두바이',
                    coord: [55.296249, 25.276987],
                    affiliate: '중동 총괄',
                },
                {
                    name: '인도 구르가온',
                    coord: [77.0266, 28.4595],
                    affiliate: '서남아 총괄',
                },
                {
                    name: '남아공 요하네스버그',
                    coord: [28.0473, -26.2041],
                    affiliate: '아프리카 총괄',
                },
                {
                    name: '중국 베이징',
                    coord: [116.4074, 39.9042],
                    affiliate: '중국 총괄',
                },
                {
                    name: '일본 도쿄',
                    coord: [139.759455, 35.682839],
                    affiliate: '일본 총괄',
                },
                {
                    name: '싱가포르 싱가포르',
                    coord: [103.8198, 1.3521],
                    affiliate: '동남아 총괄',
                },
                {
                    name: '미국 뉴저지',
                    coord: [-74.4057, 40.0583],
                    affiliate: '북미 총괄',
                },
                {
                    name: '브라질 상파울루',
                    coord: [-46.6333, -23.5505],
                    affiliate: '중남미 총괄',
                },
            ],
        },
    ],
    tooltip: {
        text: '${name}',
    },
};

let chart;

function setActions(container) {
    createCheckBox(
        container,
        'Debug',
        function (e) {
            RealMap.setDebugging(_getChecked(e));
            chart.render();
        },
        false
    );
    createButton(container, 'Test', function (e) {});
}



const tool = {
    description: [
        '- ponint series click event로 map series의 데이터를 변경하는 예제입니다.'
    ],
    vars: {
        $data,
        $selected
    }
}

async function init() {
    const t1 = +new Date();

    console.log('RealMap v' + RealMap.getVersion());
    // RealMap.setDebugging(true);
    RealMap.setLogging(true);

    chart = await RealMap.createChartAsync(
        document,
        'realmap',
        config,
        true,
        () => {
            console.log('LOADED!');
        }
    );
    setActions('actions');
}
