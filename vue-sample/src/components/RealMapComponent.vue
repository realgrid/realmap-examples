<script setup lang="ts">
import { onMounted } from 'vue';
import {createChartAsync, type ChartConfiguration} from 'realmap'


const {config} = withDefaults(defineProps<{ 
    config: ChartConfiguration,
    width?: number,
    height?: number
 }>(), {
    width: 600,
    height: 500
 });

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
