import { useState, useCallback } from 'react';
import useSessionStorage from './useSessionStorage';
import api from '../services/api';

const useAddMovie = ({ payload }) => {
  const [response, setResponse] = useState({ movie: {}, isLoading: false, error: null });
  const [token] = useSessionStorage('token');
  const [options, setOptions] = useState({ headers: { 'authorization': `Bearer ${token}` }});

  const addMovie = useCallback(async () => {
    try {
      const { data: { movie } } = await api.post('/lists/add-movie', payload, options);
      setResponse({ movie, isLoading: false, error: null });
    } catch (error) {
      setResponse({ movie: {}, isLoading: false, error: error.message });
    }
  }, [payload, options])

  return [response, addMovie];
}

export default useAddMovie;