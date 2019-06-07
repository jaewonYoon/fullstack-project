import jsonPlaceholder from "../apis/jsonplaceholder";
//ES2016
export const fetchPosts = () => async dispatch => {
  //parenthesis is optional
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
