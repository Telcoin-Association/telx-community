/* This is an abstract class and not meant to be used by itself. */
import qs from "qs";

export default class BaseService {
    constructor(baseUrl = "https://backend.telxcommunity.live", accessToken = "cbb2cc1044360d5af2e756218ff20b032f74087be7685e201f30cfaf8272deeb1d6d18ea7c2ac351c0b9901c9121ce91c7392f86e83617c90e7d8594630626edb4a47eaed3189d5f5cc04746c28294fb0ff617752f233e023f6ad88130a72cffd9787afb116e2abb47679c8e515fce1d679bbfe80df32233401b0d4a60b7e7bb") {
        this.baseUrl = baseUrl;
        this.host = baseUrl.split("://")[1];
        this.accessToken = accessToken;
        this.itemType = null;
    }

    generateRequestObject(req) {
        req = req || { method: "GET", authRequired: true };
        let { method, postData, authRequired } = req;
        method = method || "GET";
        authRequired === undefined ? true : authRequired;

        const obj = {
            method: method, // We only do GET requests in this project. Thus for the sake of the simplicty I hardcoded GET method for all requests.
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Host: this.host,
            },
            body: postData ? JSON.stringify(postData) : undefined,
        };

        if (authRequired) {
            obj.headers["Authorization"] = `Bearer ${this.accessToken}`;
        }
        return obj;
    }

    // Possible options for strapi query
    // generateRequestQuery() {
    //     const query = qs.stringify({
    //     sort: ['title:asc'],
    //     filters: {
    //         title: {
    //         $eq: 'hello',
    //         },
    //     },
    //     populate: '*',
    //     fields: ['title'],
    //     pagination: {
    //         pageSize: 10,
    //         page: 1,
    //     },
    //     publicationState: 'live',
    //     locale: ['en'],
    //     }, {
    //     encodeValuesOnly: true, // prettify url
    //     });
    // }

    generateRequestQuery() {
        const query = qs.stringify(
            {
                sort: ["createdAt:asc"],
                populate: "*",
                pagination: {
                    pageSize: 100,
                    page: 1,
                },
                publicationState: "live",
                locale: ["en"],
            },
            {
                encodeValuesOnly: true, // prettify url
            }
        );

        return query;
    }

    async fetchSingleType(typeId) {
        const requestQuery = this.generateRequestQuery();
        const url = `${this.baseUrl}/api/${typeId}?${requestQuery}`;
        const reqObj = this.generateRequestObject();

        const response = await fetch(url, reqObj);
        const result = await response.json();

        return result.data;
    }

    async fetchSingle(id) {
        const requestQuery = this.generateRequestQuery();
        const url = `${this.baseUrl}/api/${this.itemType}/${id}?${requestQuery}`;
        const reqObj = this.generateRequestObject();
        const response = await fetch(url, reqObj);
        const result = await response.json();

        return result.data;
    }

    async fetchSingleBySlug(slug) {
        const requestQuery = this.generateRequestQuery();
        const url = `${this.baseUrl}/api/${this.itemType}/${slug}?${requestQuery}`;
        const reqObj = this.generateRequestObject();
        const response = await fetch(url, reqObj);
        const result = await response.json();

        return result.data;
    }

    async fetchAll() {
        const requestQuery = this.generateRequestQuery();
        const url = `${this.baseUrl}/api/${this.itemType}?${requestQuery}`;
        const reqObj = this.generateRequestObject();
        const response = await fetch(url, reqObj);
        const result = await response.json();

        // we can handle pagination from here on if we need
        // result.meta.pagination... meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } }

        return result.data;
    }

    async fetchFiltered(postData, endpoint) {
        endpoint = endpoint || this.itemType;

        const url = `${this.baseUrl}/api/${endpoint}/`;
        const reqObj = this.generateRequestObject({ method: "POST", postData, authRequired: false });
        const response = await fetch(url, reqObj);
        const result = await response.json();

        return result.data;
    }
}
