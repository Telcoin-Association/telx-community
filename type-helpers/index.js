import md from 'markdown-it';

function decodeHtml(html) {
    return html.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&nbsp;/g, '"');
}

function processArticle(id, attributes) {
    const rawHtml = decodeHtml(md().render(attributes.detail));

    console.log(rawHtml);
    return {
        id,
        order: attributes.order,
        title: attributes.title,
        detail: attributes.detail,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        locale: attributes.locale,
        rawHtml
    }
}

export {
    processArticle
}


export const titleToSlug = (title) => {
  return (title || "")
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace("/", "-")
    .replace("?", "")
    .replace(":", "");
};
