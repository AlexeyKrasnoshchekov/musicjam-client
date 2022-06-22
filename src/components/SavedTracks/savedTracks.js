import {  useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteSavedTrackMutation, useGetSavedTracksQuery } from "../../redux/savedTracksQuery";

export default function SavedAlbums() {

  const [dataTable, setData] = useState([]);


  const [deleteTrack] = useDeleteSavedTrackMutation();

  const {data, isLoading: isLoadingSavedTracks} = useGetSavedTracksQuery();
  
  console.log('savedTracks', data);


  useEffect(() => {
    data && data.length !==0 && setData([]);
    formatData();
  }, [data]);


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
        elem && <Link to={`/artist/${elem.track.artists[0].id}`}>{elem.track.artists[0].name}</Link>
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
        elem && <Link to={`/album/${elem.track.album.id}`}>{elem.track.album.name}</Link>
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
      title: "Del",
      key: "del",
      render: () => <DeleteOutlined />,
      onCell: (record, rowIndex) => {
        let elem = data.filter((item, i) => rowIndex === i)[0];
        return {          
          onClick: () => {handleSavedTrackDelete(elem.track.id)}, // click row

        };
      }
    },
  ];

  const formatData = () => {
    data && data.length !== 0 &&
      data.forEach((item) => {
        createDataObj(
          item.added_at.split("T")[0],
          item.track.name,
          item.track.artists[0].name,
          item.track.album.name,
          item.track.album.release_date,
          item.track.duration_ms / 1000
        );
      });
  };

  const createDataObj = (added, name, artist, album, released, duration) => {
    let obj = {
      added: "",
      name: "",
      artist: "",
      album: "",
      released: "",
      duration: "",
    };

    let duration_min = Math.floor(duration / 60);
    let duration_sec = Math.round(duration % 60);

    obj.added = added;
    obj.name = name;
    obj.artist = artist;
    obj.album = album;
    obj.released = released;
    obj.duration = `${duration_min}:${duration_sec}`;
    setData((data) => [...data, obj]);
  };

  const handleSavedTrackDelete = async (rowIndex) => {
    await deleteTrack(rowIndex);
    data.length !==0 && setData([]);
    formatData();
  }

  return (
    <>
      {dataTable && (
        <Table
          columns={columns}
          dataSource={dataTable}
        />
      )}
    </>
  );
}
