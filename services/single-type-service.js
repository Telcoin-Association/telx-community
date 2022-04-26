import BaseService from "./base-service";
import { processSingleType } from "../type-helpers";

export default class SingleTypeService extends BaseService {
    constructor() {
        super();
        this.itemType = "SINGLE_TYPE";
    }

    async fetchSingleType(typeId) {
        const rawData = await super.fetchSingleType(typeId);
        const result = processSingleType(rawData.id, rawData.attributes);
        return result;
    }
}
