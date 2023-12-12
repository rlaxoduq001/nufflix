import axios from "axios";

// themoviedb apiKey, tokenKey env파일에 저장
const API_KEY = process.env.REACT_APP_API_KEY;
const TOKEN_KEY = process.env.REACT_APP_LOAD_TOKEN_KEY;

const api = axios.create({
  baseURL : "https://api.themoviedb.org/3",
  headers :  {
    "accept": 'application/json',
    "Authorization": `Bearer ${TOKEN_KEY}`
  }
});


export default api;