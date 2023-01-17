import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function withAuth(WrappedComponent) {
  return function (props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;