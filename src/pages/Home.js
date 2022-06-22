// import { useEffect, useRef } from "react";
import Container from "../components/Container/Container";
// import { notification } from "antd";

export default function Home() {
  // const initialRender = useRef(true);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }

  //   notification.open({
  //     message: "Spotify token",
  //     description: "Token successfully set, you can continue",
  //     duration: 3,
  //   });
  // }, []);
  return (
    <div style={{ height: "100%" }}>
      <Container></Container>
    </div>
  );
}
