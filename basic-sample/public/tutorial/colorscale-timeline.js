const config = {
    title: false,
    credits: {visible: false},
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
            url: '../maps/geojson/world-low.geo.json',
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
        steps: [
            { from: -4.5, to: -2, color: '#6794dc' },
            { from: -2, to: -1.5, color: '#78a9e2' },
            { from: -1.5, to: -1, color: '#a4c6ec' },
            { from: -1, to: -0.5, color: '#f2f6fc' },
            { from: -0.5, to: 0, color: '#fff0f0' },
            { from: 0, to: 0.5, color: '#ffc0c0' },
            { from: 0.5, to: 1, color: '#ff9494' },
            { from: 1, to: 1.5, color: '#ff5757' },
            { from: 1.5, to: 2, color: '#ff2323' },
            { from: 2, to: 2.5, color: '#b10303' },
        ],
    },
    series: [
        {
            name: 'worldmap',
            useMapData: true,
            color: 'white',
            hoverColor: '#808080',
            tooltipText: '<b>${name}</b><br/><t>온도편차: ${value}°C</t>',
            style: {
                stroke: '#6d6d6d',
                strokeWidth: 0.5,
            },
        },
    ],
};

const NEW_LINE = '\n'

const onChartLoaded = async (mapChart) => {
    const sliderId = 'timeline-component';
    const anomalies = await fetch(
        '../data/temperature-anomaly-full.csv'
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

    const container = document.getElementById(sliderId);
    const slider = container.querySelector('.timeline-slider');
    const toggleButton = container.querySelector('.timeline-toggle');
    const indicator = container.querySelector('.timeline-indicator');

    let playLock = true;
    let timeoutPointer = null;

    const render = (tick = 0) => {
        if (mapChart.isDestroying()) {
            return;
        }

        const currentYear = startYear + tick;

        slider.value = tick;
        indicator.innerText = `${currentYear}년`;

        const currentDataList = annualData[currentYear];

        const mapSeries = mapChart.seriesByName('worldmap');

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

    initComponents();
    play(0);
};

function setActions(container) {
    createTimelineSlider(container);
}

let mapChart;

async function init() {
    mapChart = await RealMap.createChartAsync(document, 'realmap', config, true);

    setActions('actions');
    onChartLoaded(mapChart, { sliderId: 'timeline-component' });
}
