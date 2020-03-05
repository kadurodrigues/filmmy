import { useState, useCallback } from 'react';
import api from '../services/api';

const useFetchData = ({ url, headerOptions }) => {
  const [res, setResponse] = useState({ data: null, isLoading: false, error: null });

  // You POST method here
  const callAPI = useCallback(() => {
    setResponse(prevState => ({ ...prevState, isLoading: true }));

    api.get(url, headerOptions).then(res => {
      setResponse({ data: res.data, isLoading: false, error: null });
    }).catch((error) => {
      setResponse({ data: null, isLoading: false, error: error.message });
    })

  }, [url, headerOptions])

  // const getData = useCallback(async () => {
  //   try {
  //     const { data } = await api.get(url, headerOptions);
  //     console.log('api called');
  //     setResponse({ data, isLoading: false, error: null });
  //   } catch (error) {
  //     setResponse({ data: null, isLoading: false, error: error.message });
  //   }
  // }, [])

  // const postData = useCallback(async () => {
  //   try {
  //     const { data } = await api.post(url, payload, headerOptions);
  //     setResponse({ data, isLoading: false, error: null });
  //   } catch (error) {
  //     setResponse({ data: null, isLoading: false, error: error.message });
  //   }
  // }, [])

  // const callAPI = useCallback(() => {
  //   return method === 'get' ? getData() : postData()
  // }, [method, getData, postData]);

  return [res, callAPI];
}

// async function getData(url, headerOptions) {
//   const { data } = await api.get(url, headerOptions);
//   return data ? data : []
// }

// async function postData(url, payload, headerOptions) {
//   const { data } = await api.post(url, payload, headerOptions);
//   return data ? data : []
// }

export default useFetchData;