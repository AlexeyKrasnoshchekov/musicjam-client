import {
  MenuOutlined,
  UnorderedListOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input, Menu, Modal } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGetAlbumsQuery } from "../../redux/albumsQuery";
import {
  useCreatePlaylistMutation,
  useGetPlaylistsQuery,
} from "../../redux/playlistsQuery";
import { useGetUserQuery } from "../../redux/userQuery";

const MyDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [notEmptyPlaylists, setNotEmptyPlaylists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
  const [createPlaylist, { isError }] = useCreatePlaylistMutation();

  const history = useHistory();

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await createPlaylist({ name: playlistName });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                  {notEmptyPlaylists &&
                    notEmptyPlaylists.map((playlist, index) => {
                      const subKey = 1 + index + 1;
                      return (
                        <Menu.Item key={subKey}>
                          <Link to={`/playlist/${playlist.id}`}>
                            {playlist.name}
                          </Link>
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
                {myAlbums &&
                  myAlbums.map((item, index) => {
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
                key={1 + notEmptyPlaylists.length + myAlbums.length + 1}
                icon={<HeartOutlined />}
                onClick={() => {
                  history.push(`/musicjam/savedtracks`);
                }}
              >
                Saved Tracks
              </Menu.Item>
            </Menu>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default MyDrawer;
