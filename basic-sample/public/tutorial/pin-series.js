const data = [
    { "name": "Yellowstone", "coord": [-110.5, 44.6], "type": "국립공원", "visitors": 4_128_000 },
    { "name": "Yosemite", "coord": [-119.5383, 37.8651], "type": "국립공원", "visitors": 3_677_000 },
    { "name": "Grand Canyon", "coord": [-112.1129, 36.1069], "type": "국립공원", "visitors": 4_484_000 },
    { "name": "Zion", "coord": [-113.0263, 37.2982], "type": "국립공원", "visitors": 4_147_000 },
    { "name": "Arches", "coord": [-109.5925, 38.7331], "type": "국립공원", "visitors": 1_585_000 },
    { "name": "Rocky Mountain", "coord": [-105.6836, 40.3428], "type": "국립공원", "visitors": 4_516_000 },
    { "name": "Glacier", "coord": [-113.7183, 48.6967], "type": "국립공원", "visitors": 2_900_000 },
    { "name": "Olympic", "coord": [-123.6044, 47.8021], "type": "국립공원", "visitors": 2_544_000 },
    { "name": "Sequoia", "coord": [-118.5658, 36.4864], "type": "국립공원", "visitors": 1_200_000 },
    { "name": "Acadia", "coord": [-68.21, 44.35], "type": "국립공원", "visitors": 3_800_000 },

    { "name": "Lake Tahoe", "coord": [-120.0324, 39.0968], "type": "호수" },
    { "name": "Lake Michigan", "coord": [-87.222, 43.4501], "type": "호수" },
    { "name": "Lake Superior", "coord": [-87.4, 47.7], "type": "호수" },
    { "name": "Lake Erie", "coord": [-81.2, 42.2], "type": "호수" },
    { "name": "Lake Ontario", "coord": [-77.9, 43.7], "type": "호수" },
    { "name": "Crater Lake", "coord": [-122.109, 42.9446], "type": "호수" },
    { "name": "Lake Powell", "coord": [-111.4846, 37.0361], "type": "호수" },
    { "name": "Lake Mead", "coord": [-114.7378, 36.154], "type": "호수" },
    { "name": "Lake Champlain", "coord": [-73.35, 44.65], "type": "호수" },
    { "name": "Lake Havasu", "coord": [-114.3658, 34.4839], "type": "호수" },
    { "name": "Flathead Lake", "coord": [-114.1605, 47.8825], "type": "호수" },

    { "name": "Mississippi River (New Orleans)", "coord": [-90.0715, 29.9511], "type": "강" },
    { "name": "Missouri River (Kansas City)", "coord": [-94.5786, 39.0997], "type": "강" },
    { "name": "Colorado River (Grand Junction)", "coord": [-108.5506, 39.0639], "type": "강" },
    { "name": "Columbia River (Portland)", "coord": [-122.675, 45.5051], "type": "강" },
    { "name": "Hudson River (New York)", "coord": [-73.9352, 40.7306], "type": "강" },
    { "name": "Ohio River (Cincinnati)", "coord": [-84.512, 39.1031], "type": "강" },
    { "name": "Tennessee River (Chattanooga)", "coord": [-85.3097, 35.0456], "type": "강" },
    { "name": "Snake River (Idaho Falls)", "coord": [-112.0341, 43.4917], "type": "강" },
    { "name": "Rio Grande (El Paso)", "coord": [-106.485, 31.7619], "type": "강" }
  ]
  
const config = {
    title: false,
    map: [
        {
            name: 'usa',
            url: '../realmap/maps/geojson/usa-state-low.geo.json',
            exclude: ['AK', 'HI'],
            padding: '0 3'
        },
        {
            name: 'world',
            url: '../realmap/maps/geojson/world-low.geo.json',
            exclude: ['MEX', 'CAN', 'CUB', 'HTI', 'DOM', 
                'JAM', 'BLZ', 'GTM', 'HND', 'PRI', 
                'BHS', 'CYM', 'BJN', 'SER', 'USG', 
                'TCA', 'BMU', 'VGB', 'VIR', 'SLV', 'NIC'],
        },
    ],
    legend: true,
    
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
                fill: '#3864A8',
            },
        },
        {
            front: true,
            type: 'text',
            text: '미국 자연 명소 30곳',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
        {
            front: true,
            type: 'text',
            text: '국립공원 방문자 통계: 2023년',
            offsetY: 20,
            height: 28,
            align: 'right',
            style: {
                fontSize: '10pt',
                fill: '#555'
            },
        },
    ],
    series: [
        {
            type: 'map',
            name: 'world',
            map: 'world',
            visibleInLegend: false,
            nullStyle: {
                opacity: 1,
                fill: '#D4DFE3',
                stroke: '#3864A8',
                strokeWidth: 10,
                filter: 'blur(1px)'
            }
        },
        {
            type: 'map',
            name: 'usa',
            map: 'usa',
            visibleInLegend: false,
            useMapData: true,
            tooltipText: '${name}' ,
            color: '#E5E5E5',
            hoverColor: '#bbb',
        },
        {
            type: 'bubble',
            name: '국립공원',
            style: {
                fill: '#79C3FF',
                stroke: '#1085E5',
                opacity: 0.3
            },
            minValue: 1e6,
            visibleInLegend: false,
            pointLabel: false,
            valueField: 'visitors',
            tooltipText: '${name} Visitors:<br><t style="font-weight:700;">${value}</t>',
            data: data.filter(r=>r.type=='국립공원')
        },
        {
            type: 'pin',
            name: '국립공원',
            // radius: 30,
            innerRadius: 0.5,
            style: {
                fill: '#1085E5',
                stroke: 'none',
                opacity: 1,
            },
            tooltipText: '${type}: <b>${name}</b>',
            data: data.filter(r=>r.type=='국립공원')
        },
        {
            type: 'pin',
            name: '호수',
            style: {
                fill: '#ED1B24',
                stroke: '#ED1B24',
                opacity: 1,
            },
            tooltipText: '${type}: <b>${name}</b>',
            data: data.filter(r=>r.type=='호수')
        },
        {
            type: 'pin',
            name: '강',
            style: {
                fill: '#FF8555',
                stroke: '#FF8555',
                opacity: 1,
            },
            tooltipText: '${type}: <b>${name}</b>',
            data: data.filter(r=>r.type=='강')
        },
    ],
};

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);
}
