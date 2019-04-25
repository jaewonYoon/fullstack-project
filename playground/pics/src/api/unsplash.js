import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 27275fd1ec4a6298680b7b0e759fa5f73100c863ba27415b8d6bebb427da9500"
  }
});
