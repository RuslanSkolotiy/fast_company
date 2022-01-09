import httpService from "./httpService"

const commentEndPoint = "comment/"

const commentService = {
    update: async (id, content) => {
        const { data } = await httpService.put(commentEndPoint + id, content)
        return data
    },
    get: async (id) => {
        const { data } = await httpService.get(commentEndPoint + id)
        return data
    },
    fetchAll: async () => {
        const { data } = await httpService.get(commentEndPoint)
        return data
    },
    fetchByPage: async (id) => {
        const { data } = await httpService.get(commentEndPoint, {
            params: { orderBy: `"pageId"`, equalTo: `"${id}"` }
        })
        return data
    },
    create: async (content) => {
        const { data } = await httpService.post(commentEndPoint, content)
        return data
    },
    delete: async (id) => {
        const { data } = await httpService.delete(commentEndPoint + id)
        return data
    }
}

export default commentService
