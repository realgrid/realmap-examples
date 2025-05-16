const config = {
    title: false,
    map: [
        {
            url: '../realmap/maps/geojson/kr-sido-low.geo.json',
            padding: '0.8 0 0 0',
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
                fill: '#628ECB',
            },
        },
        {
            front: true,
            type: 'text',
            text: '지역별 최저 기온',
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
            name: '시도',
            nullStyle: {
                fill: '#B4CBEF',
                stroke: '#fff'
              },
        },
        {
            type: 'panel',
            name: '최저 기온',
            tooltipText: false,
            header: {
                backgroundStyle: (args) => {
                    return {fill: 'red'}
                },
                style: { 
                    fill: 'white',
                    fontWeight: 'bold'
                } ,
            },
            body: {
                text: '${tempMin}℃',
                    style: {
                    fontSize: '14px'
                },
                
            },
            style: {
                strokeWidth: 1,
                stroke: '#4A83B8',
            },
            dataUrl: '../data/kr-sido-weather.json',
        }
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
