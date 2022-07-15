import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import Radio from "../common/Radio";

export interface AnalyticsChartFiltersProps {
  pools?: any;
  selectedPools?: any;
  handlePoolChange?: any;
  customStyles?: any;
  protocols?: any;
  selectedProtocol?: any;
  handleProtocolChange?: any;
  types?: any;
  selectedType?: any;
  handleTypeChange?: any;
}

export default function AnalyticsChartFilters(props: AnalyticsChartFiltersProps) {
    const {
      pools,
      selectedPools,
      handlePoolChange,
      customStyles,
      protocols,
      selectedProtocol,
      handleProtocolChange,
      types,
      selectedType,
      handleTypeChange
     } = props;

    // async function handlePoolChange(selectedPools: any) {
    //   setSelectedPools(selectedPools);
    //   setSelectedProtocol(null);
    //   setSelectedType(null);
    // }

    return (
      <div className="analytics-chart-filters">
        Chart Filters

        <h4>Filter by Protocol</h4>
        <Select 
          instanceId="protocolSelect" 
          placeholder="Filter By Protocol" 
          getOptionLabel={(p: any) => p.name} 
          getOptionValue={(p: any) => p} 
          isClearable options={protocols} 
          value={selectedProtocol} 
          onChange={handleProtocolChange} 
          components={animatedComponents} 
          styles={customStyles} 
        />

        {/* filter protocol */}
        <ul className="analytics-chart-filter">
          {
          protocols.map((protocol: { name: string; }, i: number) => {
            const { name } = protocol;

            console.log('this is the protocol', protocol)
            return (
              <li key={i}>
                <Radio 
                  text={name} 
                  active={false} 
                  onClick={handleProtocolChange} 
                  onClickPayload={protocol}
                />
              </li>
            )
          }) 
          }
        </ul>

        <h4>Filter by Type</h4>
        <Select 
          instanceId="typeSelect" 
          placeholder="Filter By Type" 
          getOptionLabel={(p: any) => p.name} 
          getOptionValue={(p: any) => p} 
          isClearable 
          options={types} 
          value={selectedType} 
          onChange={handleTypeChange} 
          components={animatedComponents} 
          styles={customStyles} 
        />

        <h4>Filter by Pool</h4>
        <Select 
          instanceId="poolsSelect" 
          placeholder="Filter By Pools" 
          getOptionLabel={(p: any) => p.name} 
          getOptionValue={(p: any) => p} isClearable isMulti 
          options={pools} value={selectedPools} 
          onChange={handlePoolChange} 
          components={animatedComponents} 
          styles={customStyles} 
        />


      </div>
    );
}
