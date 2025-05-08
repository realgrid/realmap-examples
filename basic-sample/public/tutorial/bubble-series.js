const config = {
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/kr-sigun-low.geo.json',
            showDummies: true,
            padding: '0.8 0 0 0',
            insets: [
                RealMap.preset('울릉도', {
                    frame: undefined,
                    style: {
                        stroke: '#2286e3',
                        strokeWidth: '1px',
                        strokeDasharray: '4 4',
                    },
                }),
            ],
        },
    ],
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
                fill: '#4492F5',
            },
        },
        {
            front: true,
            type: 'text',
            text: '2024년 2월 전국 경제활동인구',
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
    },
    colorScale: {
        maxColor: '#4492F5',
        minColor: '#E0EBF9',
        steps: [
            { from: 0, to: 50, color: '#E0EBF9' },
            { from: 50, to: 100, color: '#BFD7F7' },
            { from: 100, to: 200, color: '#9DC3F4' },
            { from: 200, to: 300, color: '#7AAFF1' },
            { from: 300, color: '#5A9BEF' },
        ],
        location: 'right',
    },
    bubbleScale: {
        location: 'body',
        verticalAlign: 'bottom',
        align: 'right',
        offsetY: 10,
        steps: [1000, 5000, 10000],
        tick: {
            label: {
                numberFormat: ',0'
            }
        }
    },
    series: [
        {
            name: '행정구역경계(시군구)',
            tooltipText: '${name}<br/>${value;;#,0.#}명',
            mapKeys: ['b-code', 'id'],
            visibleInLegend: false,
            dataUrl: '../data/active-population.json',
            hoverColor: `#C3C3C3`,
            style: {
                stroke: '#fff',
                strokeWidth: 0.5,
            },
        },
        {
            type: 'bubble',
            name: '시도별 경제활동인구',
            pointLabel: {
                text: '${name}<br><t style="opacity:0.7">${laborForce;;#,0.#}</t>',
                effect: 'outline',
            },
            minSize: 30,
            style: {
                fill: '#FFDB9A',
                stroke: '#FFAB70',
                strokeWidth: 1.5,
            },
            mapKeys: ['b-code', 'b-code'],
            valueField: 'laborForce',
            dataUrl: '../data/sido-labor-force.json',
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
