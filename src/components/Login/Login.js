import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../store/context";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { getAccessToken, setUrl } from "../../util/Spotify";

export default function Login() {
  const { setToken, setTokenIsSet, auth } = useContext(context);
  const [authUrlIsSet, setAuthUrlIsSet] = useState(false);

  const initialRender = useRef(true);
  const location = useLocation();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (location.hash) {
      const tokenLocal = getAccessToken();
      setToken(tokenLocal);
      setTokenIsSet(true);
      // spotify.setAccessToken(token)
      // setTokenIsSet(true);
      // console.log("token", token);
    }
  }, [authUrlIsSet]);

  const handleLogin = () => {
    setUrl();
    setAuthUrlIsSet(true);
  };

  return (
    <div>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify-Logo"
      />
      {/* <Link to={`/home`}> */}
      <button onClick={handleLogin}>LOGIN WITH SPOTIFY</button>
      {/* </Link> */}
    </div>
  );
}
