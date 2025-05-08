
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
                fill: '#ff5757',
            },
        },
        {
            front: true,
            // scope: 'body',
            type: 'text',
            text: '2000년 1월 ~ 2025년 2월 한반도, 일본 인근 지진(규모 6 이상) 현황',
            offsetX: 40,
            offsetY: 20,
            height: 28,
            style: {
                fontSize: '15pt',
                fontWeight: 700
            }
        },
    ],
    map: [
        {
            url: '../map/wooritech/v1/maps/geojson/world-high.geo.json',
            exclude: ['ATA'],
            padding: '6 0 0 0'
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
            visibleInLegend: false,
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



const onChartLoaded = async (chart) => {
    const sliderId = 'timeline-component';
    /**
     * 상태
     */
    const rawData = await fetch('/realmap/assets/data/earth-quake.json').then((res) =>
        res.json()
    );

    // 데이터 가공
    const originalQuakes = rawData.map((quake) => ({
        id: quake.id,
        coord: [quake.longitude, quake.latitude],
        value: quake.mag,
        time: quake.time,
        place: quake.place,
    }));

    // Elements
    const container = document.getElementById(sliderId);
    const slider = container.querySelector('.timeline-slider');
    const toggleButton = container.querySelector('.timeline-toggle');
    const indicator = container.querySelector('.timeline-indicator');

    // Date
    const msOfDay = 864e5;
    const startTime = new Date(2000, 0, 1, 0, 0, 0);
    const firstDate = new Date(originalQuakes[0].time);
    const lastDate = new Date(originalQuakes[originalQuakes.length - 1].time);
    const lastYear = lastDate.getFullYear();
    const fistYear = firstDate.getFullYear();
    const totalMonth = (lastYear - fistYear) * 12 + lastDate.getMonth() + 1;
    const BUBBLE_LIFETIME = 365;

    // Mutable
    let playLock = true;
    let timeoutPointer = null;

    /**
     * 지진 버블을 그리는 렌더 함수
     * @param {number} tick 틱, 단위는 개월
     */
    const render = (tick = 0) => {
        const currentTime = new Date(startTime);
        currentTime.setMonth(currentTime.getMonth() + tick);

        slider.value = tick;
        indicator.innerText = `${currentTime.getFullYear()}년 ${
            currentTime.getMonth() + 1
        }월`;

        const bubbleSeries = chart.seriesByType('bubble');

        // 기존 지진 버블은 전부 지운다.
        while (bubbleSeries.getLabeledPoints().length > 0) {
            bubbleSeries.removeFirst(0);
        }

        // 현재 지진 데이터를 기준으로, 최근 지진 데이터를 가져와서 그린다.
        // 매 틱마다 과거(BUBBLE_LIFETIME)부터 현재까지 발생한 지진을 새로 그린다.
        const fromTime = currentTime.getTime() - BUBBLE_LIFETIME * msOfDay;
        const toTime = currentTime.getTime() + 30 * msOfDay;
        const recentQuakes = [];

        for (const quake of originalQuakes) {
            const targetDate = new Date(quake.time).getTime();
            if (fromTime <= targetDate && targetDate <= toTime) {
                recentQuakes.push(quake);
            }
        }

        for (const currentQuake of recentQuakes) {
            // 지진 버블 추가
            bubbleSeries.addPoint(currentQuake, -1, 0);
        }
    };

    const play = (timeStep = 0) => {
        toggleButton.innerText = '▮▮';
        render(+timeStep);

        // 다음 렌더 함수 호출
        if (timeStep < totalMonth) {
            timeoutPointer = setTimeout(() => {
                play(timeStep + 1);
            }, 180);
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
                // do pause
                playLock = false;
                pause();
            } else {
                // do play
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
        '- 리얼맵은 지역 위에 바 차트 등, 다양한 시리즈의 차트를 그릴 수 있습니다.',
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
