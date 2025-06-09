const config = {
    chart: {
        backgroundStyle: {
            backgroundColor: '#F2F1EF',
        },
    },
    map: [
        {
            url: '../maps/geojson/world-low.geo.json',
            exclude: ['ATA'],
        },
    ],
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
                fill: '#793212',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '2024 Peak Hours Spent in congestion',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    title: false,
    body: {
        projection: 'mercator',
        style: {
            // fill: '#F2F1EF',
        },
    },
    axis: {
        grid: false,
    },
    series: [
        {
            type: 'map',
            nullStyle: { fill: '#DBD4CE', stroke: '#fff' },
        },
        {
            type: 'bubble',
            name: 'bubble',
            dataUrl: '../data/INRIX_2024_Global_Traffic_Scorecard.json',
            callout: true,
            minSize: 50,
            maxSize: 80,
            nameField: 'city',
            pointLabel: {
                text: '<t>${value}</t>h<br><t wrap style="font-size:8pt;font-weight:normal">${city}</t>',
                styleCallback: (e) => {
                    // console.log(e);
                    return {
                        fontSize: Math.max(10, ~~e.value / 4),
                        fill: '#fff',
                    };
                },
                textCallback: (e) => {
                    if (e.value < 70 && e.id.indexOf(' ') > 0) {
                        const wrapText = e.id
                            .split(' ')
                            .map(
                                (text) =>
                                    `<t style="font-size:8pt;font-weight:normal">${text}</t>`
                            )
                            .join('<br>');
                        return `<t>${e.value}</t>h<br>${wrapText}`;
                    }
                },
                style: {
                    // textShadow: '#793212 1px 0px 5px',
                },
            },
            styleCallback: (e) => {
                let fill;
                if (e.value > 104) {
                    fill = '#E58C3C';
                } else if (e.value >= 80) {
                    fill = '#C14500';
                } else {
                    fill = '#793212';
                }
                return {
                    fill,
                    stroke: 'none',
                };
            },
            valueField: 'delay_2024',
            idField: 'city',
        },
    ],
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
    createCheckBox(
        container,
        'Zoomable',
        async function (e) {
            config.body.zoomable = _getChecked(e);
            await chart.loadAsync(config);
        },
        true
    );
}

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
    setActions('actions');
}
