import { useContext, useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MyHeader from "../Header/Header";
import { Link, matchPath, useLocation, useRouteMatch } from "react-router-dom";
import { useGetPlaylistsQuery } from '../../redux/playlistsQuery';

import { Layout, Menu, Modal, Input, Button } from "antd";
import "./container.css";
import {
  UnorderedListOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { context } from "../../context/context";
import { useHistory } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { useGetAlbumsQuery } from "../../redux/albumsQuery";
const { Header, Content, Sider } = Layout;

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notEmptyPlaylists, setNotEmptyPlaylists] = useState([]);
  const [mySavedAlbums1, setMySavedAlbums1] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const {data: playlists1, isLoading: isLoadingPlaylists} = useGetPlaylistsQuery();
  const {data: myAlbums, isLoading: isLoadingAlbums} = useGetAlbumsQuery();
  // const playlistsData = useGetPlaylistsQuery();
  // const playlists1 = playlistsData.data;
  console.log('ffgg', playlists1);
  console.log('myAlbums', isLoadingAlbums);

  const {
    createPlaylist,
    getPlaylists,
    clearPlaylists,
  } = useContext(context);

  const [playlistName, setPlaylistName] = useState("");

  const history = useHistory();

  const { path } = useRouteMatch();
  const isHome = matchPath(path, {
    path: "/",
    exact: true,
    strict: false,
  });

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



  useEffect(() => {
    if (playlists1) {
      let playlistsWithSongs = playlists1.filter(
        (playlist) => playlist.tracks.total !== 0
      );

      if (playlistsWithSongs.length !== 0) {
        playlistsWithSongs.forEach((item) => {
          setNotEmptyPlaylists(state => [...state, item])
        });
      }
    }
  }, [playlists1]);

  useEffect(() => {
    if (myAlbums) {
      if (myAlbums.length !== 0) {
        myAlbums.forEach((item) => {
          setMySavedAlbums1(state => [...state, item])
        });
      }
    }
  }, [myAlbums]);

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
      hasSider={true}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={"20%"}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["sub1"]}
          style={{
            height: "100%",
          }}
        >
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
              {notEmptyPlaylists.map((playlist, index) => {
                const subKey = 1 + index + 1;
                return (
                  <Menu.Item key={subKey}>
                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
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
            {mySavedAlbums1.map((item, index) => {
              const subKey = 1 + notEmptyPlaylists.length + index + 1;
              return (
                <Menu.Item key={subKey}>
                  <Link to={`/album/${item.album.id}`}>
                    {`${item.album.name} (${item.album.artists[0].name})`}
                  </Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
          <Menu.Item
            key={1 + notEmptyPlaylists.length + mySavedAlbums1.length + 1}
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
          <MyHeader />
        </Header>

        <Content
          className={isHome && "home"}
          style={{
            padding: 20,
            overflowY: 'scroll'
          }}
        >
          <TransitionGroup>
            <CSSTransition timeout={1000} classNames="fade" key={location.key}>
              <>{props.children}</>
            </CSSTransition>
          </TransitionGroup>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Container;
