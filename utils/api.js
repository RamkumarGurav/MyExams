import axios from "axios";
const baseURL=process.env.NEXT_PUBLIC_SERVER_URL

const client = axios.create({
  baseURL: baseURL
});

export const request =({...options})=>{
  client.defaults.headers.common.Authorization='Bearer Token'
  const onSuccess =(response)=>response
  const onError=(error)=>{
    //optionally catch errors and add additional logging here
    return error
  }
  return client(options).then(onSuccess).catch(onError);
}