import { useState } from 'react';
import api from '../services/api';

const useAddMovie = ({ url, payload, headerOptions }) => {
  const [res, setResponse] = useState({ data: null, isLoading: false, error: null });

  const callAPI = useCallback(() => {
    setResponse(prevState => ({ ...prevState, isLoading: true }));

    api.post(url, payload, headerOptions).then(res => {
      setResponse({ data: res.data, isLoading: false, error: null });
    }).catch((error) => {
      setResponse({ data: null, isLoading: false, error: error.message });
      setError(error.message)
    })

  }, [url, payload, headerOptions]);

  return [res, callAPI];
}

export default useAddMovie;