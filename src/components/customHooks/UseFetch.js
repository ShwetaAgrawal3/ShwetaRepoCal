import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UseFetch = (url, initialPayload) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback((payload = initialPayload) => {
    setLoading(true);
    setError(null);

    axios.post(url, payload)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url, initialPayload]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData };
};

export default UseFetch;