
const config = {
    title: '대한민국 시도',
    chart: {
        style: {
            padding: '10',
        },
    },
    map: [
        { 
            name: 'sido', 
            url: '../map/wooritech/v1/maps/geojson/kr-sido-low.geo.json', 
        },
    ],

    body: {
        projection: 'mercator',
        scrollable: true,
    },
    legend: false,
    series: [
        {
            name: 'sido',
            mapKeys: ['name', 'id'],
            // visible: false,
            style: {
                // fill: '#00eeff',
                stroke: 'white',
                strokeWidth: '2px',
            },
            pointLabel: {
                visible: true,
                style: {
                    fill: '#fff',
                    filter: 'url(#rm-shadow-filter)',
                },
            },
            tooltipText: '${name}',
            data: [
                { id: '전북특별자치도' },
                { id: '전라남도' },
                { id: '광주광역시' },
                { id: '제주특별자치도' },
                { id: '경상남도' },
                { id: '경상북도' },
                { id: '충청남도' },
                { id: '충청북도' },
                { id: '강원특별자치도' },
                { id: '경기도' },
                { id: '서울특별시' },
                { id: '부산광역시' },
                { id: '인천광역시' },
                { id: '대구광역시' },
                { id: '광주광역시' },
                { id: '대전광역시' },
                { id: '울산광역시' },
                { id: '세종특별자치시' },
            ],
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
    createButton(container, 'Test', function (e) {
        alert('Test!');
    });
    createButton(container, 'Remove', function (e) {
        const ser = chart.seriesByType('route');
        ser.removeLast();
    });
}

let opacity = 0;

async function init() {
    console.log('RealMap v' + RealMap.getVersion());
    // RealMap.setDebugging(true);
    RealMap.setLogging(true);

    chart = RealMap.createChartAsync(document, 'realmap', config, true, () => {
        console.log('LOADED!');
    });

    setActions('actions');
}
