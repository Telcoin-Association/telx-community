import { processChartData } from "../type-helpers";
import { getFromChartCache, setToChartCache, listenOnChartInvalidated } from "../cache/";
import { title } from "process";

// Charts service is not derived from the strapi base service handler since it's not a strapi component
export default class ChartsService {
    constructor() {}

    generateDuneRequestHeaders(embedUrl) {
        const headers = {};

        headers["accept"] = "application/json";
        headers["content-type"] = "application/json";
        headers["accept-encoding"] = "gzip, deflate, br";
        headers["accept-language"] = "en,tr-TR;q=0.9,tr;q=0.8,en-US;q=0.7";
        headers["dnt"] = "1";
        headers["origin"] = "https://dune.xyz";
        headers["referer"] = "https://dune.xyz/";
        headers["sec-ch-ua"] = '"Not A;Brand";v="99","Chromium";v="99","Google Chrome";v="99"';
        headers["sec-ch-ua-mobile"] = "?0";
        headers["sec-ch-ua-platform"] = "Windows";
        headers["sec-fetch-dest"] = "empty";
        headers["sec-fetch-mode"] = "cors";
        headers["sec-fetch-site"] = "cross-site";
        headers["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36";
        headers["x-hasura-api-key"] = "efaa8551-da5b-468e-a03e-16eee675db60";

        return headers;
    }

    async makeDuneServiceCall(embedUrl, body) {
        const reqOpts = {
            method: "POST",
            headers: this.generateDuneRequestHeaders(embedUrl),
            body: body,
        };

        //console.info("DUNE HEADERS => ", JSON.stringify(this.generateDuneRequestHeaders(embedUrl)));
        //console.info("DUNE REQUEST OPTIONS => ", reqOpts);

        const resp = await fetch("https://core-hsr.duneanalytics.com/v1/graphql", reqOpts);

        const result = await resp.json();

        if (result.errors) {
            console.error("ERROR OCCURED =>", result.errors);
            return null;
        }

        return result.data;
    }

    async getResultId(embedUrl) {
        // Split the embed url and return the first component as the embed's query id
        const queryId = embedUrl.split("embeds/")[1].split("/").shift();
        const body = `{\n
            "operationName": "GetResult",\n
            "variables": {\n
                "query_id": ${queryId}\n
            },\n
            "query": "query GetResult($query_id: Int!, $parameters: [Parameter!]) {\\n  get_result(query_id: $query_id, parameters: $parameters) {\\n    job_id\\n    result_id\\n    __typename\\n  }\\n}\\n"\n
        }`;


        const result = await this.makeDuneServiceCall(embedUrl, body);

        if (!result) {
            return null;
        }

        if (!result.get_result.result_id) {
            console.error("NEW RESULT HASN'T BEEN RECEIVED YET");
            return null;
        }

        return result.get_result.result_id;
    }

    async getChartData(opts) {
        const resultId = await this.getResultId(opts.embed_url);

        if (!resultId) {
            return null;
        }

        const body = `{
            "operationName": "FindResultDataByResult",\
            "variables": {\
                "result_id": "${resultId}"\
            },\
            "query": "query FindResultDataByResult($result_id: uuid!) {\n  query_results(where: {id: {_eq: $result_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_result_id(args: {want_result_id: $result_id}) {\n    data\n    __typename\n  }\n}\n"\
        }`;

        const result = await this.makeDuneServiceCall(opts.embed_url, body);

        if(opts.embed_url === "https://dune.com/embeds/649659/1207521/9ce2bf8c-8c9a-4e81-a541-b1058f6e394e"){
            console.log("GET RESULT ID => ", result);
        }

        if (result.query_results.length === 0) {
            console.error("NO DATA RESIDES IN THE RESULT");
            return null;
        }

        return processChartData(result, opts);
    }

    async getChart(chart) {
        let data = getFromChartCache(chart.payload.embed_url);
        if (!data) {
            data = await this.getChartData(chart.payload);
            setToChartCache(chart.payload.embed_url, { title: chart.title, description: chart.description || null, ...data });
        }

        return data;
    }
}
