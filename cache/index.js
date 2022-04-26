let NodeCache = require("node-cache");

const ChartsCache = new NodeCache({ stdTTL: 10800, checkperiod: 600 });

export const getFromChartCache = function (key) {
    return ChartsCache.get(key);
};

export const setToChartCache = function (key, value) {
    ChartsCache.set(key, value);
};

export const listenOnChartInvalidated = function (listenKey, fn) {
    ChartsCache.on("del", function (key, value) {
        if (key === listenKey) {
            fn(key);
        }
    });
};
