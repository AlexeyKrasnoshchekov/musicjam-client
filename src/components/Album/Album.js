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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteAlbumMutation, useGetAlbumQuery, useGetAlbumsQuery, useSaveAlbumMutation } from "../../redux/albumsQuery";
import { useAddToPlaylistMutation, useGetPlaylistsQuery } from "../../redux/playlistsQuery";
import { useSaveTrackMutation } from "../../redux/savedTracksQuery";
import "./album.css";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(0);
  const [albumIsSaved, setAlbumIsSaved] = useState(false);

  const [data, setData] = useState([]);
  const { Title } = Typography;

  // const {
  //   token,
  //   refreshPage,
  //   album,
  //   getAlbum,

  //   clearSavedAlbums,
  //   getMySavedAlbums,
  //   removeFromMySavedAlbums,
  //   playlists,
  //   clearSavedTracks,
  //   getMySavedTracks,
  //   mySavedAlbums,
  // } = useContext(context);

  const { id } = useParams();

  const { data: album, isLoading: isLoadingAlbum } = useGetAlbumQuery(id);
  const { data: playlists1, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  const [addToPlaylist, {isError:addPlaylistError}] = useAddToPlaylistMutation();
  const [saveAlbum, {isError:saveAlbumError}] = useSaveAlbumMutation();
  const [saveTrack, {isError:saveTrackError}] = useSaveTrackMutation();
  const [deleteAlbum] = useDeleteAlbumMutation();

  // const handleGetAlbum = async (id) => {
  //   await getAlbum(id);
  // };

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
    if (album) {
      checkForSavedAlbum(album.id);
      album.tracks.items.length !== 0 && setData([]);
      
      album.tracks.items.length !== 0 &&
      album.tracks.items.forEach((item) => {
        setData((data) => [
          ...data,
          {
            name: item.name,
            number: item.artists[0].name,
            duration: item.duration_ms / 1000,
            uri: item.uri,
            id: item.id
          },
        ]);
      });
    }
  }, [album]);


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

 

  const handleAddToMyAlbums = async () => {
    await saveAlbum({albumId: album.id});
    // await clearSavedAlbums();
    // await getMySavedAlbums();
    setAlbumIsSaved((state) => !state);
  };
  const handleDeleteFromMyAlbums = async () => {
    await deleteAlbum(album.id);
    // await clearSavedAlbums();
    // await getMySavedAlbums();
    setAlbumIsSaved((state) => !state);
  };
  const handleAddTrack = async (trackId) => {
    await saveTrack({trackId});
    // await clearSavedTracks();
    // await getMySavedTracks();
  };

  const handleAddToPlaylist = async (playlistId, trackUri) => {
    await addToPlaylist({playlistId: playlistId, uri: trackUri});

    if (!addPlaylistError) {
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
      {album && (
        <Row>
          <Col span={8}>
            <Image
              width={300}
              src={album.images.length !== 0 && album.images[imageIndex].url}
            />
          </Col>
          <Col span={16}>
            <Title
              level={2}
            >{`${album.tracks.items[0].artists[0].name} - ${album.name}`}</Title>
            <Title level={4}>{`Released: ${album.release_date}`}</Title>
            <Title level={4}>{`Popularity: ${album.popularity}`}</Title>
            <Title level={4}>{`Total tracks: ${album.total_tracks}`}</Title>
            {albumIsSaved ? (
              <Button onClick={() => handleDeleteFromMyAlbums()}>Unsave</Button>
              // <Button>Unsave</Button>
            ) : (
              <Button onClick={() => handleAddToMyAlbums()}>Save</Button>
            )}
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
