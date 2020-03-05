import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { setUserLists } from '../actions';
import api from '../services/api';

const useFetchUserLists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequestFailed, setHasRequestFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { state: { user, lists }, dispatch } = useStore();

  useEffect(() => {
    if (!lists.length) {
      setIsLoading(true);
      fetchUserLists(user._id)
        .then(lists => {
          setIsLoading(false);
          dispatch(setUserLists(lists));
        })
        .catch(error => {
          setIsLoading(false);
          setHasRequestFailed(true);
          setErrorMessage(error.message);
        })
    }
  }, [user._id])

  return {
    isLoading,
    hasRequestFailed,
    setHasRequestFailed,
    errorMessage
  }
}

async function fetchUserLists(userId) {
  let token = JSON.parse(window.sessionStorage.getItem('token'));

  const { 
    data: { lists } 
  } = await api.get(`/lists/${userId}`, { headers: { 'authorization': `Bearer ${token}` }});

  return lists ? lists : [];
}

export default useFetchUserLists;