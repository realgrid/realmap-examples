const clockConfig = {
    type: 'clock',
    size: 160,
    style: {},
    callout: true,
    face: {
        style: {
            opacity: 0.9,
            fill: 'rgba(0, 0, 35, 0.9)',
            filter: 'drop-shadow( 0px 0px 6px rgba(0, 0, 0, .6))'
        },
    },
    rim: {
        thickness: 8,
        style: {
            fill: 'white',
            stroke: 'white',
        },
    },
    hourHand: {
        thickness: 4,
        style: {
            fill: 'white',
            stroke: 'none',
        },
    },
    minuteHand: {
        style: {
            stroke: 'white',
        },
    },
    pin: {
        style: {
            stroke: 'red',
        },
    },
    tick: {
        length: 3,
        style: {
            stroke: 'white',
            strokeWidth: 3,
            strokeLinecap: 'round',
        },
    },
    tickLabel: {
        step: 3,
        offset: 4,
        style: {
            fontSize: '0.7em',
            fill: 'white',
        },
    },
    gaugeLabel: {
        style: {
            fill: '#ccc',
            opacity: 0.8,
        }
    },
    tooltipText: null,
};
const data = [
    { name: '뉴욕', coord: [-73.9385, 40.6643], target: [-90, -10], timezone: -60 * 4 },
    { name: '런던', coord: [-0.1277, 51.5073], target: [-30 , -10], timezone: 60 },
    { name: '뉴델리', coord: [77.209, 28.6139], target: [30, -10] },
    { name: '서울', coord: [126.734, 37.7151], target: [90, -10], timezone: 60 * 9 },
].map(r => {
    return { ...r, offset: [r.target[0] - r.coord[0], r.target[1] - r.coord[1]]};
})

const config = {
    title: false,
    map: [
        {
            name: 'nation',
            url: '../realmap/maps/geojson/world-low.geo.json',
            padding: '20 0 0 0',
            exclude: ['ATA']
        },
    ],
    body: {
        projection: 'equalearth',
        zoom: 140,
        panX: 6,
        panY: -10,
        zoomable: false,
    },
    axis: {
        grid: true,
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
                fill: '#464F5B',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '세계 시계',
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
            name: 'nation',
        },
        {
            type: 'point',
            pointColors: [
                'var(--color-1)',
                'var(--color-3)',
                'var(--color-4)',
                'var(--color-12)',
            ],
            data,
        },
        {
            ...clockConfig,
            pointLabel: {
                offset: 10,
                // position: 'top',
                style: {
                    fill: 'var(--color-1)',
                },
            },
            data: [data[0]],
            offset: [-2, 0],
        },
        {
            ...clockConfig,
            pointLabel: {
                offset: 10,
                style: {
                    fill: 'var(--color-3)',
                },
            },
            data: [data[1]],
        },

        {
            ...clockConfig,
            pointLabel: {
                offset: 10,
                style: {
                    fill: 'var(--color-4)',
                },
            },
            data: [data[2]],
        },
        {
            ...clockConfig,
            pointLabel: {
                offset: 10,
                style: {
                    fill: 'var(--color-12)',
                },
            },
            data: [data[3]],
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
