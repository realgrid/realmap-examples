<script setup lang="ts">
import { onMounted } from 'vue';
import {createChartAsync, type ChartConfiguration} from 'realmap'


const {
    config,
    width = 600,
    height = 500,
} = defineProps<{ 
    config: ChartConfiguration,
    width?: number,
    height?: number
 }>()

onMounted(() => {
    const containerEl = document.getElementById('realmap') as HTMLDivElement;

    createChartAsync(document, containerEl, config);
});

</script>

<template>
  <div 
    id="realmap" 
    :style="{
        width: `${width}px`,
        height: `${height}px`,
    }"
  />
</template>

<style scoped>

</style>
