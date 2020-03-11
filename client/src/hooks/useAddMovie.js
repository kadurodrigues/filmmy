import { useState, useCallback } from 'react';
import useSessionStorage from './useSessionStorage';
import api from '../services/api';
import { useStore } from '../store';
import { setUserLists, setUserListsDialog, setSnackbar } from '../actions';
import { SNACKBAR_TYPE, SNACKBAR_MESSAGES } from '../utils/constants';

const useAddMovie = ({ payload }) => {
  const { dispatch: { userDispatch, feedbackDispatch} } = useStore();
  const [response, setResponse] = useState({ lists: [], isAddingMovie: false, isSuccess: false, error: null });
  const [token] = useSessionStorage('token');
  const [options, setOptions] = useState({ headers: { 'authorization': `Bearer ${token}` } });

  const addMovie = useCallback(async () => {
    try {
      setResponse({ isAddingMovie: true });
      const { data: { lists } } = await api.post('/lists/add-movie', payload, options);
      setResponse({ lists, isAddingMovie: false, isSuccess: true, error: null });
      userDispatch(setUserLists(lists));
      feedbackDispatch(setUserListsDialog(false));
      feedbackDispatch(setSnackbar({
        show: true,
        message: SNACKBAR_MESSAGES.addMovieSuccess,
        options: SNACKBAR_TYPE.success
      }));
    } catch (error) {
      setResponse({ lists: [], isAddingMovie: false, isSuccess: false, error: error.message });
      feedbackDispatch(setSnackbar({
        show: true,
        message: error.message,
        options: SNACKBAR_TYPE.error
      }));
    }
  }, [payload, options])

  return [response, addMovie];
}

export default useAddMovie;