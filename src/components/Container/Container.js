import Header1 from "../Header/Header";
import "./container.css";

import { Layout, Menu, icons, AutoComplete } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import Playlists from "../Playlists/Playlists";
import { context } from "../../context/context";
import { useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;



const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { playlists, getAlbum, getPlaylists, getPlaylist, search, mySavedAlbums, getMySavedAlbums, mySavedTracks, getMySavedTracks } = useContext(context);

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const initialRender = useRef(true);
  const history = useHistory();

  // const { playlists} = useContext(context);
  // console.log('playlists',playlists);
  // const items = [
  //   // getItem('Option 1', '1', <PieChartOutlined />),
  //   // getItem('Option 2', '2', <DesktopOutlined />),
  //   getItem('Playlists', '1', <UnorderedListOutlined />, playlists),
  //   // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   // getItem('Files', '9', <FileOutlined />),
  // ];

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
    search(data);
    history.push("/search");
  };

  const onChange = (data) => {
    setValue(data);
  };

  const handlePlaylistClick = async (id: string) => {
    console.log("111222");
    await getPlaylist(id);
    history.push("/playlist");
  };

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`)
  }

  const items3 = [UnorderedListOutlined].map((icon, index) => {
    const key = String(index + 1);
    const length = playlists.length;
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Playlists`,
      children: playlists.map((playlist, j) => {
        const subKey = index * length + j + 1;
        return {
          key: subKey,
          id: playlist.id,
          label: `${playlist.name} (${playlist.tracks.total})`,
        };
      }),
    };
  });

  console.log('mySavedAlbums', mySavedAlbums)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    playlists.length === 0 && getPlaylists();
    mySavedAlbums.length === 0 && getMySavedAlbums();
    mySavedTracks.length === 0 && getMySavedTracks();
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
        <AutoComplete
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onSelect}
          onSearch={onSearch}
          placeholder="input here"
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={["sub1"]}
          // defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
          }}
        >
          <SubMenu key="sub1" title="Playlists">
            {playlists.map((playlist, index) => {
              const subKey = playlists.length + index + 1;
              return <Menu.Item key={subKey} onClick={() => {handlePlaylistClick(playlist.id)}}>{playlist.name}</Menu.Item>
            })}
          </SubMenu>
          <SubMenu key="sub2" title="Saved Albums">
            {mySavedAlbums.map((item, index) => {
              const subKey = mySavedAlbums.length + index + 1;
              return <Menu.Item key={subKey} onClick={() => {handleGetAlbum(item.album.id)}}>{`${item.album.name} (${item.album.artists[0].name})`}</Menu.Item>
            })}
          </SubMenu>
          <Menu.Item key="1" onClick={() => {history.push(`/savedtracks`)}}>Saved Tracks</Menu.Item>
          {/* <SubMenu key="sub3" title="Saved Tracks">
            {mySavedAlbums.map((item, index) => {
              const subKey = mySavedAlbums.length + index + 1;
              return <Menu.Item key={subKey} onClick={() => {handleGetAlbum(item.album.id)}}>{`${item.album.name} (${item.album.artists[0].name})`}</Menu.Item>
            })}
          </SubMenu> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <div className="logo" />
          <Header1 />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
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
