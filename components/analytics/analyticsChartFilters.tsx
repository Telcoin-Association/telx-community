import React from "react";
import Select from "react-select";

export interface AnalyticsChartFiltersProps {
  title?: any;
}

export default function AnalyticsChartFilters(props: AnalyticsChartFiltersProps) {
    const {
      title
     } = props;

    // async function handlePoolChange(selectedPools: any) {
    //   setSelectedPools(selectedPools);
    //   setSelectedProtocol(null);
    //   setSelectedType(null);
    // }

    return (
      <div className="analytics-chart-filters">
        Chart Filters

        {/* <Select 
          instanceId="poolsSelect" 
          placeholder="Filter By Pools" 
          getOptionLabel={(p: any) => p.name} 
          getOptionValue={(p: any) => p} isClearable isMulti 
          options={pools} value={selectedPools} 
          onChange={handlePoolChange} 
          components={animatedComponents} 
          styles={customStyles} 
        /> */}

      </div>
    );
}
