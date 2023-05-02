import common from "../common/common"
import axiosIns from "@/libs/axios";

export default class TimeKeepingService {
    // Will be used by this service for making API calls

    getHrTrackingData(...args){
        return axiosIns.get(common.hrTrackingData, ...args)
    }
    getSystemCode(...args){
        return axiosIns.get(common.fetchSystemCode, ...args)
    }
}