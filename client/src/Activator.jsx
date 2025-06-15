import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastErrorObject } from './utility/toasts';
import { fetchResponse } from './api/service';
// import { BASE_URL } from './api/config';

export default function Activator() {
  useEffect(() => {
    async function activator() {
      try {
        const resData = await fetchResponse(process.env.REACT_APP_API_URL, 0, null);
        console.log('Log data (Server Status)', resData);
        if (!resData) toast.error('Check your internet connection.', toastErrorObject);
      } catch (error) {
        console.error('test', error);
        toast.error(error, toastErrorObject);
      }
    }
    activator();

    // Set an interval to call the activator function every 30 seconds
    const interval = setInterval(activator, 30000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null;
}
