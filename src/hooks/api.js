import { useFetch, useFetchPosts } from "/src/hooks/useFetch.js";

const apiHost = "http://localhost:3000";

export const usePosts = () => useFetch(apiHost + "/posts/");
export const useMyInfo = () => useFetch(apiHost + "/users");
export const useUserById = (userId) => useFetch(apiHost + `/users/${userId}`);
export const usePostsByUserId = (userId) =>
  useFetch(apiHost + `/posts?user=${userId}`);
export const usePostsById = (postId) =>
  useFetch(apiHost + `/posts/detail/${postId}`);

export const useUserActions = () => {
  const fetchPosts = useFetchPosts();
  return {
    login: (email, password) =>
      fetchPosts(apiHost + "/users/login", { email, password }),
    createPosts: (description, photo) =>
      fetchPosts(apiHost + "/posts", { description, photo }),
    deletePost: (postId) =>
      fetchPosts(apiHost + `/posts/${postId}`, null, "DELETE"),
    like: async (postId) =>
      fetchPosts(apiHost + `/posts/${postId}/like`, { postId }),
  };
};

export const useSearch = () =>
  useFetch(apiHost + `/posts?search=${description}`);
export const listPosts = async (searchTerm) => {
  const url = `http://localhost:3000/posts${
    searchTerm ? `?search=${searchTerm}` : ""
  }`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al buscar publicaciones: ${response.statusText}`);
  }
  return await response.json();
};
