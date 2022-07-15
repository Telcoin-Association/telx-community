import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

export interface AnalyticsChartTypeSelectorProps {
  title?: string;
  outputTypes?: any;
  selectedOutput?: any;
  setSelectedOutput?: any;
  customStyles?: any;
}

export default function AnalyticsChartTypeSelector(props: AnalyticsChartTypeSelectorProps) {
    const {
      outputTypes,
      selectedOutput,
      setSelectedOutput,
      customStyles
     } = props;

    return (
      <div className="analytics-chart-type-selector">

        {/* <Select 
          instanceId="outputSelect" 
          placeholder="Output Type" 
          getOptionLabel={(p: any) => p.name} 
          getOptionValue={(p: any) => p} 
          options={outputTypes} 
          value={selectedOutput} 
          onChange={setSelectedOutput} 
          components={animatedComponents} 
          styles={customStyles} 
        /> */}

        <div className="switcher">
          <ul>
            {
              outputTypes.map((optionType: { name: string; value: string; }, i: number ) => {

                const { name, value } = optionType;

                const handleTypeClick = () => {
                  setSelectedOutput(optionType);
                };

                return (
                  <li key={i} onClick={handleTypeClick} className={ selectedOutput == optionType ? 'active' : 'inactive' }>
                    {name}
                  </li>
                )   
              })
            }
          </ul>
        </div>
      </div>
    );
}
