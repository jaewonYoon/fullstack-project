import jsonPlaceholder from "../apis/jsonplaceholder";
//ES2016
export const fetchPosts = () => async dispatch => {
  //parenthesis is optional
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
