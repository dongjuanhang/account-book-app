import http from "./http";

export const user = {
    // 登陆
    login(params: object) {
        return http.post("/user/access", params);
    },
};

export const transactions = {
    // 获取交易列表
    getList(params: object) {
        return http.get("/transactions", params);
    },
};

export const categories = {
    // 获取交易列表
    getList(params: object) {
        return http.get("/categories", params);
    },
};
