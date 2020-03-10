import { useState, useCallback } from 'react';
import useSessionStorage from './useSessionStorage';
import api from '../services/api';
import { useStore } from '../store';
import { setUserLists, setUserListsDialog } from '../actions';

const useAddMovie = ({ payload }) => {
  const { dispatch } = useStore();
  const [response, setResponse] = useState({ lists: [], isAddingMovie: false, isSuccess: false, error: null });
  const [token] = useSessionStorage('token');
  const [options, setOptions] = useState({ headers: { 'authorization': `Bearer ${token}` } });

  const addMovie = useCallback(async () => {
    try {
      setResponse({ isAddingMovie: true });
      const { data: { lists } } = await api.post('/lists/add-movie', payload, options);
      setResponse({ lists, isAddingMovie: false, isSuccess: true, error: null });
      dispatch(setUserLists(lists));
      dispatch(setUserListsDialog(false));
    } catch (error) {
      setResponse({ lists: [], isAddingMovie: false, isSuccess: false, error: error.message });
    }
  }, [payload, options])

  return [response, addMovie];
}

export default useAddMovie;