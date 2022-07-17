import { GetStaticProps } from "next";

import React from "react";

import SingleTypeService from "../../services/single-type-service";
import ChartsService from "../../services/charts-service";
import PoolsService from "../../services/pools-service";

import { chartQueryBuilder } from "../../type-helpers";

import AnalyticsChartSection from "../../components/analytics/analyticsChartSection";
import AnalyticsSnapshot from "../../components/analytics/analyticsSnapshot";

interface PageProps {
    pools: Array<object>;
    title: String;
    description: String;
    analyticsPageData: any;
    defaultChartData: any;
}

export default function Page(props: PageProps) {
    const { pools, defaultChartData, title, description, analyticsPageData } = props;


    return (
        <div id="page-analytics">
            
            <div>
              <AnalyticsSnapshot />
            </div>

            <AnalyticsChartSection
              defaultChartData={defaultChartData}
              pools={pools}
            />

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
