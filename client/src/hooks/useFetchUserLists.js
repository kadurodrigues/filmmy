import { useState, useEffect } from 'react';
import api from '../services/api';

const useFetchUserLists = (userId) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRequestFailed, setHasRequestFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchUserLists(userId)
      .then(lists => {
        setIsLoading(false);
        setLists(lists);
      })
      .catch(error => {
        setIsLoading(false);
        setHasRequestFailed(true);
      })
  }, [userId])

  return {
    lists,
    isLoading,
    hasRequestFailed,
    setHasRequestFailed
  }
}

async function fetchUserLists(userId) {
  let token = JSON.parse(window.sessionStorage.getItem('token'));

  const headerOptions = {
    'Authorization': `Bearer ${token}`
  }

  const { data } = await api.get(`/lists/${userId}`, { headers: headerOptions });
  return data ? data : [];
}

export default useFetchUserLists;