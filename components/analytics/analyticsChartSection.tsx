import React from "react";
import AnalyticsChartTitle from "./analyticsChartTitle";

export interface AnalyticsChartSectionProps {
  selectedOutput?: any;
  selectedProtocol?: any;
  selectedType?: any;
  selectedPools?: any;
}

export default function AnalyticsChartSection(props: AnalyticsChartSectionProps) {
    const {
      selectedOutput,
      selectedProtocol,
      selectedType,
      selectedPools
    } = props;

    return (
      <div className="analytics-chart">
        <AnalyticsChartTitle 
          selectedOutput={selectedOutput}
          selectedProtocol={selectedProtocol}
          selectedType={selectedType}
          selectedPools={selectedPools}
        />
      </div>
    );
}
