import cookie from "./cookies";
export default {
    // 拼接url参数
    queryString(url: string, query: any): string {
        if (!query) {
            return url;
        }
        const list: string[] = [];
        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                list.push(key + "=" + query[key]);
            }
        }
        const paramStr: string = list.join("&");
        return paramStr ? `${url}?${paramStr}` : url;
    },
    isLogin() {
        return !!cookie.getCookie("token");
    },
};
