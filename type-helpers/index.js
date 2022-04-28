import md from "markdown-it";

function decodeHtml(html) {
    return html
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, '"');
}

function processSingleType(id, attributes) {
    return {
        id,
        title: attributes.title,
        description: attributes.description,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        charts: attributes.charts,
    };
}

function processArticle(id, attributes) {
    const rawHtml = decodeHtml(md().render(attributes.detail));

    return {
        id,
        order: attributes.order,
        title: attributes.title,
        detail: attributes.detail,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        locale: attributes.locale,
        category: attributes.category,
        rawHtml,
    };
}

function processChartData(data, opts) {
    const time_field_key = opts.time_field_key;
    const value1_key = opts.value1_key;

    const columns = data.query_results[0].columns;
    const generatedAt = data.query_results[0].generated_at;
    const totalData = data.get_result_by_result_id.map((d) => d.data);
    const chartData = totalData.map((c) => {
        return { x: new Date(c[time_field_key]).getTime(), y: c[value1_key] };
    });

    chartData.sort((a, b) => {
        return a.x - b.x;
    });

    const timeline = chartData.map((c) => c.x);

    return {
        generatedAt,
        columns,
        chartData,
        timeline,
    };
}

export { processArticle, processChartData, processSingleType };

export const titleToSlug = (title) => {
    return (title || "").toLowerCase().replace(/\s/g, "-").replace("/", "-").replace("?", "").replace(":", "");
};
