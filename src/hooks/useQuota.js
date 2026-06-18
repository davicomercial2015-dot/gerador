import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export function useQuota() {
  const [generations, setGenerations] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [hasQuota, setHasQuota] = useState(false);
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuota();
  }, []);

  const fetchQuota = async () => {
    const token = localStorage.getItem('depofast_token');
    if (!token) {
      setLoading(false);
      setHasQuota(false);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/quota`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('depofast_token');
          navigate('/login');
        }
        throw new Error('Erro ao buscar cota');
      }

      const data = await response.json();
      setPlan(data.plan);
      setRemaining(data.credits_remaining);
      setHasQuota(data.hasQuota);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuota = async () => {
    const token = localStorage.getItem('depofast_token');
    if (!token) return 0;

    try {
      const response = await fetch(`${API_URL}/api/consume-quota`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Cota esgotada ou erro no servidor');
      }

      const data = await response.json();
      setRemaining(data.credits_remaining);
      setHasQuota(data.credits_remaining > 0 || plan !== 'free');
      return data.credits_remaining;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  return { plan, hasQuota, incrementQuota, remaining, loading, fetchQuota };
}
