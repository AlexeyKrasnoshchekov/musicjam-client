import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context/context";
import { useLocation } from "react-router-dom";
import { getAccessToken, setUrl } from "../util/Spotify";
import { Button, Col, Row, Space, Divider } from "antd";

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
      setToken(tokenLocal);
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

  return (
    <>
    {/* <Space size="middle"></Space> */}
      <Row >
        <Col span={4}></Col>
        <Col span={16}>
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
        <Col span={4}></Col>
      </Row>
    </>
  );
}
