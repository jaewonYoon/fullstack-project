import axios from "axios";

const KEY = "AIzaSyBxIo6m7ojXPgXa_KbOt6L5Slg72oVA8eg";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
    q: "surfboards"
  }
});
