import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateBlog = (newBlog) => {
  console.log(newBlog)
  const request = axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {    headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {    headers: { Authorization: token }, }
  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}


export default { getAll, setToken, create, updateBlog, deleteBlog }