import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./SearchResults.css";
import { useGetSearchQuery } from "../../redux/searchQuery";
import {
  Button,
  Card,
  Dropdown,
  Menu,
  Space,
  Table,
  Typography,
  notification,
} from "antd";
import { HeartOutlined, PlusSquareOutlined } from "@ant-design/icons";
import {
  useGetAlbumsQuery,
  useSaveAlbumMutation,
} from "../../redux/albumsQuery";
import {
  useAddToPlaylistMutation,
  useGetPlaylistsQuery,
} from "../../redux/playlistsQuery";
import {
  useGetSavedTracksQuery,
  useSaveTrackMutation,
} from "../../redux/savedTracksQuery";

export default function SearchResults() {
  const { Title } = Typography;

  const history = useHistory();
  const [data, setData] = useState([]);

  const { term } = useParams();
  const { data: searchResult, isLoading: isLoadingSeacrhResult } =
    useGetSearchQuery(term);
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  const { data: myTracks, isLoading: isLoadingSavedTracks } =
    useGetSavedTracksQuery();
  const [addToPlaylist, { isError: addPlaylistError }] =
    useAddToPlaylistMutation();
  const [saveAlbum, { isError: saveAlbumError }] = useSaveAlbumMutation();
  const [saveTrack, { isError: saveTrackError }] = useSaveTrackMutation();
  // console.log('searchResult', searchResult);

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
    searchResult &&
      searchResult.tracks &&
      searchResult.tracks.items.length !== 0 &&
      setData([]);
    searchResult &&
      searchResult.tracks &&
      searchResult.tracks.items.length !== 0 &&
      searchResult.tracks.items.forEach((item) => {
        setData((data) => [
          ...data,
          {
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            released: item.album.release_date,
            duration: item.duration_ms / 1000,
            popularity: item.popularity,
            uri: item.uri,
            id: item.id,
          },
        ]);
      });
  }, [searchResult]);

  const handleAddToMyAlbums = async (albumId) => {
    await saveAlbum({ albumId });
    // await clearSavedAlbums();
    // await getMySavedAlbums();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult.tracks.items.filter((item, i) => rowIndex === i)[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/musicjam/artist/${elem.artists[0].id}`);
          }, // click row
        };
      },
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult.tracks.items.filter(
              (item, i) => rowIndex === i
            )[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/musicjam/album/${elem.album.id}`);
          }, // click row
        };
      },
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
    },
    {
      title: "Released",
      dataIndex: "released",
      key: "released",
    },

    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];

        return !elem.isSaved &&
          myTracks.filter((item) => item.track.id === elem.id).length === 0 ? (
          <HeartOutlined />
        ) : (
          <></>
        );
        // mySavedTracks.filter(item => item.track.id === elem.id).length === 0 ? <span></span> : <HeartOutlined />;
      },
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            handleAddTrack(elem.id);
          },
        };
      },
    },
    {
      title: "Add to playlist",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => (
        <Dropdown
          overlay={
            <Menu>
              {playlists &&
                playlists.length !== 0 &&
                playlists.map((playlist, index) => {
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
  ];
  const columnsMobile = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult.tracks.items.filter((item, i) => rowIndex === i)[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/musicjam/artist/${elem.artists[0].id}`);
          }, // click row
        };
      },
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult.tracks.items.filter(
              (item, i) => rowIndex === i
            )[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/musicjam/album/${elem.album.id}`);
          }, // click row
        };
      },
    },
    {
      title: "Add to saved tracks",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];

        return !elem.isSaved &&
          myTracks.filter((item) => item.track.id === elem.id).length === 0 ? (
          <HeartOutlined />
        ) : (
          <></>
        );
        // mySavedTracks.filter(item => item.track.id === elem.id).length === 0 ? <span></span> : <HeartOutlined />;
      },
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            handleAddTrack(elem.id);
          },
        };
      },
    },
    {
      title: "Add to playlist",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => (
        <Dropdown
          overlay={
            <Menu>
              {playlists &&
                playlists.length !== 0 &&
                playlists.map((playlist, index) => {
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
  ];

  const handleAddTrack = async (trackId) => {
    await saveTrack({ trackId });
    // await clearSavedTracks();
    // await getMySavedTracks();
    // formatData();
  };

  const handleAddToPlaylist = async (playlistId, trackUri) => {
    await addToPlaylist({ playlistId: playlistId, uri: trackUri });

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

  return (
    <div>
      {searchResult && (
        <div>
          {searchResult.albums && (
            <div style={{textAlign: 'center'}}>
              <Title level={4}>Albums</Title>
              {/* <Row>
                <Col span={24}> */}
              <div className="albums-grid">
                {searchResult.albums.items.length !== 0 &&
                  searchResult.albums.items.map((album, index) => {
                    return (
                      <Card
                        hoverable
                        title={album.name}
                        extra={<Link to={`/album/${album.id}`}>More</Link>}
                        style={{
                          width: "15rem",
                          height: "15rem",
                          backgroundImage: `url(${album.images[1].url})`,
                        }}
                        bodyStyle={{
                          color: "lightgray",
                          height: "calc(100% - 3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                        headStyle={{
                          color: "lightgray",
                          height: "3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                      >
                        <p>{`Artist: ${album.artists[0].name}`}</p>
                        <p>{`Released: ${album.release_date}`}</p>
                        <p>{`Total tracks: ${album.total_tracks}`}</p>
                        {myAlbums &&
                          myAlbums.length !== 0 &&
                          myAlbums.filter(
                            (savedAlbum) => savedAlbum.album.id === album.id
                          ).length === 0 && (
                            <Button
                              onClick={() => {
                                handleAddToMyAlbums(album.id);
                              }}
                            >
                              Save
                            </Button>
                          )}
                      </Card>
                    );
                  })}
              </div>
              {/* </Col>
              </Row> */}
            </div>
          )}
          {searchResult.artists.items.length !== 0 && (
            <div style={{textAlign: 'center'}}>
              <Title level={4}>Artists</Title>
              <div className="artists-grid">
                {searchResult.artists.items &&
                  searchResult.artists.items.map((artist, index) => {
                    return (
                      <Card
                        hoverable
                        title={artist.name}
                        extra={<Link to={`/artist/${artist.id}`}>More</Link>}
                        style={{
                          width: "15rem",
                          height: "15rem",
                          backgroundImage: `url(${
                            artist.images.length !== 0 && artist.images[1].url
                          })`,
                        }}
                        bodyStyle={{
                          color: "lightgray",
                          height: "calc(100% - 3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                        headStyle={{
                          color: "lightgray",
                          height: "3rem",
                          backgroundColor: "rgba(000, 000, 000, 0.5)",
                        }}
                      >
                        <p>{`Genres: ${artist.genres.join("; ")}`}</p>
                        <p>{`Popularity: ${artist.popularity}`}</p>
                      </Card>
                    );
                  })}
              </div>
            </div>
          )}
          <div style={{textAlign: 'center'}}>
            <Title level={4}>Tracks</Title>
            <div>
              {data && (
                <Table pagination={false} columns={windowDimenion.winWidth > 768 ? columns : columnsMobile} dataSource={data} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
