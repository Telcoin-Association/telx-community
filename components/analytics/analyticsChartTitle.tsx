import React from "react";

export interface AnalyticsChartProps {
  selectedOutput?: any;
  selectedProtocol?: any;
  selectedType?: any;
  selectedPools?: any;
}

export default function AnalyticsChart(props: AnalyticsChartProps) {
    const {
      selectedOutput,
      selectedProtocol,
      selectedType,
      selectedPools
     } = props;

    return (
      <div className="analytics-chart-title">
        { selectedOutput && <h2>{selectedOutput.name}</h2> } 
        <h4>
          { selectedProtocol && <><span>{selectedProtocol.name}</span><br/></> } 
          { selectedType && <><span>{ selectedType.name }</span><br/></> } 

          { selectedPools.length > 0 ? selectedPools.map((pool: any, i: number) => { 
          return <span key={i}>{pool?.name}</span> }) :
          <span>All Pools</span> }
        </h4>
      </div>
    );
}
