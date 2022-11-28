import request from "./request";


// 页面初始化接口
interface apiInitDataParams {
    userId: string;
}
export const apiInitData = (params: apiInitDataParams) => request.post('/oa/tabulated/findByUserId', params);

// 获取用户信息

export const apiGetUserInfo = () => request.get('/org/userResource/userMsg');

// 卡片新增/修改  所有saveOrUpdate接口有ID修改无ID新增
interface apiCardUpdateParams {
    id?: string;
    title?: string
    details?: string
    color?: string
    sort?: string
    expireTime?: string
    archiving?: string

}
export const apiCardUpdate = (params: apiCardUpdateParams) => request.post('/oa/card/saveOrUpdate', params);



// 列表新增/修改
interface apiListUpdateParams {
    id?: string;
    listName: string
    archiving?: string
    sort?: string

}
export const apiListUpdate = (params: apiListUpdateParams) => {
    // 设置请求头
    request.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return request.post('/oa/tabulated/saveOrUpdate', { ...params });
}


// 清单新增/修改

interface apiCheckboxUpdateParams {
    id?: string;
    items?: string
    isAccomplish?: string
    card_id?: string
}

export const apiCheckboxUpdate = (params: apiCheckboxUpdateParams) => request.post('/oa/inventory/saveOrUpdate', params);

// 删除接口

interface apiDeleteParams {
    id: string;
}
// 清单删除
export const apiCheckBoxDelete = (params: apiDeleteParams) => request.post('/oa/tabulated/delete', params);
// 卡片删除
export const apiCardDelete = (params: apiDeleteParams) => request.post('/oa/tabulated/delete', params);
// 评论删除
export const apiCommonDelete = (params: apiDeleteParams) => request.post('/oa/tabulated/delete', params);
// 列表删除
export const apiListDelete = (params: apiDeleteParams) => request.post('/oa/tabulated/delete', params);

