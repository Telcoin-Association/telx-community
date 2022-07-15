import React from "react";

import uPlot from "uplot";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";
import { getTooltipLabelByKey } from "../../type-helpers";

const isServer = () => typeof window === `undefined`;

export interface ChartProps {
    title?: string;
    chart_data?: Array<object>;
    value_keys?: Array<string>;
}

const currentSize = {
    width: 800,
    height: 500,
};

let chartRef = null;

const numberWithCommas = function (x) {
    return x.toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const generateOptions = function (opts) {
    const { valueKeys } = opts;
    const dummyPlugin = (): uPlot.Plugin => ({
        hooks: {
            init(u: uPlot, opts: uPlot.Options) {
                void u;
                void opts;
            },
        },
    });

    const series = valueKeys.map((vk) => {
        return {
            label: getTooltipLabelByKey(vk),
            stroke: "rgba(20, 200, 255, 0.9)",
            scale: "$",
            width: 1,
            fill: "rgba(20, 200, 255, 0.4)",
            value: (self, rawValue) => "$ " + numberWithCommas(rawValue),
        };
    });

    series.unshift({
        label: "Date",
        value: (self, rawValue) => new Date(rawValue * 1000).toLocaleString(),
    });

    const options = {
        // title: "Chart",
        ...currentSize,
        series,
        plugins: [dummyPlugin()],
        scales: { x: { time: true } },
    };

    return options;
};

export default function Chart(props: ChartProps) {
    let { title, chart_data, value_keys } = props;

    const chartContainer = React.createRef();

    const valueKeys = value_keys || [];

    const timeline = chart_data.map((c) => Math.floor(new Date(c.timeline).getTime() / 1000));
    const values = [];

    valueKeys.forEach((vk) => values.push(chart_data?.map((c) => c[vk])));

    const chartData = [timeline, ...values];

    const options = generateOptions({ valueKeys });

    console.log("RENDERING CHART WITH, ", {
        chartData,
        options,
    });

    let chart;

    const dateAxisTickFormatter = function (t: any) {
        return new Date(t).toDateString();
    };

    const moneyAxisTickFormatter = function (t: number) {
        if (t / 1000000 >= 1) {
            return `$${(t / 1000000).toFixed(2)}M`;
        } else if (t / 100000 >= 1) {
            return `$${(t / 1000).toFixed(2)}k`;
        } else if (t / 10000 >= 1) {
            return `$${(t / 1000).toFixed(2)}k`;
        }

        return t;
    };

    const observer = React.useRef(
        new ResizeObserver((entries) => {
            console.log(entries);
            // Only care about the first element, we expect one element ot be watched
            const { width, height } = entries[0].contentRect;

            const maxHeight = height > 500 ? 500 : height;

            currentSize.width = width;
            currentSize.height = maxHeight;

            chartRef?.setSize({ width, height: maxHeight });
        })
    );

    React.useEffect(() => {
        if (chartContainer.current) {
            observer.current.observe(chartContainer.current);
        }
    }, [chartContainer, observer]);

    const gray3 = "#DBDDE6";

    return (
        <div className="chart-container" style={{ display: "flex", flexWrap: "wrap" }} ref={chartContainer}>
            {!isServer() && (
                <div className="chart">
                    <UplotReact
                        options={options}
                        data={chartData}
                        onCreate={(chart) => {
                            chartRef = chart;
                        }}
                        onDelete={(chart) => {}}
                    />
                </div>
            )}
        </div>
    );
}
