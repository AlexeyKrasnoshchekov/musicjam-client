import { useEffect, useState } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";
import { AutoComplete, Row, Col, Typography, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/userQuery";
import MyDrawer from "../Drawer/Drawer";
import { isMobile } from "react-device-detect";

function MyHeader() {
  const { Title } = Typography;

  const history = useHistory();
  const [options, setOptions] = useState([]);

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])

  

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery();


  // const types = ["artist", "album", "track"];

  const handleLogout = async () => {
    history.push("/musicjam/");
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = (data) => {
    // search(data);
    const term = data.replace(/ /g, "_")
    history.push(`/musicjam/search/${term}`);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col span={12}>
              <AutoComplete
                allowClear={true}
                options={options}
                style={{
                  width: 200,
                }}
                onSelect={onSelect}
                onSearch={onSearch}
                placeholder="input here"
              />
            </Col>
            <Col span={12}>
              {/* <div>App</div> */}
              <Row align="middle" justify="end">
                <Space size="middle">
                  {windowDimenion.winWidth > 768 && <Title
                    style={{
                      color: "white",
                      marginTop: "0.5em",
                    }}
                    level={5}
                  >{`Logged in as ${user && user.display_name}`}</Title>}
                  {windowDimenion.winWidth < 768 && <MyDrawer />}
                  <LogoutOutlined
                    style={{
                      color: "white",
                    }}
                    onClick={handleLogout}
                  />
                </Space>
                
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default MyHeader;
