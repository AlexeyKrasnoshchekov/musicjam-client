import React, { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import MyHeader from "../Header/Header";
import {
  matchPath,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useGetPlaylistsQuery } from "../../redux/playlistsQuery";

import { Layout } from "antd";
import "./container.css";

import { useGetAlbumsQuery } from "../../redux/albumsQuery";
import MyMenu from "../Menu/Menu";
const { Header, Content, Sider } = Layout;

const Container = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notEmptyPlaylists, setNotEmptyPlaylists] = useState([]);

  const location = useLocation();
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();

  const { path } = useRouteMatch();
  const isHome = matchPath(path, {
    path: "/home",
    exact: true,
    strict: false,
  });

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  useEffect(() => {
    if (playlists) {
      let playlistsWithSongs = playlists.filter(
        (playlist) => playlist.tracks.total !== 0
      );

      setNotEmptyPlaylists([]);

      if (playlistsWithSongs.length !== 0) {
        playlistsWithSongs.forEach((item) => {
          setNotEmptyPlaylists((state) => [...state, item]);
        });
      }
    }
  }, [playlists]);

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
      hasSider={true}
    >
      {windowDimenion.winWidth > 768 && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={"20%"}
        >
          {myAlbums && notEmptyPlaylists && (
            <MyMenu myAlbums={myAlbums} notEmptyPlaylists={notEmptyPlaylists} />
          )}
        </Sider>
      )}
      <Layout className="site-layout">
        <Header>
          <MyHeader />
        </Header>

        <Content
          className={isHome && "home"}
          style={{
            padding: 20,
            overflowY: "scroll",
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

export default React.memo(Container);
