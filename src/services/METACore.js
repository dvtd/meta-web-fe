import axios from 'axios'
import authHeader from './auth-header'
import FileSaver from 'file-saver'

const API_URL = 'https://localhost:44301'

const transformRequestOptions = params => {
  let options = ''
  for (const key in params) {
    if (typeof params[key] !== 'object' && params[key]) {
      options += `${key}=${params[key]}&`
    } else if (typeof params[key] === 'object' && params[key] && params[key].length) {
      params[key].forEach(el => {
        options += `${key}=${el}&`
      })
    }
  }
  return options ? options.slice(0, -1) : options
}
class METACore {
  get (url, obj) {
    return axios
      .get(API_URL + url, {
        params: obj,
        paramsSerializer: params => transformRequestOptions(params),
        headers: authHeader()
      })
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
        throw error
      })
  }

  post (url, obj) {
    return axios
      .post(API_URL + url, obj, { headers: authHeader() })
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
        throw error
      })
  }

  put (url, obj) {
    return axios
      .put(API_URL + url, obj, { headers: authHeader() })
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
        throw error
      })
  }

  delete (url, obj) {
    return axios
      .delete(API_URL + url, {
        params: obj,
        paramsSerializer: params => transformRequestOptions(params),
        headers: authHeader()
      })
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
        throw error
      })
  }

  download (url, obj) {
    return axios
      .post(API_URL + url, obj, { headers: authHeader(), responseType: 'blob' })
      .then(response => {
        // response.data is a blob type
        FileSaver.saveAs(response.data, obj.fileName)
        return response
      }).catch(error => {
        console.log(error)
        throw error
      })
  }
}

export default new METACore()
