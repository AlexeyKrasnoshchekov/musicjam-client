import React, { useState } from "react";
import { useCreatePlaylistMutation } from "../../redux/playlistsQuery";
import {
  UnorderedListOutlined,
  PlaySquareOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { Button, Input, Menu, Modal } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link, useHistory } from "react-router-dom";

export default function MyMenu({ myAlbums, notEmptyPlaylists }) {
  const [createPlaylist, { isError }] = useCreatePlaylistMutation();

  const [playlistName, setPlaylistName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const handleOk = async () => {
    setIsModalVisible(false);
    await createPlaylist({ name: playlistName });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["sub1"]}
      style={{
        height: "100%",
      }}
    >
      <SubMenu key="sub1" title="Playlists" icon={<UnorderedListOutlined />}>
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
                  <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                </Menu.Item>
              );
            })}
        </>
      </SubMenu>
      <SubMenu key="sub2" title="Saved Albums" icon={<PlaySquareOutlined />}>
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
          history.push(`/savedtracks`);
        }}
      >
        Saved Tracks
      </Menu.Item>
    </Menu>
  );
}
