const continentData = [
    { id: 'africa', name: '아프리카', color: "#196b95" },
    { id: 'antarctica', name: '남극', color: "" },
    { id: 'asia', name: '아시아', color: "#c48f48" },
    { id: 'europe', name: '유럽', color: "#b9b24d" },
    { id: 'north-america', name: '북아메리카', color: "#267194" },
    { id: 'south-america', name: '남아메리카', color: "#5a1f3e" },
    { id: 'oceania', name: '오세아니아', color: "#b1382f" },
    { id: 'antarctica', name: '남극', color: "" },
];

const config = {
    title: false,
    credits: {visible: false},
    map: [
        {
            url: `https://unpkg.com/realmap-collection/continent-low.geo.json`,
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
                fill: '#83A8DC',
            },
        },
        {
            front: true,
            type: 'text',
            text: '기본 지도들',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    tooltip: {
        mode: 'header',
        minHeight: 40,
    },
    series: [
        {
            style: {
                fill: 'var(--area-color-1)',
                stroke: '#fff',
                strokeWidth: 0.7,
            },
            hoverStyle: {
                stroke: '#5d5d5d'
            },
            tooltipText: '<t style="font-weight: bold;">${name}(${rm-id})</t>',
            data: continentData
        },
    ],
    exporting: {
        visible: true
    }
};

const tool = {
    actions: [
        {
            type: 'select',
            label: '지도 종류',
            value: '',
            miw: 200,
            data: ['continent', 'world', 'krSido', 'krSigungu', 'krDong', 'usaState', 'japan', 'china'],
            labels: [
                '대륙별 세계지도',
                '국가별 세계 지도',
                '대한민국 시/도',
                '대한민국 시/군/구',
                '대한민국 읍/면/동',
                '미국 주(state)별 지도',
                '일본',
                '중국'
            ],
            action: ({ value }) => {
                const continentData = [
                    { id: 'africa', name: '아프리카', color: "#196b95" },
                    { id: 'antarctica', name: '남극', color: "" },
                    { id: 'asia', name: '아시아', color: "#c48f48" },
                    { id: 'europe', name: '유럽', color: "#b9b24d" },
                    { id: 'north-america', name: '북아메리카', color: "#267194" },
                    { id: 'south-america', name: '남아메리카', color: "#5a1f3e" },
                    { id: 'oceania', name: '오세아니아', color: "#b1382f" },
                    { id: 'antarctica', name: '남극', color: "" },
                ];

                const sgisCredit = {
                    text: '©통계지리서비스',
                    url: `https://sgis.kostat.go.kr`,
                };
                const naturalEarthCredit = {
                    text: '©Natural Earth',
                    url: `https://www.naturalearthdata.com/`,
                };

                const dataList = {
                    continent: {
                        url: `https://unpkg.com/realmap-collection/continent-low.geo.json`,
                        credit: naturalEarthCredit,
                        data: continentData,
                    },
                    world: {
                        url: `https://unpkg.com/realmap-collection/world-low.geo.json`,
                        credit: naturalEarthCredit,
                    },
                    korea: {
                        url: `https://unpkg.com/realmap-collection/korea-mid.geo.json`,
                        credit: naturalEarthCredit,
                        exclude: [],
                    },
                    krSido: {
                        url: `https://unpkg.com/realmap-collection/kr-sido-low.geo.json`,
                        credit: sgisCredit,
                        exclude: [],
                        insets: [
                            RealMap.preset('울릉도'),
                            RealMap.preset('제주도'),
                            RealMap.preset('백령도'),
                        ],
                    },
                    krSigungu: {
                        url: `https://unpkg.com/realmap-collection/kr-sigun-low.geo.json`,
                        credit: sgisCredit,
                        exclude: [],
                        insets: [
                            RealMap.preset('울릉도'),
                            RealMap.preset('제주도'),
                            RealMap.preset('백령도'),
                        ],
                    },
                    krDong: {
                        url: `https://unpkg.com/realmap-collection/kr-dong-low.geo.json`,
                        credit: sgisCredit,
                        insets: [
                            RealMap.preset('읍면동_제주도'),
                            RealMap.preset('읍면동_백령도'),
                            RealMap.preset('읍면동_울릉도'),
                        ],
                    },
                    usaState: {
                        url: `https://unpkg.com/realmap-collection/usa-state-low.geo.json`,
                        credit: naturalEarthCredit,
                        exclude: ['AK', 'HI'],
                    },
                    japan: {
                        url: `https://unpkg.com/realmap-collection/japan-adm1-low.geo.json`,
                        credit: naturalEarthCredit,
                    },
                    china: {
                        url: `https://unpkg.com/realmap-collection/china-adm1-low.geo.json`,
                        credit: naturalEarthCredit,
                    },
                };

                const data = dataList[value];

                mapChart.loadAsync({
                    ...config,
                    map: [
                        {
                            url: data.url,
                            exclude: data.exclude,
                            insets: data.insets,
                        },
                    ],
                    body: {
                        projection: data.projection ?? 'mercator'
                    },
                    series: [
                        {
                            ...config.series[0],
                            useMapData: data.data ? false : true,
                            data: data.data ? data.data : undefined,
                        }
                    ]
                });
            },
        },
    ],
};

function setActions(container) {
    createButton(container, '대륙별 세계 지도', async function (e) {
        tool.actions[0].action({ value: 'continent' });
    });

    createButton(container, '국가별 세계 지도', async function (e) {
        tool.actions[0].action({ value: 'world' });
    });

    createButton(container, 'sido', async function (e) {
        tool.actions[0].action({ value: 'krSido' });
    });

    createButton(container, 'sigun', async function (e) {
        tool.actions[0].action({ value: 'krSigungu' });
    });

    createButton(container, 'dong', async function (e) {
        tool.actions[0].action({ value: 'krDong' });
    });

    createButton(container, '미국', async function (e) {
        tool.actions[0].action({ value: 'usaState' });
    });

    createButton(container, '일본', async function (e) {
        tool.actions[0].action({ value: 'japan' });
    });

    createButton(container, '중국', async function (e) {
        tool.actions[0].action({ value: 'china' });
    });

    createListBox(
        container,
        'series.style.fill',
        Array.from({ length: 10 }, (_, i) => `area-color-${i + 1}`),
        async function (e) {
            // config.series[0].color = `--area-color-${_getValue(e)}`;
            const color = `var(--${_getValue(e)})`;
            mapChart.series.updateOptions({
                style: {
                    fill: color,
                    // stroke: color,
                },
            });
            // await mapChart.loadAsync(config);
        },
        'area-color-1'
    );
}

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);

    setActions('actions');
}
