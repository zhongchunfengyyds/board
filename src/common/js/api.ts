import request from "./request";


// 页面初始化接口
interface apiInitData {
    userId: string;
}
export const apiInitData = (params: apiInitData) => request.post('/oa/tabulated/findByUserId', params);