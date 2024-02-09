import useFetchSuspense from 'fetch-suspense'
import { useUser } from "../UserContext"

export const useFetch = (url) => {
  const [user] = useUser()
  const headers = {}
  if (user) headers.Authorization = `${user}`
  return useFetchSuspense(url, { headers })
}

export const useFetchPosts = () => {
  const [user] = useUser()
  return async (url, body) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (user) headers.Authorization = `${user}`
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    if (res.ok) return await res.json()
    throw new Error(res.status)
  }
}

export default useFetch

