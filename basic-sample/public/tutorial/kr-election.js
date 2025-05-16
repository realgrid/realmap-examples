const LEE_COLOR = '#78a9e2';
const YOON_COLOR = '#ff5757';
const SIM_COLOR = '#ffda46';
const ETC_COLOR = '#96BC73';

const categories = [
    { name: '이재명', color: LEE_COLOR },
    { name: '윤석열', color: YOON_COLOR },
    { name: '심상정', color: SIM_COLOR },
    { name: '기타', color: ETC_COLOR },
];
const tooltipText = [
    '<t style="font-size: 14px; font-weight: 700;">${name}</t><br />',
    '<t style="">이재명: </t><t style="opacity: 1;">${lee}표</t>',
    '<t style="">윤석열: </t><t style="opacity: 1;">${yoon}표</t>',
    '<t style="">심상정: </t><t style="opacity: 1;">${sim}표</t>',
].join('<br />');


const config = {
    title: {
        visible: false,
    },
    map: [
        {
            url: '../realmap/maps/geojson/kr-sido-low.geo.json',
            padding: '3 0 0.8 2.5',
        },
    ],
    body: {
        projection: 'mercator',
        style: {
            fill: 'none'
        }
    },
    annotation: [
        {
            front: true, offsetX: 20, offsetY: 20,
            text: '2022 대선 제 20대 대통령 선거 결과 (개표 100%)',
            style: { textAlign: 'right', fill: 'black', fontSize: 20, fontWeight: 700 },
        },
        {
            front: true, offsetX: 20, offsetY: 50,
            text: '선거인수: <t style="font-weight: 700;">44,197,692</t>명',
            style: { textAlign: 'right', fill: 'black', fontSize: 15 },
        },
        {
            front: true, offsetX: 190, offsetY: 50,
            text: '총 투표자 수: <t style="font-weight: 700;">34,067,853</t>명',
            style: { textAlign: 'right', fill: 'black', fontSize: 15 },
        },
        {
            front: true, offsetX: 380, offsetY: 50,
            text: '무효 투표수: <t style="font-weight: 700;">307.542</t>명',
            style: { textAlign: 'right', fill: 'black', fontSize: 15 },
        },
        {
            front: true, offsetX: 545, offsetY: 50,
            text: '기권수: <t style="font-weight: 700;">10,129,839</t>명',
            style: { textAlign: 'right', fill: 'black', fontSize: 15 },
        },
    ],
    series: [
        {
            name: '지도',
            dataUrl: '../data/elections.json',
            tooltipText,
            visibleInLegend: false,
            pointColors: (args) => {
                const {lee, yoon} = args.source;
                
                return lee >= yoon ? '#78a9e2' : '#ff5757';
            },
            hoverColor: '#b0b0b0',
            style: {
                stroke: 'white',
                fill: '#e0ebf9',
                strokeWidth: 0.7,
            },
        },
        {
            type: 'bar',
            name: '시도별 통계',
            visibleInLegend: false,
            categories,
            width: 60,
            valueField: 'percents',
            tooltipText: tooltipText,
            baseLine: {
                style: { stroke: '#686868',
                    strokeWidth: 0.7,
                },
            },
            style: {
                stroke: 'none',
                fill: '#4f4f4f',
                opacity:1,
            },
            pointLabel: {
                text: [
                    '<t style="font-size: 14px">${name}</t>',
                ].join('<br />')
            },
            dataUrl: '../data/elections.json',
            callout: {
                visible: true,
                style: {
                    stroke: '#fff',
                    strokeWidth: 1,
                    fill: 'black'
                }
            },
        },
        {
            type: 'pie',
            name: '전체 통계',
            radius: 40,
            categories,
            style: {
                opacity: 1,
            },
            legendByCategory: true,
            styleCallback: () => ({ stroke: 'none'}),
            tooltipText: false,
            pointLabel: {
                text: [
                    '<t style="font-size: 18px; font-weight: 700;">${name}</t><br />',
                    '<t style="width: 30px;">이재명: </t><t style="opacity: 1;">16,147,738표</t>',
                    '<t style="width: 30px;">윤석열: </t><t style="opacity: 1;">16,394,815표</t>',
                    '<t style="width: 30px;">심상정: </t><t style="opacity: 1;">803,358표</t>',
                    '<t style="width: 30px;">기타ㅤ: </t><t style="opacity: 1;">721,942표</t>',
                ].join('<br />'),
            },
            data: [
                {
                    value: [ 16147738, 16394815, 803358, 721942 ],
                    coord: [ 122.5, 38.2 ]
                }
            ]
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
