import { GetStaticProps } from "next";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import SingleTypeService from "../../services/single-type-service";
import ChartsService from "../../services/charts-service";
import PoolsService from "../../services/pools-service";

const Chart = dynamic(() => import("../../components/common/Chart"), {
    ssr: false,
});

import AnalyticsLayout from "../../components/analytics/analyticsLayout";
import { chartQueryBuilder } from "../../type-helpers";

const animatedComponents = makeAnimated();

interface PageProps {
    pools: Array<object>;
    title: String;
    description: String;
    analyticsPageData: any;
    defaultChartData: any;
}

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

// This is for react-select
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px dotted pink",
        color: state.isSelected ? "red" : "blue",
        padding: 20,
    }),
};

export default function Page(props: PageProps) {
    const { pools, defaultChartData, title, description, analyticsPageData } = props;

    const [chartData, setChartData] = React.useState(defaultChartData);

    const [selectedPools, setSelectedPools] = React.useState([]);
    const [selectedProtocol, setSelectedProtocol] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(null);
    const [selectedOutput, setSelectedOutput] = React.useState(outputTypes[0]);

    useEffect(async () => {
        const data = await getChartData();
        setChartData(data);
    }, [selectedPools, selectedProtocol, selectedType, selectedOutput]);

    async function getChartData() {
        const queryData = chartQueryBuilder({
            filterByIndividualPools: selectedPools.length > 0 ? true : false,
            pools: selectedPools.map((p) => p.poolId),
            filterByProtocol: selectedProtocol ? true : false,
            protocol: selectedProtocol?.name,
            filterByType: selectedType ? true : false,
            type: selectedType?.name,
            output: selectedOutput.value,
        });

        return await chartsService.filterDynamic(queryData);
    }

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
        <div id="page-analytics">
            <h1>{title}</h1>
            <span>{description}</span>
            <br />
            <br />
            {/* <AnalyticsLayout charts={pools} /> */}

            <Select instanceId="poolsSelect" placeholder="Filter By Pools" getOptionLabel={(p) => p.name} getOptionValue={(p) => p} isClearable isMulti options={pools} value={selectedPools} onChange={handlePoolChange} components={animatedComponents} styles={customStyles} />
            <Select instanceId="protocolSelect" placeholder="Filter By Protocol" getOptionLabel={(p) => p.name} getOptionValue={(p) => p} isClearable options={protocols} value={selectedProtocol} onChange={handleProtocolChange} components={animatedComponents} styles={customStyles} />
            <Select instanceId="typeSelect" placeholder="Filter By Type" getOptionLabel={(p) => p.name} getOptionValue={(p) => p} isClearable options={types} value={selectedType} onChange={handleTypeChange} components={animatedComponents} styles={customStyles} />
            <Select instanceId="outputSelect" placeholder="Output Type" getOptionLabel={(p) => p.name} getOptionValue={(p) => p} options={outputTypes} value={selectedOutput} onChange={setSelectedOutput} components={animatedComponents} styles={customStyles} />

            <div>
                <Chart {...chartData} />
            </div>

            {/* {pools.map((object: any, i: any) => (
                
            ))} */}
        </div>
    );
}

const poolService = new PoolsService();
const chartsService = new ChartsService();
const singleTypeService = new SingleTypeService();

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const analyticsPageData = await singleTypeService.fetchSingleType("analytics-page");
    const pools = await poolService.fetchAll();

    const defaultChartData = await chartsService.filterDynamic(chartQueryBuilder());

    const response = {
        title: analyticsPageData.title,
        description: analyticsPageData.description,
        pools,
        defaultChartData,
        analyticsPageData: analyticsPageData,
    };

    return {
        props: response,
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 600, // In seconds
    };
};
