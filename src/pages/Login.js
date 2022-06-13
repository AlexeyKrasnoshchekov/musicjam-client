import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/context";
import { useLocation } from "react-router-dom";
import { getAccessToken, setUrl } from "../util/Spotify";
import { Button, Col, Row, Divider } from "antd";

export default function Login() {
  const { setToken, setTokenIsSet, token } = useContext(context);
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
      console.log('tokenLocal',tokenLocal);
      setToken(tokenLocal);
      localStorage.setItem('token', tokenLocal);
      setTokenIsSet(true);
    }
  }, [authUrlIsSet]);

  const handleLogin = () => {
    if (token === "") {
      setUrl();
      setAuthUrlIsSet(true);
    } else {
      setTokenIsSet(true);
    }
  };

  setInterval(() => {
    setUrl();

    if (location.hash) {
      const tokenLocal = getAccessToken();
      console.log('tokenLocal',tokenLocal);
      localStorage.setItem('token', tokenLocal);
      // setTokenExpiresIn(tokenLocal.expiresIn);
      setToken(tokenLocal);
      setTokenIsSet(true);
    }

  }, 3600 * 1000); //one hour

  return (
    <>
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Row justify="center" align="bottom">
            <img
              src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
              alt="Spotify-Logo"
            />
            <Divider />
            <Button onClick={handleLogin} type="primary">
              LOGIN WITH SPOTIFY
            </Button>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
    </>
  );
}
