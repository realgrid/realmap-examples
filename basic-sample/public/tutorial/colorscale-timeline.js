/**
 * @demo
 *
 * 연간 기온 이상현상
 * 데이터 출처: https://ourworldindata.org/grapher/annual-temperature-anomalies?tab=table
 */
const config = {
    title: false,
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
                fill: '#59B2CB',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '연간 기온 이상현상(1940 ~ 2024)',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700,
            },
        },
    ],
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-low.geo.json',
            exclude: ['ATA'],
        },
    ],
    
    body: {
        projection: 'equalEarth',
    },
    axis: {
        grid: true,
    },
    colorScale: {
        maxColor: '#b10303',
        stepCount: 9,
        // nullStyle: {
        //     fill: 'white',
        // },
        // showNull: false,
        // -4.3122134 2.4297276
        steps: [
            { from: -4.5, to: -2, color: '#D0EFFF' },
            { from: -2, to: -1.5, color: '#B0DFF1' },
            { from: -1.5, to: -1, color: '#76C1D8' },
            { from: -1, to: -0.5, color: '#59B2CB' },
            { from: -0.5, to: 0, color: '#fff' },
            { from: 0, to: 0.5, color: '#E0B2D8' },
            { from: 0.5, to: 1, color: '#BE9ECD' },
            { from: 1, to: 1.5, color: '#9F8CC2' },
            { from: 1.5, to: 2, color: '#7E79B7' },
            { from: 2, to: 2.5, color: '#5E66AC' },
        ],
    },
    series: [
        {
            name: 'worldmap',
            useMapData: true,
            color: 'white',
            hoverColor: '#808080',
            //tooltipText: '<t style="font-size: 20px; font-weight: 700;">${name}</t><br /><t style="opacity: 0.7; font-weight: 700;">온도편차: ${value}°C</t>',
            tooltipText: '<b>${name}</b><br/><t>온도편차: ${value}°C</t>',
            style: {
                stroke: '#6d6d6d',
                strokeWidth: 0.5,
            },
        },
    ],
};



const NEW_LINE = '\n'

const onChartLoaded = async (chart) => {
    const sliderId = 'timeline-component';
    /**
     * 상태
     */
    const anomalies = await fetch(
        '/realmap/assets/data/temperature-anomaly-full.csv'
    ).then((res) =>
        res.text().then((data) =>
            data
                .split(NEW_LINE)
                .filter((v) => v)
                .filter((_, i) => i > 0)
                .map((line) => {
                    const [name, code, year, anomaly] = line
                        .split(',')
                        .map((v) => v.trim());

                    return {
                        name,
                        code,
                        year: +year,
                        anomaly: +anomaly,
                    };
                })
        )
    );
    const annualData = {};

    // Date
    let startYear = 2025;
    let endYear = 1940;

    for (const anomaly of anomalies) {
        const yearData = annualData[anomaly.year] ?? [];

        yearData.push(anomaly);
        startYear = Math.min(startYear, anomaly.year);
        endYear = Math.max(endYear, anomaly.year);

        annualData[anomaly.year] = yearData;
    }

    const stepCount = endYear - startYear;

    // Elements
    const container = document.getElementById(sliderId);
    const slider = container.querySelector('.timeline-slider');
    const toggleButton = container.querySelector('.timeline-toggle');
    const indicator = container.querySelector('.timeline-indicator');

    // Mutable
    let playLock = true;
    let timeoutPointer = null;

    const render = (tick = 0) => {
        const currentYear = startYear + tick;

        slider.value = tick;
        indicator.innerText = `${currentYear}년`;

        const currentDataList = annualData[currentYear];

        const mapSeries = chart.seriesByName('worldmap');

        for (const currentData of currentDataList) {
            const point = mapSeries.pointByProp('iso-a3', currentData.code);

            if (!point) {
                continue;
            }

            mapSeries.updatePoint(point, { value: currentData.anomaly });
        }
    };

    const play = (timeStep = 0) => {
        toggleButton.innerText = '▮▮';
        render(+timeStep);

        // 다음 렌더 함수 호출
        if (timeStep < stepCount) {
            timeoutPointer = setTimeout(() => {
                play(timeStep + 1);
            }, 200);
        } else {
            playLock = false;
            pause();
        }
    };

    const pause = () => {
        if (timeoutPointer) {
            clearTimeout(timeoutPointer);
        }

        toggleButton.innerText = '▶︎';
        timeoutPointer = null;
    };

    /**
     * 컴포넌트 초기화
     */
    const initComponents = () => {
        slider.min = 0;
        slider.max = stepCount;

        slider.value = 0;

        slider.addEventListener('input', (e) => {
            const currentIndex = e.target.value;

            playLock = false;
            pause();
            render(+currentIndex);
        });

        toggleButton.addEventListener('click', () => {
            if (playLock) {
                playLock = false;
                pause();
            } else {
                playLock = true;
                play(+slider.value);
            }
        });
    };

    /**
     * 로직 호출
     */
    initComponents();
    play(0);
};

const tool = {
    description: [
        '- 컬러스케일은 값의 범위마다 색상을 지정할 수 있습니다.',
        '- 이를 통해, 지역의 값에 따라 지정한 배경색이 칠해지도록 구현할 수 있습니다.',
        '- 또한, 맵 시리즈의 `pointByProp` API를 통해 지도 속성의 값으로 대상 지역의 객체를 찾을 수 있습니다.',
        '- 맵 시리즈의 `updatePoint` API를 통해 지역의 값을 수정하면, 실시간으로 맵차트에 반영됩니다.',
    ],
    actions: [
        {
            type: 'timeline',
            sliderId: 'timeline-component',
        },
    ],
    events: {
        onChartLoaded,
    },
};

function setActions(container) {
    createTimelineSlider(container);
}

let chart;

async function init() {
    chart = await RealMap.createChartAsync(document, 'realmap', config, true);

    setActions('actions');
    onChartLoaded(chart, { sliderId: 'timeline-component' });
}
