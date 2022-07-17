import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import Radio from "../common/Radio";
import AnalyticsPoolsSelect from "./analyticsPoolsSelect";
import AnalyticsSelect from "./analyticsSelect";

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


    return (
      <div className="analytics-chart-filters">

        <div className="analytics-chart-filter">
          <h4>Filter by Protocol</h4>
          <AnalyticsSelect 
            selected={selectedProtocol}
            options={protocols}
            handleChange={handleProtocolChange}
          />

          {/* <ul>
            {
            protocols.map((protocol: { name: string; }, i: number) => {
              const { name } = protocol;

              return (
                <li key={i}>
                  <Radio 
                    text={name} 
                    active={selectedProtocol === protocol ? true : false } 
                    onClick={handleProtocolChange}
                    onClickPayload={protocol}
                  />
                </li>
              )
            }) 
            }
          </ul> */}
        </div>

        <div className="analytics-chart-filter">
          <h4>Filter by Type</h4>
          <AnalyticsSelect 
            selected={selectedType}
            options={types}
            handleChange={handleTypeChange}
          />

          {/* <ul>
            {
            types.map((type: { name: string; }, i: number) => {
              const { name } = type;

              return (
                <li key={i}>
                  <Radio 
                    text={name} 
                    active={selectedType === type ? true : false } 
                    onClick={handleTypeChange}
                    onClickPayload={type}
                  />
                </li>
              )
            }) 
            }
          </ul> */}
        </div>

        <div className="analytics-chart-filter">
          <h4>Filter by Pool</h4>
          <AnalyticsPoolsSelect 
            selectedPools={selectedPools}
            pools={pools}
            handlePoolChange={handlePoolChange}
          />
        </div>

      </div>
    );
}
