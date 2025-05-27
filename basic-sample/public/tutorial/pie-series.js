const config = {
    title: false,
    map: [
        { 
            url: '../realmap/maps/geojson/kr-sido-low.geo.json', 
            padding: '0.1 0'
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
                fill: '#FFD5A3',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '시도별 남녀 인구 구조',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    legend: { location: 'bottom' },
    series: [
        {
            name: '행정구역경계(시도)',
            dataUrl: '../data/kr-gender-ratio.json',
            mapKeys: ['b-code', 'code'],
            hoverColor: '#DBD4CE',
            tooltipText: false,
            style: {
                stroke: '#fff',
                strokeWidth: 0.7
            },
            pointColors: (args) => {
                const ratio = args.source.genderRatio;
                
                if (ratio < 1) return '#FFD5A3';
                return '#FCE7C8';
            },
            visibleInLegend: false,
        },
        {
            type: "pie",
            name: '시도별 남녀 인구 비율(남/녀)',
            minSize: 0.5,
            legendByCategory: true,
            categories: [
                { name: '남자', color: '#65AAEB'},
                { name: '여자', color: '#FD787F'}
            ],
            pointLabel: {
                textCallback: (args) => {
                    const { name, total, malePopulation, femalePopulation } = args.source;

                    const left = (malePopulation / total * 100).toFixed(2);
                    const right = (femalePopulation / total * 100).toFixed(2);

                    return `${name}<br />${left} / ${right}`;
                }
            },
            tooltipText: false,
            mapKeys: ['b-code', 'code'],
            dataUrl: '../data/kr-gender-ratio.json',
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
