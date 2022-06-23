import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { context } from "../../context/context";
import { Col, Image, Row, Table, Typography } from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import {
  useDeleteFromPlaylistMutation,
  useGetPlaylistQuery,
} from "../../redux/playlistsQuery";
import {
  useGetSavedTracksQuery,
  useSaveTrackMutation,
} from "../../redux/savedTracksQuery";

export default function Playlist() {
  const [imageIndex, setImageIndex] = useState(0);
  const [data, setData] = useState([]);
  const { Title } = Typography;
  const { id } = useParams();

  const { data: playlist, isLoading: isLoadingPlaylist } =
    useGetPlaylistQuery(id);
  const { data: myTracks, isLoading: isLoadingSavedTracks } =
    useGetSavedTracksQuery();
  const [saveTrack, { isError: saveTrackError }] = useSaveTrackMutation();
  const [deleteFromPlaylist] = useDeleteFromPlaylistMutation();


  useEffect(() => {
    playlist && playlist.tracks.items.length !== 0 && setData([]);
    playlist &&
      playlist.tracks.items.length !== 0 &&
      playlist.tracks.items.forEach((item) => {
        setData((data) => [
          ...data,
          {
            name: item.track.name,
            artist: item.track.artists[0].name,
            added: item.added_at.split("T")[0],
            released: item.track.album.release_date,
            album: item.track.album.name,
            duration: item.track.duration_ms / 1000,
            uri: item.track.uri,
            id: item.track.id,
            artistId: item.track.artists[0].id,
            albumId: item.track.album.id
          },
        ]);
      });
  }, [playlist]);

  

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
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        return <Link to={`/artist/${elem.artistId}`}>{elem.artist}</Link>;
      },
    },
    {
      title: "Added",
      dataIndex: "added",
      key: "added",
    },

    {
      title: "Album",
      dataIndex: "album",
      key: "album",
      render: (text, record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        return <Link to={`/album/${elem.albumId}`}>{elem.album}</Link>;
      },
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
        if (
          myTracks &&
          myTracks.filter((item) => item.track.id === elem.id).length === 0
        ) {
          return <HeartOutlined />;
        }
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
      title: "Remove from playlist",
      key: "",
      align: "center",
      render: () => <DeleteOutlined />,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            // deleteFromPlaylist({playlistId: playlist.id, trackUri: elem.uri});
            // removeFromPlaylist(playlist.id, elem.uri);
          },
        };
      },
    },
  ];

  const handleAddTrack = async (trackId) => {
    console.log("trackId", trackId);
    await saveTrack({ trackId });
    // await clearSavedTracks();
    // await getMySavedTracks();
  };

 
  return (
    <>
      {playlist && (
        <Row>
          <Col span={8}>
            <Image width={200} src={playlist.images[imageIndex].url} />
          </Col>
          <Col span={16}>
            <Title level={2}>{playlist.name}</Title>
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
