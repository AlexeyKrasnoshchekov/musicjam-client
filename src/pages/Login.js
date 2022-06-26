// import { useContext, useEffect, useRef, useState } from "react";
// import { context } from "../context/context";
// import { useHistory, useLocation, useParams } from "react-router-dom";
// import { getAccessToken, setUrl } from "../util/helpers";
import { Button, Col, Row, Divider, Image } from "antd";
import { useGetUrlQuery } from "../redux/loginQuery";


export default function Login() {


  const {data: url, isLoading: isLoadingUrl} = useGetUrlQuery();
  console.log('url', url);

  const handleLogin = async () => {
    if (url) {
      window.location = url;
      
    }
  };



  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={24}>
        <Row justify="center" align="bottom">
          <Image
            width={"80%"}
            preview={false}
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="Spotify-Logo"
          />
          <Divider />
          <Button
            xs={{ size: "small" }}
            sm={{ size: "middle" }}
            md={{ size: "middle" }}
            lg={{ size: "large" }}
            xl={{ size: "large" }}
            // size={"large"}
            onClick={handleLogin}
            type="primary"
          >
            LOGIN WITH SPOTIFY
          </Button>
        </Row>
      </Col>
    </Row>
  );
}
