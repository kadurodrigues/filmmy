import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(url);
      setData(data);
    }

    fetchData();
  }, [url])

  return {
    data
  }
}

export default useFetch;