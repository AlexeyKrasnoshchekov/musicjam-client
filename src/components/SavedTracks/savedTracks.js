import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../context/context";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useGetSavedTracksQuery } from "../../redux/savedTracksQuery";

export default function SavedAlbums() {
  const { getMySavedTracks, mySavedTracks, removeFromMySavedTracks, token, refreshPage } = useContext(context);
  const [dataTable, setData] = useState([]);
  const initialRender = useRef(true);

  const {data, isLoading: isLoadingSavedTracks} = useGetSavedTracksQuery();
  
  console.log('savedTracks', data);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    token === "" && refreshPage();
    
  }, [token]);

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
      // onCell: (record, rowIndex) => {
      //   return {
      //     onClick: (event) => {handleSavedTrackDelete(rowIndex)}, // click row

      //   };
      // }
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

  // const handleSavedTrackDelete = async (rowIndex) => {
  //   await removeFromMySavedTracks(rowIndex);
  //   mySavedTracks.length !==0 && setData([]);
  //   formatData();
  // }

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
