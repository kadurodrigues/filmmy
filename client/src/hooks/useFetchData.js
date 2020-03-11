import { useState, useCallback } from 'react';
import { useStore } from '../store';
import { setUserLists } from '../actions';
import useSessionStorage from './useSessionStorage';
import api from '../services/api';

const useFetchData = () => {
  const { 
    state: { user }, 
    dispatch: { userDispatch } 
  } = useStore();
  const [response, setResponse] = useState({ lists: [], isLoading: false, error: null });
  const [token] = useSessionStorage('token');
  const [options, setOptions] = useState({ headers: { 'authorization': `Bearer ${token}` } });

  const getUserLists = useCallback(async () => {
    try {
      const { data: { lists } } = await api.get(`/lists/${user._id}`, options);
      setResponse({ lists, isLoading: false, error: null });
      userDispatch(setUserLists(lists));
    } catch (error) {
      setResponse({ lists: [], isLoading: false, error: error.message });
    }
  }, [user, userDispatch, options])

  return [response, getUserLists];
}

export default useFetchData;