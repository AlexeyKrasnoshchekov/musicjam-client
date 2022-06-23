import { useEffect, useState } from "react";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteSavedTrackMutation,
  useGetSavedTracksQuery,
} from "../../redux/savedTracksQuery";

export default function SavedAlbums() {
  const [dataTable, setData] = useState([]);
  const history = useHistory();

  const [deleteTrack] = useDeleteSavedTrackMutation();

  const handleDeleteTrack = async (id) => {
    await deleteTrack(id).unwrap();
  }

  const { data, isLoading: isLoadingSavedTracks } = useGetSavedTracksQuery();

  console.log("savedTracks", data);

  useEffect(() => {
    data &&
      data.forEach((item) => {
        setData((data) => [
          ...data,
          {
            added: item.added_at.split("T")[0],
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            released: item.track.album.release_date,
            duration: `${Math.floor(
              item.track.duration_ms / 1000 / 60
            )}:${Math.round((item.track.duration_ms / 1000) % 60)}`,
          },
        ]);
      });
  }, [data]);

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
            let elem = data.filter((item, i) => rowIndex === i)[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/artist/${elem.track.artists[0].id}`);
          }, // click row
        };
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
      render: (text) => <a>{text}</a>,
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            let elem = data.filter((item, i) => rowIndex === i)[0];
            // handleGetAlbum(elem.album.id);
            history.push(`/album/${elem.track.album.id}`);
          }, // click row
        };
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
          onClick: () => {
            handleDeleteTrack(elem.track.id);
          }, // click row
        };
      },
    },
  ];

  return (
    <>
      {dataTable && (
        <Table key={111222} columns={columns} dataSource={dataTable} />
      )}
       {/* <ul>
        {data && data.map(item => (
          <li key={item.track.name} onClick={() => handleDeleteTrack(item.track.id)}>
            {item.track.name}
          </li>
        ))}
      </ul> */}
    </>
  );
}
