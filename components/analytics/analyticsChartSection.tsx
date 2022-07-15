import React, { useEffect } from "react";
import AnalyticsChartTitle from "./analyticsChartTitle";
import AnalyticsChartFilters from "./analyticsChartFilters";
import AnalyticsChartTypeSelector from "./analyticsChartTypeSelector";

import dynamic from "next/dynamic";

import { chartQueryBuilder } from "../../type-helpers";
import ChartsService from "../../services/charts-service";

const Chart = dynamic(() => import("../common/Chart"), {
  ssr: false,
});

// This is for react-select
const customStyles = {
  option: (provided:any, state:any) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
  }),
};

const outputTypes = [
  // {
  //     name: "Avg Max Min Liquidity Over Time",
  //     value: "AMML",
  // },
  {
      name: "Avg Liquidity Over Time",
      value: "AVGLIQ",
  },
  {
      name: "Min Liquidity Over Time",
      value: "MINLIQ",
  },
  {
      name: "Max Liquidity Over Time",
      value: "MAXLIQ",
  },
  {
      name: "Total Volume Over Time",
      value: "VOL",
  },
  {
      name: "Total Fees Over Time",
      value: "FEES",
  },
];

const types = [
  {
      name: "TELxchange",
  },
  {
      name: "SMS Network",
  },
];

const protocols = [
  {
      name: "DFX",
  },
  {
      name: "QUICKSWAP",
  },
  {
      name: "BALANCER",
  },
];

const chartsService = new ChartsService();

export interface AnalyticsChartSectionProps {
  defaultChartData: any;
  pools: any;
}

export default function AnalyticsChartSection(props: AnalyticsChartSectionProps) {
    
    const { defaultChartData, pools } = props;

    const [chartData, setChartData] = React.useState(defaultChartData);

    const [selectedPools, setSelectedPools] = React.useState([]);
    const [selectedProtocol, setSelectedProtocol] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(null);
    const [selectedOutput, setSelectedOutput] = React.useState(outputTypes[0]);

    async function getChartData() {
      const queryData = chartQueryBuilder(
        {
          filterByIndividualPools: selectedPools.length > 0 ? true : false,
          pools: selectedPools.map(( p: { poolId: string; }) => p.poolId),
          filterByProtocol: selectedProtocol ? true : false,
          protocol: selectedProtocol?.name,
          filterByType: selectedType ? true : false,
          type: selectedType?.name,
          output: selectedOutput.value,
      });

      return await chartsService.filterDynamic(queryData);
    }

    useEffect(() => {
        const updateChart = async () => {
          const data = await getChartData();
          setChartData(data);
        }
        updateChart();
    }, [selectedPools, selectedProtocol, selectedType, selectedOutput]);


    async function handlePoolChange(selectedPools: any) {
        setSelectedPools(selectedPools);
        setSelectedProtocol(null);
        setSelectedType(null);
    }

    async function handleProtocolChange(selectedProtocol: any) {
        setSelectedPools([]);
        setSelectedProtocol(selectedProtocol);
        setSelectedType(null);
    }

    async function handleTypeChange(selectedType: any) {
        setSelectedPools([]);
        setSelectedProtocol(null);
        setSelectedType(selectedType);
    }

    return (
      <div id="analytics-chart-section" className="analytics-section">

        <div className="analytics-section-header">
          <h2>TELx Data Over Time</h2>
          <p>The following graph is dynamic. Select options to filter TELx pool data by pool, protocol, and product type.</p>
        </div>


        <AnalyticsChartTypeSelector 
          outputTypes={outputTypes}
          selectedOutput={selectedOutput}
          setSelectedOutput={setSelectedOutput}
          customStyles={customStyles}
        />


         
        <div className="analytics-chart-filters-and-chart">

          <AnalyticsChartFilters 
            pools={pools}
            selectedPools={selectedPools}
            handlePoolChange={handlePoolChange}
            customStyles={customStyles}
            protocols={protocols}
            selectedProtocol={selectedProtocol}
            handleProtocolChange={handleProtocolChange}
            types={types}
            selectedType={selectedType}
            handleTypeChange={handleTypeChange}
          />

          <div className="analytics-chart-wrapper">
            <AnalyticsChartTitle 
              selectedOutput={selectedOutput}
              selectedProtocol={selectedProtocol}
              selectedType={selectedType}
              selectedPools={selectedPools}
            />
            <Chart {...chartData} />
          </div>

        </div>
        
      </div>
    );
}
