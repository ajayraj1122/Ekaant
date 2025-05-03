// import { createContext, useState, useContext, useEffect } from "react";
// import PropTypes from 'prop-types';
// import axios from 'axios';

// const CreditsContext = createContext();

// export const useCredits = () => {
//   const context = useContext(CreditsContext);
//   if (!context) {
//     throw new Error('useCredits must be used within a CreditsProvider');
//   }
//   return context;
// };

// export const CreditsProvider = ({ children }) => {
//   const [credits, setCredits] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fetchCredits = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get('https://ekaant.onrender.com/api/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.data?.employee?.credits !== undefined) {
//         setCredits(response.data.employee.credits);
//         localStorage.setItem('credits', response.data.employee.credits);
//       }
//     } catch (error) {
//       console.error('Error fetching credits:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCredits();

//     const handleCreditsUpdate = () => {
//       fetchCredits();
//     };

//     window.addEventListener('creditsUpdated', handleCreditsUpdate);
//     return () => window.removeEventListener('creditsUpdated', handleCreditsUpdate);
//   }, []);

//   const updateCredits = async (newAmount, operation = 'set') => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       const response = await axios.post(
//         'https://ekaant.onrender.com/api/update-credits',
//         { credits: newAmount, operation },
//         { headers: { Authorization: `Bearer ${token}` }}
//       );

//       if (response.data?.success) {
//         setCredits(response.data.credits);
//         localStorage.setItem('credits', response.data.credits);
//         return response.data.credits;
//       }

//       throw new Error(response.data?.message || 'Failed to update credits');
//     } catch (error) {
//       console.error('Credits update error:', error);
//       throw error;
//     }
//   };

//   const value = {
//     credits,
//     updateCredits,
//     refreshCredits: fetchCredits,
//     loading
//   };

//   return (
//     <CreditsContext.Provider value={value}>
//       {children}
//     </CreditsContext.Provider>
//   );
// };

// CreditsProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default CreditsProvider;
import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

const CreditsContext = createContext();

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login...');
        window.location.href = '/sign-in';
        return;
      }

      const response = await axios.get('https://ekaant.onrender.com/api/employee/profile', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data?.employee?.credits !== undefined) {
        setCredits(response.data.employee.credits);
        localStorage.setItem('credits', response.data.employee.credits);
      } else {
        throw new Error('Credits data not found in response');
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/sign-in';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();

    const handleCreditsUpdate = () => {
      fetchCredits();
    };

    window.addEventListener('creditsUpdated', handleCreditsUpdate);
    return () => window.removeEventListener('creditsUpdated', handleCreditsUpdate);
  }, []);

  const updateCredits = async (newAmount, operation = 'set') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.post(
        'https://ekaant.onrender.com/api/update-credits',
        { credits: newAmount, operation },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.data?.success) {
        setCredits(response.data.credits);
        localStorage.setItem('credits', response.data.credits);
        return response.data.credits;
      }

      throw new Error(response.data?.message || 'Failed to update credits');
    } catch (error) {
      console.error('Credits update error:', error);
      throw error;
    }
  };

  const value = {
    credits,
    updateCredits,
    refreshCredits: fetchCredits,
    loading
  };

  return (
    <CreditsContext.Provider value={value}>
      {children}
    </CreditsContext.Provider>
  );
};

CreditsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CreditsProvider;