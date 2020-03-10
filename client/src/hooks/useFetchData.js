import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { setUserLists } from '../actions';
import useSessionStorage from './useSessionStorage';
import api from '../services/api';

const useFetchData = () => {
  const { state: { user }, dispatch } = useStore();
  const [response, setResponse] = useState({ lists: [], isLoading: false, error: null });
  const [token] = useSessionStorage('token');
  const [options, setOptions] = useState({ headers: { 'authorization': `Bearer ${token}` } });

  const getUserLists = useCallback(async () => {
    try {
      const { data: { lists } } = await api.get(`/lists/${user._id}`, options);
      setResponse({ lists, isLoading: false, error: null });
      dispatch(setUserLists(lists));
    } catch (error) {
      setResponse({ lists: [], isLoading: false, error: error.message });
    }
  }, [user, dispatch, options])

  return [response, getUserLists];
}

export default useFetchData;