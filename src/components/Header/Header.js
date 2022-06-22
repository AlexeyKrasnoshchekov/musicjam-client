import { useState } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";
import { AutoComplete, Row, Col, Typography, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "../../redux/userQuery";
import { setAuthStatus } from "../../redux/authStatusSlice";

function MyHeader() {
  const { Title } = Typography;

  const history = useHistory();
  const [options, setOptions] = useState([]);

  

  const { data: user1, isLoading: isLoadingUser } = useGetUserQuery();

  console.log('user1', user1);

  // const types = ["artist", "album", "track"];

  const handleLogout = async () => {
    setAuthStatus(false);
    history.push("/");
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
    console.log('ffggfg', data);
    const term = data.replace(/ /g, "_")
    history.push(`/search/${term}`);
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
                  <Title
                    style={{
                      color: "white",
                      marginTop: "0.5em",
                    }}
                    level={5}
                  >{`Logged in as ${user1 && user1.display_name}`}</Title>
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
