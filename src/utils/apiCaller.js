import requestContext from "./RequestContext"

export default {
  async get(url, requestParameter) {
    return await requestContext.getOriginal(url, requestParameter)
  },
  async post(url, data) {
    return await requestContext.postOriginal(url, data)
  }
}
