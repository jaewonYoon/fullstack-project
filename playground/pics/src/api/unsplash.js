import axios from "axios";
const author = "Client-ID " + process.env.REACT_APP_UNSPLASH_KEY;
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: author
  }
});
