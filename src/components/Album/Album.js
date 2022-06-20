import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Image,
  Menu,
  Row,
  Space,
  Table,
  Typography,
  notification,
} from "antd";

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/context";
import { useGetAlbumQuery, useGetAlbumsQuery } from "../../redux/albumsQuery";
import { useGetPlaylistsQuery } from "../../redux/playlistsQuery";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
  const [albumIsSaved, setAlbumIsSaved] = useState(false);

  const [data, setData] = useState([]);
  const { Title } = Typography;

  const {
    token,
    refreshPage,
    album,
    getAlbum,
    addToMySavedAlbums,
    clearSavedAlbums,
    getMySavedAlbums,
    removeFromMySavedAlbums,
    addToPlaylist,
    playlists,
    addToMySavedTracks,
    clearSavedTracks,
    getMySavedTracks,
    mySavedAlbums,
  } = useContext(context);

  const { id } = useParams();

  const { data: album1, isLoading: isLoadingAlbum } = useGetAlbumQuery(id);
  const { data: playlists1, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  console.log("album1", album1);

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
  };

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   token === "" && refreshPage();
  // }, [token]);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   handleGetAlbum(id);
  // }, [id]);

  useEffect(() => {
    if (album1) {
      checkForSavedAlbum(album1.id);
      album1.tracks.items.length !== 0 && setData([]);
      formatData();
    }
  }, [album1]);

  const columns = [
    {
      title: "Track",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
    },
    {
      title: "Add to playlist",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => (
        <Dropdown
          overlay={
            <Menu>
              {playlists1 && playlists1.length !==0 && playlists1
                .filter((playlist) => playlist.tracks.total !== 0)
                .map((playlist, index) => {
                  return (
                    <Menu.Item
                      key={index}
                      onClick={() => {
                        handleAddToPlaylist(
                          playlist.id,
                          data.filter((item, i) => rowIndex === i)[0].uri
                        );
                      }}
                    >
                      {playlist.name}
                    </Menu.Item>
                  );
                })}
            </Menu>
          }
        >
          <Space>
            <PlusSquareOutlined />
            {/* <DownOutlined /> */}
          </Space>
        </Dropdown>
      ),
    },
    {
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: () => <HeartOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            let trackId = elem.id;
            handleAddTrack(trackId);
          },
        };
      },
    },
  ];

  const formatData = () => {
    album1.tracks &&
      album1.tracks.items.forEach((item) => {
        createDataObj(
          item.name,
          item.track_number,
          item.duration_ms / 1000,
          item.uri,
          item.id
        );
      });
  };

  const createDataObj = (name, trackNumber, duration, uri, id) => {
    let obj = {
      name: "",
      number: "",
      duration: "",
      uri: "",
      id: "",
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.name = name;
    obj.number = trackNumber;
    obj.duration = `${duration_min}:${duration_sec}`;
    obj.uri = uri;
    obj.id = id;
    // setData([]);
    setData((data) => [...data, obj]);
  };

  const handleAddToMyAlbums = async () => {
    await addToMySavedAlbums(album.id);
    await clearSavedAlbums();
    await getMySavedAlbums();
    setAlbumIsSaved((state) => !state);
  };
  const handleDeleteFromMyAlbums = async () => {
    await removeFromMySavedAlbums(album.id);
    await clearSavedAlbums();
    await getMySavedAlbums();
    setAlbumIsSaved((state) => !state);
  };
  const handleAddTrack = async (trackId) => {
    await addToMySavedTracks(trackId);
    await clearSavedTracks();
    await getMySavedTracks();
  };

  const handleAddToPlaylist = async (playlistId, trackUri) => {
    let status = await addToPlaylist(playlistId, trackUri);

    if (status) {
      notification.open({
        message: "Track was added to playlist",
        duration: 3,
      });
    } else {
      notification.open({
        message: "Track is already in playlist",
        duration: 3,
      });
    }
  };

  const checkForSavedAlbum = (albumId) => {
    myAlbums && myAlbums.length !== 0 &&
      myAlbums.forEach((savedAlbum) => {
        if (savedAlbum.album.id === albumId) {
          setAlbumIsSaved(true);
        }
      });
  };

  return (
    <>
      {album1 && (
        <Row>
          <Col span={8}>
            <Image
              width={300}
              src={album1.images.length !== 0 && album1.images[imageIndex].url}
            />
          </Col>
          <Col span={16}>
            <Title
              level={2}
            >{`${album1.tracks.items[0].artists[0].name} - ${album1.name}`}</Title>
            <Title level={4}>{`Released: ${album1.release_date}`}</Title>
            <Title level={4}>{`Popularity: ${album1.popularity}`}</Title>
            <Title level={4}>{`Total tracks: ${album1.total_tracks}`}</Title>
            {/* {albumIsSaved ? (
              <Button onClick={() => handleDeleteFromMyAlbums()}>Unsave</Button>
            ) : (
              <Button onClick={() => handleAddToMyAlbums()}>Save</Button>
            )} */}
          </Col>
        </Row>
      )}

      <Row>
        <Col span={24}>
          {data && (
            <Table pagination={false} columns={columns} dataSource={data} />
          )}
        </Col>
      </Row>
    </>
  );
}
