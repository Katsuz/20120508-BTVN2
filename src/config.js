import axios from "axios";
export default axios.create({
  baseURL: "https://api.unsplash.com/search/photos",
  headers: {
    Authorization: "Client-ID 4J8u50tS_W2ROFNEAmwVy-w6RG-jYtJXXGPbdBl3f-g",
  },
});
