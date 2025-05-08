const config = {
    title: false,
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json', 
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
                fill: '#83A8DC',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '본초자오선과 적도',
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
        projection: 'equalEarth',
        panX: -5,
        panY: -80,
        padding: '3, 3',
        zoomable: true,
        onZoomChanged: (args) => {
            if (!chart) {
                return;
            }

            let step = 10;

            if (args.zoom > 400) step = 5;
            else if (args.zoom > 200) step = 10;
            else step = 20;

            chart.updateOptions({
                axis: {
                    grid: {
                        line: {
                            step
                        }
                    }
                }
            });
        }
    },
    axis: {
        crosshair: true,
        grid: {
            visible: true,
            line: {
                step: 10
            }
        },
        guide: [{
            type: 'line',
            axis: 'lat',
            position: 66,
            style: { stroke: '#333', strokeWidth: '2px', strokeDasharray: '5' },
            label: {
                text: 'Arctic Circle 66°N',
            }
        }, {
            type: 'line',
            axis: 'lat',
            position: 23,
            style: { stroke: '#777' },
            label: {
                text: 'Tropic of Cancer 23°N',
            }
        }, {
            type: 'line',
            axis: 'lat',
            position: 0,
            style: { stroke: '#333', strokeWidth: '2px', strokeDasharray: '5' },
            label: {
                text: 'Equator 0°',
            }
        }, {
            type: 'line',
            axis: 'lat',
            position: -23,
            style: { stroke: '#777' },
            label: {
                text: 'Tropic of Capricorn 23°S',
            }
        }, {
            type: 'line',
            axis: 'lat',
            position: -66,
            style: { stroke: '#333', strokeWidth: '2px', strokeDasharray: '5' },
            label: {
                text: 'Antarctic Circle 66°S',
            }
        }, {
            type: 'band',
            axis: 'lat',
            from: 23,
            to: -23,
            style: { stroke: 'none', fill: 'orange', opacity: 0.5 },
        }],
    },
    series: [
        {
            name: '지도',
            useMapData: true,
            hoverColor: '#83A8DC',
            tooltipText: '<t style="font-size:14; font-weight: 700;">${name}(${iso-a3})</t>',
            style: {
                stroke: '#fff',
                fill: '#B4CBEF',
                strokeWidth: 0.7,
            },
        },
        {
            type: 'point',
            visibleInLegend: false,
            tooltipText: false,
            pointLabel: {
                text: '<t style="font-size: 16px;">${name}</t><br /><t style="font-size: 16px; opacity: 0.7;">경도 ${lon}°C</t><br /><t style="font-size: 16px; opacity: 0.7;">위도 ${lat}°C</t>',
                textCallback: ({source}) => {
                    if (source.name == '서울') {
                        return '<t style="font-size: 16px;">${name}</t>';
                    }
                },
            },
            style: {
                stroke: '#4170B7',
                strokeWidth: 2,
                fill: 'white'
            },
            data: [
                { name: '그리니치 천문대', coord: [-0.0015, 51.4779] },
                { name: '영점(Zero Point)', coord: [0, 0], color: '#4170B7' },
                { name: '서울', coord: [127.0610, 37.3045], color: '#4170B7' },
            ]
        },
        {
            type: 'point',
            visibleInLegend: false,
            tooltipText: false,
            pointLabel: {
                position: 'top',
                text: '<t style="font-size: 16px; opacity: 0.7;">경도 ${lon}°C</t><br /><t style="font-size: 16px; opacity: 0.7;">위도 ${lat}°C</t>'
            },
            style: {
                fill: 'none',
                stroke: 'none',
            },
            data: [
                { name: '서울', coord: [127.0610, 37.3045] },
            ]
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
