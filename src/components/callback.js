import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// import { setAuthStatus } from "../redux/authStatusSlice";
// import { useSelector } from "react-redux";
import { useGetTokenQuery } from "../redux/loginQuery";

export default function Callback() {
  const location = useLocation();
  const history = useHistory();


  // const initialRender = useRef(true);

  // const isLoggedIn = useSelector(selectAuthStatus);
  const {data, isLoading: isLoadingSavedToken} = useGetTokenQuery(location.search);
  

  useEffect(() => {
    // setAuthStatus(true);
    data && history.push("/home");
  }, [data]);

  return <></>;
}
