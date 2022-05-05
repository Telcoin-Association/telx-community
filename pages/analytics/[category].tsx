import Head from "next/head";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { titleToSlug } from '../../type-helpers';

import SingleTypeService from "../../services/single-type-service";
import ChartsService from "../../services/charts-service";

import Chart from "../../components/common/Chart";
import AnalyticsLayout from "../../components/analytics/analyticsLayout";

interface PageProps {
    chartDatas: Array<object>;
    title: String;
    description: String;
}

export default function Page(props: PageProps) {
    const { chartDatas, title, description } = props;

    console.log('chart data', chartDatas)

    return (
      <div id="page-analytics">
        <AnalyticsLayout charts={chartDatas}/>
        <h1>{title}</h1>
        <span>{description}</span>
          {chartDatas.map((object: any, i: any) => (
            <div key={i}>
              <Chart {...object} key={i} />
            </div>
          ))}
      </div>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
  // this method instructs NextJS on which `/about/[slug]`
  // URLs to statically generate.
  
  const analyticsPageData = await singleTypeService.fetchSingleType("analytics-page");
  const chartDatas = analyticsPageData.charts;

  const paths = chartDatas.map((chart: any) => ({
    params: {
      slug: titleToSlug(chart.category),
    },
  }));
  
  
  // const chartDatas: Array<object> = [];
  // const chartDataPromises: Array<Promise<any>> = [];
  // analyticsPageData.charts.forEach((chart: any) => {
  //   chartDataPromises.push(
  //     new Promise(async (resolve) => {
  //       const result = await chartService.getChart(chart);
  //       chartDatas.push(result);
  //       resolve(undefined);
  //     })
  //   );
  // });
  // await Promise.all(chartDataPromises);


  return {
    paths: paths,
    fallback: true,
  }
}



const chartService = new ChartsService();
const singleTypeService = new SingleTypeService();

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    const analyticsPageData = await singleTypeService.fetchSingleType("analytics-page");

    const chartDatas: Array<object> = [];

    const chartDataPromises: Array<Promise<any>> = [];

    analyticsPageData.charts.forEach((chart: any) => {
        chartDataPromises.push(
            new Promise(async (resolve) => {
                const result = await chartService.getChart(chart);
                chartDatas.push(result);
                resolve(undefined);
            })
        );
    });

    await Promise.all(chartDataPromises);

    // const result = await chartService.getChart(analyticsPageData.charts[0]);
    // chartDatas.push(result);

    return {
        props: {
            title: analyticsPageData.title,
            description: analyticsPageData.description,
            chartDatas,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 60 seconds
        revalidate: 60, // In seconds
    };
};
