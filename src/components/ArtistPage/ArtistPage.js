import { Col, Image, Row, Typography, Card } from "antd";

import "../SearchResults/SearchResults.css";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetArtistQuery } from "../../redux/artistQuery";

export default function Album() {
  const [imageIndex, setImageIndex] = useState(1);

  const { Title } = Typography;


  const { id } = useParams();

  const {data: artistObj, isLoading: isLoadingArtist} = useGetArtistQuery(id);


  return (
    <>
      {artistObj && artistObj.artist && (
        <Row>
          <Col span={8}>
            <Image
              width={300}
              src={artistObj.artist.images.length !== 0 && artistObj.artist.images[imageIndex].url}
            />
          </Col>
          <Col span={16}>
            <Title level={2}>{`${artistObj.artist.name}`}</Title>
            <Title level={4}>{`Genres: ${artistObj.artist.genres.join("; ")}`}</Title>
            <Title level={4}>{`Popularity: ${artistObj.artist.popularity}`}</Title>
          </Col>
        </Row>
      )}

      {artistObj && artistObj.artistAlbums.length !== 0 && (
        <Row>
          <Col span={24}>
            <Title level={4}>Albums</Title>
            <div className="albums-grid">
              {artistObj.artistAlbums.length !== 0 &&
                artistObj.artistAlbums.map((album, index) => {
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
                    </Card>
                  );
                })}
            </div>
          </Col>
        </Row>
      )}
      {artistObj && artistObj.relatedArtists.length !== 0 && (
        <div>
          <Title level={4}>Related artists</Title>
          <div className="artists-grid">
            {artistObj.relatedArtists.map((artist, index) => {
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
    </>
  );
}
