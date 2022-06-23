import md from "markdown-it";

function decodeHtml(html) {
    return html
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, '"');
}

function processMdToHtml(str) {
    return decodeHtml(md().render(str));
}

function processBase(id, attributes) {
    return {
        id: id ?? null,
        title: attributes.title ?? null,
        createdAt: attributes.createdAt ?? null,
        updatedAt: attributes.updatedAt ?? null,
        publishedAt: attributes.publishedAt ?? null,
    };
}

function processSingleType(id, attributes) {
    return {
        ...processBase(id, attributes),
        description: attributes.description,
        charts: attributes.charts,
    };
}

function processArticle(id, attributes) {
    let rawHtml = null;

    if (attributes.detail) {
        rawHtml = processMdToHtml(attributes.detail);
    }

    return {
        ...processBase(id, attributes),
        order: attributes.order,
        youtube: attributes.youtube,
        locale: attributes.locale,
        category: attributes.category,
        rawHtml,
    };
}

function processToken(id, attributes) {
    return {
        ...processBase(id, attributes),
        name: attributes.name,
        ticker: attributes.ticker,
        decimals: attributes.decimals,
        logo: attributes.logo ?? null,
    };
}

function processPool(id, attributes) {
    return {
        ...processBase(id, attributes),
        name: attributes.name,
        protocol: attributes.protocol,
        type: attributes.type,
        poolId: attributes.pool_id,
        startDate: attributes.start_date,
        tokens: attributes.tokens.data.map((t) => {
            return processToken(t.id, t.attributes);
        }),
    };
}

function getTooltipLabelByKey(key) {
    switch (key) {
        case "total_usd":
            return "Avg Liquidity";
        case "min_usd":
            return "Min Liquidity";
        case "max_usd":
            return "Min Liquidity";
        case "total_vol":
            return "Volume";
        case "total_fees":
            return "Fees";
    }
}

function buildTooltipData(data, value_keys) {
    const value1_key = value_keys[0];

    const valueLabel = getTooltipLabelByKey(value1_key);

    const title = new Date(data.timeline).toDateString();
    const value = data[value1_key];

    return `${title} \n\n ${valueLabel}: ${value}`;
}

function chartQueryBuilder(opts) {
    opts = opts || {};

    // Build output type
    let output = opts.output ?? "AVG LIQUIDITY";
    if (opts.output) {
        switch (opts.output) {
            case "AMML":
                output = "LIQUIDITY AVG MIN MAX";
                break;
            case "AVGLIQ":
                output = "AVG LIQUIDITY";
                break;
            case "MINLIQ":
                output = "MIN LIQUIDITY";
                break;
            case "MAXLIQ":
                output = "MAX LIQUIDITY";
                break;
            case "VOL":
                output = "TOTAL VOLUME";
                break;
            case "FEES":
                output = "TOTAL FEES";
                break;
        }
    }

    const generatedChartQuery = {
        filter_by_individual_pools: opts.filterByIndividualPools || false,
        filter_by_protocol: opts.filterByProtocol || false,
        filter_by_type: opts.filterByType || false,
        start_date: opts.startDate || "2021-04-30T00:00:00.000Z", // default start date. can be filled with pool's start date if applicable,
        protocol: "ALL",
        type: "ALL",
        pools: [],
        output: output,
        output_type: "MULTIPLE",
    };

    if (opts.filterByIndividualPools) {
        generatedChartQuery.pools = opts.pools.map((p_id) => {
            return { pool_id: p_id };
        }); // [ { pool_id: '' } ]
    }

    if (opts.filterByProtocol) {
        generatedChartQuery.protocol = opts.protocol; // DFX, QUICKSWAP or BALANCER
    }

    if (opts.filterByType) {
        generatedChartQuery.type = opts.type; // TELxchange, or SMS Network
    }

    opts.timeframeGroup = "day"; // Uncomment this to get hourly data.

    return generatedChartQuery;
}

const titleToSlug = (title) => {
    return (title || "").toLowerCase().replace(/\s/g, "-").replace("/", "-").replace("?", "").replace(":", "");
};

export { processArticle, processPool, processSingleType, chartQueryBuilder, titleToSlug, buildTooltipData, getTooltipLabelByKey };
