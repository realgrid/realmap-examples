<!-- Modules 로드 및 준비  -->
<script setup lang="ts">
import { ref } from 'vue';

// 코어 라이브러리에서 css 파일을 import 해야 한다.
import 'realmap/realmap-export-style.css';
import 'realmap/realmap-style.css';

// 코어 라이브러리와 React 컴포넌트를 import 한다.
import * as Realmap from 'realmap';
import { RealMapVue } from 'realmap-vue';

// 확장모듈을 사용해야 하는 경우 아래와 같이 import 한다.
import { RealMapExport } from 'realmap/export';
import Heatmap from 'realmap/heatmap';

// Export 모듈을 제외한 확장모듈은 아래와 같이 활성화한다.
Heatmap(Realmap);
</script>

<!-- 렌더 -->
<template>
    <RealMapVue
        id="realmap"
        ref="realmapRef"
        w="700px"
        h="700px"
        data-user-custom-id="MyChart01"
        :realmap="Realmap"
        :config="{
            map: [
                {
                    url: 'https://unpkg.com/realmap-collection/kr-sido-low.geo.json',
                },
            ],
            body: {
                projection: 'mercator',
            },
            series: [
                {
                    type: 'bubble',
                    minSize: 50,
                    pointLabel: {
                        text: '${value}',
                    },
                    data: [
                        { id: '1', value: 10, coord: [127, 37] },
                        { id: '2', value: 20, coord: [127, 36] },
                        { id: '3', value: 30, coord: [127, 35] },
                    ],
                },
            ],
        }"
        :style="{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            border: '1px solid #ddd',
            overflow: 'hidden',
            resize: 'both',
        }"
        :onChartLoaded="
            ({ chart }) => {
                console.log('Chart loaded:', chart);

                RealMapExport(chart);
            }
        "
    />
    <button :style="{ marginTop: '32px' }" @click="updatePoints">
        updatePoint
    </button>
</template>

<!-- Chart Config -->
<script lang="ts">
const realmapRef = ref<InstanceType<typeof RealMapVue> | null>(null);

// ref를 통해 차트 인스턴스에 접근하여 API를 사용하는 예시
const updatePoints = () => {
    if (!realmapRef.value) return;

    const { realmap } = realmapRef.value;
    const series = realmap.seriesByType('bubble');

    const point = series.pointById('1');
    const prevValue = point.getValue();
    const nextValue = prevValue + 1;

    series.updatePoint(point, { value: nextValue }, 0);
};
</script>
