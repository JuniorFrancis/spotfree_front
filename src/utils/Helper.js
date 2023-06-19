import Moment from 'moment';
import { AUTH_TOKEN } from 'constants/AuthConstant';

const request = async (url, { method = "GET", params } = {}) => {
  let token = localStorage.getItem(AUTH_TOKEN) || null
  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*"
  };

  if (token !== 'undefined') {
    headers.Authorization = `Bearer ${token}`;
  }

  let requestOptions = {
    method,
    headers: headers,
    redirect: "follow",
  };

  if (method !== "GET") {
    requestOptions.body = JSON.stringify(params);
  }

  try {
    const response = await fetch(url, requestOptions);
    var statusCode = response.status;
    if(statusCode !== 204){
      return response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

export const get = (url, params) => request(url, { params });
export const post = (url, params) => request(url, { method: "POST", params });
export const del = (url, params) => request(url, { method: "DELETE", params });
export const put = (url, params) => request(url, { method: "PUT", params });
export const patch = (url, params) => request(url, { method: "PATCH", params });

export const formatDateTime = (date) => {
  const d = new Date(date);
  return Moment(d).format('DD MMM YYYY HH:mm:ss');
}

export const formatDateToISO8601 = (date) => {
  return date.split(" ")[0].split("/").reverse().join('-');
}

export const formatDate = (date) => {
  const d = new Date(date);
  return Moment(d).format('DD/MM/YYYY');
}