import MyHeader from "../Header/Header";
import './container.css';
import { matchPath, useRouteMatch } from "react-router-dom";

import {
  Layout,
  Menu,
  icons,
  Modal,
  Input,
  Button,
  Divider,
  Space,
} from "antd";
import {
  UnorderedListOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import Playlists from "../Playlists/Playlists";
import { context } from "../../context/context";
import { useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    playlists,
    createPlaylist,
    getAlbum,
    getPlaylists,
    getPlaylist,
    // search,
    mySavedAlbums,
    getMySavedAlbums,
    clearPlaylists,
    clearPlaylistItems,
  } = useContext(context);

  const [playlistName, setPlaylistName] = useState("");

  const initialRender = useRef(true);
  const history = useHistory();
  
  const {path} =  useRouteMatch();
  const isHome = matchPath(path, {
    path: "/",
    exact: true,
    strict: false,
  });
  console.log('isHome', isHome);
  // console.log('match', match.url);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await createPlaylist(playlistName);
    await clearPlaylists();
    await getPlaylists();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const onChange = (data) => {
  //   setValue(data);
  // };

  const handlePlaylistClick = async (id: string) => {
    console.log("111222");
    await clearPlaylistItems();
    await getPlaylist(id);
    history.push(`/playlist/${id}`);
  };

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };

  console.log("mySavedAlbums", mySavedAlbums);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlists.length === 0 && getPlaylists();
    mySavedAlbums.length === 0 && getMySavedAlbums();
    // mySavedTracks.length === 0 && getMySavedTracks();
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["sub1"]}
          // defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
          }}
        >
          {/* <Divider plain={true} /> */}
          <SubMenu
            key="sub1"
            title="Playlists"
            icon={<UnorderedListOutlined />}
          >
            <>
              <Menu.Item key="1">
                <Button onClick={() => showModal()}>Create</Button>
              </Menu.Item>
              <Modal
                title="New playlist"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    setPlaylistName(e.target.value);
                  }}
                  placeholder="enter playlist name"
                />
              </Modal>
              {playlists.map((playlist, index) => {
                const subKey = 1 + index + 1;
                return (
                  <Menu.Item
                    key={subKey}
                    onClick={() => {
                      handlePlaylistClick(playlist.id);
                    }}
                  >
                    {playlist.name}
                  </Menu.Item>
                );
              })}
            </>
          </SubMenu>
          <SubMenu
            key="sub2"
            title="Saved Albums"
            icon={<PlaySquareOutlined />}
          >
            {mySavedAlbums.map((item, index) => {
              const subKey = 1 + playlists.length + index + 1;
              return (
                <Menu.Item
                  key={subKey}
                  onClick={() => {
                    handleGetAlbum(item.album.id);
                  }}
                >{`${item.album.name} (${item.album.artists[0].name})`}</Menu.Item>
              );
            })}
          </SubMenu>
          <Menu.Item
            key={1 + playlists.length + mySavedAlbums.length + 1}
            icon={<HeartOutlined />}
            onClick={() => {
              history.push(`/savedtracks`);
            }}
          >
            Saved Tracks
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header>
          {/* <div className="logo" /> */}
          <MyHeader />
        </Header>
        <Content
          // style={{
          //   margin: "0 16px",
          // }}
          // className="home"
          className={isHome && "home"}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 20,
            }}
          >
            {props.children}
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Container;

// export default function Container(props) {

//   return (
//     <div className="home">
//       <Header />
//       <div style={{ display: "flex", minHeight: '94%', color: 'lightcyan' }}>
//         <div className="sidebar">
//           <Playlists />
//         </div>
//         <main id="main" style={{width: '100%', paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '2rem'}}>{props.children}</main>
//       </div>
//     </div>
//   );
// }
