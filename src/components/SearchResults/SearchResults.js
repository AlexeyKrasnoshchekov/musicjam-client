import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { context } from "../../context/context";
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
import { useGetAlbumsQuery } from "../../redux/albumsQuery";
import { useGetPlaylistsQuery } from "../../redux/playlistsQuery";

export default function SearchResults() {
  const { Title } = Typography;

  const {
    searchResult,
    getAlbum,
    addToMySavedAlbums,
    clearSavedAlbums,
    getMySavedAlbums,
    playlists,
    mySavedAlbums,
    mySavedTracks,
    // getMySavedTracks,
    clearSavedTracks,
    addToPlaylist,
    addToMySavedTracks,
  } = useContext(context);

  const history = useHistory();
  const [data, setData] = useState([]);

  const { term } = useParams();
console.log('term', term)
  const {data: searchResult1, isLoading: isLoadingSeacrhResult} = useGetSearchQuery(term);
  const { data: myAlbums, isLoading: isLoadingAlbums } = useGetAlbumsQuery();
  const { data: playlists1, isLoading: isLoadingPlaylists } =
    useGetPlaylistsQuery();
  // console.log('searchResult1', searchResult1);

  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //     return;
  //   }
  //   getMySavedTracks();
  // }, []);

  useEffect(() => {
    searchResult1 &&
      searchResult1.tracks &&
      searchResult1.tracks.items.length !== 0 &&
      setData([]);
    searchResult1 &&
      searchResult1.tracks &&
      searchResult1.tracks.items.length !== 0 &&
      formatData();
  }, [searchResult1]);

  const handleGetAlbum = async (id) => {
    await getAlbum(id);
    history.push(`/album/${id}`);
  };

  const handleAddToMyAlbums = async (albumId) => {
    await addToMySavedAlbums(albumId);
    await clearSavedAlbums();
    await getMySavedAlbums();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      key: "artist",
      dataIndex: "artist",
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = searchResult1.tracks.items.filter(
              (item, i) => rowIndex === i
            )[0];
            handleGetAlbum(elem.album.id);
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
        
        return ((!elem.isSaved && mySavedTracks.filter(item => item.track.id === elem.id).length === 0) ? <HeartOutlined /> : <></>);
        // mySavedTracks.filter(item => item.track.id === elem.id).length === 0 ? <span></span> : <HeartOutlined />;
      },
      // onCell: (record, rowIndex) => {
      //   return {
      //     onClick: () => {
      //       let elem = data.filter((item, i) => rowIndex === i)[0];
      //       handleAddTrack(elem.id);
      //     },
      //   };
      // },
    },
    {
      title: "Add to playlist",
      key: "",
      align: "center",
      render: (text, record, rowIndex) => (
        <Dropdown
          overlay={
            <Menu>
              {playlists1.map((playlist, index) => {
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


  const formatData = () => {
    let trackIsSaved = false;
    searchResult1.tracks.items.length !== 0 &&
      searchResult1.tracks.items.forEach((item) => {
        
        trackIsSaved = mySavedTracks.some((elem) => elem.track.name === item.name);

        createDataObj(
          item.name,
          item.artists[0].name,
          item.album.name,
          item.album.release_date,
          item.duration_ms / 1000,
          item.popularity,
          item.uri,
          item.id,
          trackIsSaved
        );
      });
  };

  const createDataObj = (
    name,
    artist,
    album,
    released,
    duration,
    popularity,
    uri,
    id,
    isSaved
  ) => {
    let obj = {
      added: "",
      name: "",
      artist: "",
      album: "",
      released: "",
      duration: "",
      popularity: 0,
      uri: "",
      id: "",
      isSaved: false,
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.name = name;
    obj.artist = artist;
    obj.album = album;
    obj.released = released;
    obj.popularity = popularity;
    obj.duration = `${duration_min}:${duration_sec}`;
    obj.uri = uri;
    obj.id = id;
    obj.isSaved = isSaved;
    setData((data) => [...data, obj]);
  };

  // const handleAddTrack = async (trackId) => {
  //   await addToMySavedTracks(trackId);
  //   await clearSavedTracks();
  //   await getMySavedTracks();
  //   formatData();
  // };

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

  return (
    <div>
      {searchResult1 && (
        <div>
          {searchResult1.albums && (
            <div>
              <Title level={4}>Albums</Title>
              {/* <Row>
                <Col span={24}> */}
              <div className="albums-grid">
                {searchResult1.albums.items.length !== 0 &&
                  searchResult1.albums.items.map((album, index) => {
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
                        {myAlbums.filter(
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
          {searchResult1.artists.items.length !== 0 && (
            <div>
              <Title level={4}>Artists</Title>
              <div className="artists-grid">
                {searchResult1.artists.items &&
                  searchResult1.artists.items.map((artist, index) => {
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
          <div>
            <Title level={4}>Tracks</Title>
            <div>
              {data && (
                <Table pagination={false} columns={columns} dataSource={data} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
