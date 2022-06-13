import axios from 'axios'

//封装axios的实例
let service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})

export default service