import React, { useContext, useEffect, useRef } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { context } from '../context/context';

export default function Callback() {
const { getToken,tokenIsSet, setTokenIsSet } = useContext(context);
const location = useLocation();
const history = useHistory();
console.log('location', location);
const initialRender = useRef(true);

useEffect(() => {
    if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      getToken(location.search);
    setTokenIsSet(true);
    // history.push('/');
  }, []);

  useEffect(() => {
    tokenIsSet && history.push('/');
  }, [tokenIsSet]);

  return (
    <div></div>
  )
}
