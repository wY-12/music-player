import request from "./request";

export async function getBanners() {
    const ins = await request.get("/api/banner");
    return ins;
}