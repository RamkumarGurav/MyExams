import axios from "axios";
import Cookies from "js-cookie";

export async function fetcherBearerPatch(url, formData) {
  const jwt = Cookies.get("jwt");
  (axios.defaults.withCredentials = true),
    (axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`);
  // axios.defaults.headers.common['Cookie']=`jwt${jwt}`
  const res = await axios.patch(url, formData);
  const data = res.data;
  return data;
}
export async function fetcherBearerPost(url, formData) {
  const jwt = Cookies.get("jwt");
  (axios.defaults.withCredentials = true),
    (axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`);
  // axios.defaults.headers.common['Cookie']=`jwt${jwt}`
  const res = await axios.post(url, formData);
  const data = res.data;
  return data;
}
export async function fetcherBearerGet(url, formData) {
  const jwt = Cookies.get("jwt");
  (axios.defaults.withCredentials = true),
    (axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`);
  // axios.defaults.headers.common['Cookie']=`jwt${jwt}`
  const res = await axios.get(url, formData);
  const data = res.data;
  return data;
}
export async function fetcherBearerDelete(url, formData) {
  const jwt = Cookies.get("jwt");
  (axios.defaults.withCredentials = true),
    (axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`);
  // axios.defaults.headers.common['Cookie']=`jwt${jwt}`
  const res = await axios.get(url, formData);
  const data = res.data;
  return data;
}
