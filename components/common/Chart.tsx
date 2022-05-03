import React from "react";

import { VictoryChart, VictoryBar, VictoryLabel, VictoryTheme, VictoryAxis, VictoryTooltip } from "victory";

export interface ChartProps {
    embedUrl?: string;
    title?: string;
    generatedAt?: string;
    columns?: Array<string>;
    totalData?: Array<object>;
    chartData: Array<object>;
    timeline?: Array<string>;
}

export default function Chart(props: ChartProps) {
    let { embedUrl, title, generatedAt, chartData } = props;

    // Re-map the chart data as date
    chartData = chartData.map((c) => {
        return {
            x: new Date(c.x),
            y: c.y,
            label: c.label,
        };
    });

    const dateAxisTickFormatter = function (t) {
        return new Date(t).toDateString();
    };

    const moneyAxisTickFormatter = function (t) {
        if (t / 1000000 >= 1) {
            return `$${(t / 1000000).toFixed(2)}M`;
        } else if (t / 100000 >= 1) {
            return `$${(t / 1000).toFixed(2)}k`;
        } else if (t / 10000 >= 1) {
            return `$${(t / 1000).toFixed(2)}k`;
        }

        return t;
    };

    const gray3 = "#DBDDE6";

    return (
        <div className="chart-container" style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="chart">

                <VictoryChart>
                    
                    <VictoryLabel text={title} textAnchor="middle" verticalAnchor="middle" dx={320} dy={20} />

                    {/* X Axis */}
                    <VictoryAxis
                        crossAxis
                        fixLabelOverlap={true}
                        theme={VictoryTheme.material}
                        standalone={false}
                        style={{
                            axis: { stroke: gray3 },
                            axisLabel: { fontSize: 10, padding: 30 },
                            grid: {  stroke: gray3 },
                            tickLabels: { fontSize: 9, padding: 0, fontWeight: 600, angle: 0 },
                        }}
                        tickFormat={(t) => dateAxisTickFormatter(t)}
                    />

                    {/* Y Axis */}
                    <VictoryAxis
                        dependentAxis
                        fixLabelOverlap={true}
                        theme={VictoryTheme.material}
                        standalone={false}
                        style={{
                            axis: { stroke: gray3 },
                            axisLabel: { fontSize: 10, padding: 30 },
                            grid: {  stroke: gray3 },
                            tickLabels: { fontSize: 9, padding: 3, fontWeight: 600 },
                        }}
                        tickFormat={(t) => moneyAxisTickFormatter(t)}
                    />

                    <VictoryBar 
                      theme={VictoryTheme.grayscale} 
                      style={{ data: { fill: "rgba(20, 200, 255, 0.6)" } }} 
                      data={chartData} 
                      labelComponent={<VictoryTooltip />} 
                    />
                </VictoryChart>
            </div>
        </div>
    );
}
