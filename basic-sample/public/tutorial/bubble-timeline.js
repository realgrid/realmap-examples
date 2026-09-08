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
                fill: '#ff5757',
            },
        },
        {
            front: true,
            type: 'text',
            text: '2000년 1월 ~ 2025년 2월 한반도, 일본 인근 지진(규모 6 이상) 현황',
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
            url: '../maps/geojson/world-high.geo.json',
            exclude: ['ATA'],
            padding: '6 0 0 0',
        },
    ],
    body: {
        projection: 'mercator',
        zoom: 1000,
        panX: 152,
        panY: 10,
        style: {
            fill: '#E0EBF9',
        },
    },
    series: [
        {
            name: '지도',
            useMapData: true,
            hoverColor: '#83A8DC',
            style: {
                fill: '#B4CBEF',
                strokeWidth: 1,
                stroke: '#fff',
            },
        },
        {
            type: 'bubble',
            name: 'earthquakeBubble',
            legend: -1,
            tooltipText:
                '<t style="font-size: 18px">${place}</t><br /><t>${value}</t>',
            pointLabel: {
                textCallback: function (args) {
                    const mag = args.source.value;

                    const m9 = '<t style="font-size: 25px;">${baseValue}</t><br /><t style="font-size: 24px; opacity: 0.8;">${place}</t>';
                    const m8 = '<t style="font-size: 10px;">${baseValue}</t>';

                    if (mag <= 7.5) return ' ';
                    if (mag <= 8) return m8;
                    else return m9;
                },
                effect: 'outline',
            },
            style: {
                strokeWidth: 0,
                fill: '#ff5757',
            },
            sizeMode: 'width',
            minValue: 6,
            maxValue: 9.1,
            minSize: 30,
            maxSize: 100,
            data: [],
        },
    ],
};

const onChartLoaded = async (mapChart) => {
    const sliderId = 'timeline-component';
    const rawData = await fetch('../data/earth-quake.json').then((res) =>
        res.json()
    );

    const originalQuakes = rawData.map((quake) => ({
        id: quake.id,
        coord: [quake.longitude, quake.latitude],
        value: quake.mag,
        time: quake.time,
        place: quake.place,
    }));

    const container = document.getElementById(sliderId);
    const slider = container.querySelector('.timeline-slider');
    const toggleButton = container.querySelector('.timeline-toggle');
    const indicator = container.querySelector('.timeline-indicator');

    const msOfDay = 864e5;
    const startTime = new Date(2000, 0, 1, 0, 0, 0);
    const firstDate = new Date(originalQuakes[0].time);
    const lastDate = new Date(originalQuakes[originalQuakes.length - 1].time);
    const lastYear = lastDate.getFullYear();
    const fistYear = firstDate.getFullYear();
    const totalMonth = (lastYear - fistYear) * 12 + lastDate.getMonth() + 1;
    const BUBBLE_LIFETIME = 365;

    let playLock = true;
    let timeoutPointer = null;

    const render = (tick = 0) => {
        if (mapChart.isDestroying()) {
            return;
        }

        const currentTime = new Date(startTime);
        currentTime.setMonth(currentTime.getMonth() + tick);

        slider.value = tick;
        indicator.innerText = `${currentTime.getFullYear()}년 ${
            currentTime.getMonth() + 1
        }월`;

        const bubbleSeries = mapChart.seriesByType('bubble');

        const fromTime = currentTime.getTime() - BUBBLE_LIFETIME * msOfDay;
        const toTime = currentTime.getTime() + 30 * msOfDay;
        const recentQuakes = [];
        const prevPoints = bubbleSeries.findAll();

        for (const quake of originalQuakes) {
            const targetDate = new Date(quake.time).getTime();
            if (fromTime <= targetDate && targetDate <= toTime) {
                recentQuakes.push(quake);
            }
        }

        bubbleSeries.removePointList(
            bubbleSeries
                .findAll()
                .filter(
                    (p) =>
                        !recentQuakes.some(
                            (recentQuake) => recentQuake.id === p.id
                        )
                )
        );

        bubbleSeries.addPointList(
            recentQuakes.filter(
                (currentQuake) =>
                    !prevPoints.some((q) => q.id === currentQuake.id)
            )
        );
    };

    const play = (timeStep = 0) => {
        toggleButton.innerText = '▮▮';
        render(+timeStep);

        if (timeStep < totalMonth) {
            timeoutPointer = setTimeout(() => {
                play(timeStep + 1);
            }, 500);
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
        slider.max = totalMonth;

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
    onChartLoaded(mapChart);
}
