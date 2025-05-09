const config = {
    body: {
        projection: 'mercator',
    },
    title: '연간 이상기온',
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
            exclude: ['ATA']
        },
    ],
    
    series: [{
        pointLabel: false,
        mapKeys: ['iso-a3', 'code'],
        dataUrl: '../data/temperature-anomaly.json',
        hoverColor: '#c9dcf4',
        tooltipText: '${iso-a3} : ${anomaly}',
        pointColors: (args) => {
            const {anomaly} = args.source;

            if (anomaly < -1) return '#c9dcf4';
            if (anomaly < 0) return '#f2f6fc';
            if (anomaly < 1) return '#fff0f0';
            return '#ffc0c0';
        },
        style: {
            fill: '#e0ebf9',
            stroke: '#b0b0b0',
            strokeWidth: 2,
        },
    }]
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true, () => {});

    setActions('actions');
}
