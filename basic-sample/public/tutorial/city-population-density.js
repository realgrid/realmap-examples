let mapChart;

const config = {
    title: {
        visible: false,
    },
    credits: { 
        visible: false 
    },
    axis: { 
        crosshair: false 
    },
    map: [
        {
            url: '../maps/topojson/kr-sigun-low.topo.json',
            dokdo: 0.1,
            padding: '0.2',
            showDummies: true,
            insets: ['제주도', '울릉도'],
        },
        {
            url: '../maps/topojson/kr-sido-low.topo.json',
            needInternal: true,
            excludeInternal: 'NA',
            borders: [
                {
                    name: 'na',
                    border: ['NA', ['31', '32']],
                },
            ],
            insets: ['-제주도', '-울릉도'],
        },
    ],
    body: {
        projection: 'mercator',
    },
    colorScale: {
        location: 'right',
        offsetY: 100,
        barWidth: 40,
        barLength: 150,
        stepCount: 5,
        steps: [
            { from: 0, to: 77, color: '#f8ecd2', label: '' },
            { from: 77, to: 186, color: '#eedbb2', label: '76' },
            { from: 186, to: 1040, color: '#dfc89f', label: '185' },
            { from: 1040, to: 7879, color: '#d5b28d', label: '1039' },
            { from: 7879, color: '#c2996b', label: '7878' },
        ],
        nullStep: {
            visible: true,
            gap: 4,
            color: 'white',
            label: '자료 없음',
        },
        tick: {
            minVisible: false,
            maxVisible: false,
        },
        background: {
            style: {
                padding: '5px',
                stroke: 'gray',
            },
        },
        title: {
            text: '인구 밀도<t style="font-size: 0.8em;font-weight: normal;">(%, 등록 외국인 제외)</t>',
            gap: 6,
        },
    },
    series: [
        {
            name: '지도',
            dataUrl: '../data/city-population-density.json',
            valueField: '인구밀도',
            tooltipText: [
                '<t style="font-size: 18px; font-weight: 700;">${sido} ${name}</t>',
                '인구 밀도: <t style="font-weight: 700;">${value}</t>',
            ].join('<br />'),
            hoverColor: '#FBDEB5',
            style: {
                fill: '#B39066',
                stroke: '#08f',
                strokeWidth: '0.5',
            },
            onPointClick: (args) => {
                const sortedData = window.chartData.sort((v1, v2) => v2['인구밀도'] - v1['인구밀도']);
                const index = sortedData.findIndex((data) => data.id === args.source.id);
                
                if (index !== -1) {
                    window.realchart.xAxis.updateOption('guide', {
                        type: 'line',
                        front: true,
                        value: index,
                        style: {
                            stroke: '#BE5B50'
                        },
                        label: {
                            align: 'left',
                            text: args.name,
                            effect: 'background',
                            offsetY: 0,
                            offsetX: 0,
                            backgroundStyle: {
                                fill: '#BE5B50',
                                padding: '5px'
                            },
                            style: {
                                fill: '#fff',
                                fontWeight: 'bold'
                            }
                        }
                    });
                }
                return false;
            }
        },
        {
            map: 1,
            useMapData: true,
            colorScale: null,
            disabled: true,
            pointLabel: {
                visible: true,
                effect: 'outline',
                style: {
                    fontSize: '16px',
                },
            },
            internalBorder: {
                visible: true,
                style: { 
                    stroke: '#884400' 
                },
            },
            mapBorders: [
                {
                    name: 'na',
                    style: { 
                        stroke: '#555', 
                        strokeWidth: '1px', 
                        strokeDasharray: '3' 
                    },
                },
            ],
            style: { 
                stroke: 'none', 
                fill: 'transparent' 
            },
        },
        {
            type: 'point',
            style: {
                fill: 'black',
            },
            pointLabel: {
                effect: 'background',
                style: {
                    fontSize: '16px',
                },
                backgroundStyle: {
                    padding: '5px',
                    rx: '6',
                    fill: 'white',
                    stroke: 'gray',
                },
            },
        },
    ],
};

async function onChartLoaded(mapChart) {
    window.chartData = await fetch('../data/city-population-density.json').then((res) => res.json());

    if (mapChart.isDestroying()) return;

    const sortedData = window.chartData.sort((v1, v2) => v2['인구밀도'] - v1['인구밀도']);

    window.realchart = RealChart.createChart(document, 'realchart', {
        title: false,
        credits: false,
        legend: {
            visible: true,
            location: 'top',
            align: 'right',
        },
        xAxis: {
            label: {
                location: 'inside'
            }
        },
        yAxis: {
            label: {
                numberSymbols: '',
                numberFormat: ',0',
            },
            title: {
                text: '(명/km²)',
                align: 'end',
                rotation: 0,
                offset: -30,
                gap: -50,
            },
            guide: [
                {
                    type: 'line',
                    value: 5514,
                    style: {
                        stroke: 'red',
                        strokeWidth: '1px',
                        strokeDasharray: '5 5',
                    },
                    label: {
                        visible: true,
                        align: 'right',
                        text: '전국 평균 <t style="font-weight: normal">5514</t>',
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                        },
                    },
                },
            ],
        },
        series: {
            type: 'line',
            name: '인구밀도',
            data: sortedData,
            yField: '인구밀도',
            style: {
                stroke: '#B39066',
                strokeWidth: '3px',
            },
            marker: {
                radius: 0,
            },
        },
    });
}

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);

    await onChartLoaded(mapChart);
}
