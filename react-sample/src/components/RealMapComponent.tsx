import { useEffect, useRef, useState } from 'react'
import {MapChart, type ChartConfiguration} from 'realmap'
import * as Realmap from 'realmap';
import {RealMapExport} from 'realmap/export'
import HeatmapSeries from 'realmap/heatmap'

HeatmapSeries(Realmap);

export interface RealMapComponentProps {
    config: ChartConfiguration;
    width?: number;
    height?: number;
}

export const RealMapComponent = ({config, width = 600, height = 500,}: RealMapComponentProps) => {
    const ref = useRef(null);
    const lock = useRef<boolean>(false);
    const [chart, setChart] = useState<MapChart | null>(null);

    useEffect(() => {
        if (!ref.current || lock.current) {
            return;
        }

        lock.current = true;

        Realmap.createChartAsync(document, ref.current, config, true)
            .then((mapChart) => {
                setChart(mapChart);
                RealMapExport(mapChart)
            });
    }, [config]);

    return <div ref={ref} style={{width, height}}></div>
}