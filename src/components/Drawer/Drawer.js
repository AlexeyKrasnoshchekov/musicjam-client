import {
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGetAlbumsQuery } from "../../redux/albumsQuery";
import {
  
  useGetPlaylistsQuery,
} from "../../redux/playlistsQuery";
import { useGetUserQuery } from "../../redux/userQuery";
import MyMenu from "../Menu/Menu";

const MyDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [notEmptyPlaylists, setNotEmptyPlaylists] = useState([]);
  
  

  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
  

  

  useEffect(() => {
    if (playlists) {
      let playlistsWithSongs = playlists.filter(
        (playlist) => playlist.tracks.total !== 0
      );

      if (playlistsWithSongs.length !== 0) {
        playlistsWithSongs.forEach((item) => {
          setNotEmptyPlaylists((state) => [...state, item]);
        });
      }
    }
  }, [playlists]);

  // const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  //   (icon, index) => {
  //     const key = String(index + 1);
  //     return {
  //       key: `sub${key}`,
  //       icon: React.createElement(icon),
  //       label: `subnav ${key}`,
  //       children: new Array(4).fill(null).map((_, j) => {
  //         const subKey = index * 4 + j + 1;
  //         return {
  //           key: subKey,
  //           label: `option${subKey}`,
  //         };
  //       }),
  //     };
  //   }
  // );

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  

  return (
    <>
      {notEmptyPlaylists && myAlbums && (
        <div className="drawer">
          <Button type="primary" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
          {/* <MenuOutlined onClick={showDrawer}/> */}
          <Drawer
            title={`Logged in as ${user && user.display_name}`}
            placement="left"
            onClose={onClose}
            visible={visible}
          >
            {myAlbums && notEmptyPlaylists && <MyMenu myAlbums={myAlbums} notEmptyPlaylists={notEmptyPlaylists}/>}
          </Drawer>
        </div>
      )}
    </>
  );
};

export default MyDrawer;
