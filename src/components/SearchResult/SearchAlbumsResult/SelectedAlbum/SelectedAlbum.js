import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setSelectedTrackDetails } from "../../../../features/search/searchedTracks/searchedTracksSlice";
import { addSearchedTerm } from "../../../../features/search/searchedTerm/searchedTermSlice";
import DEFAULT_PICTURE from "../../../../assets/music.png";
import "./SelectedAlbum.scss";

const SelectedAlbum = ({ albumsRef, selectedAlbum }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [hoveredTrackId, setHoveredTrackId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectTrack = (artists, images, trackName, trackId, preview_url) => {
    const trackDetails = {
      trackId,
      trackName,
      artistId: artists?.length > 0 ? artists[0].id : null,
      artistName: artists?.length > 0 ? artists[0].name : null,
      trackImgUrl: "",
      preview_url,
    };
    if (!trackDetails.artistId || !trackDetails.artistName) return;
    if (images?.length > 0) {
      trackDetails.trackImgUrl = images[0].url;
    }
    dispatch(addSearchedTerm(""));
    navigate("/tracks");
    dispatch(setSelectedTrackDetails(trackDetails));
  };

  return (
    <div ref={albumsRef} className="all_tracks_in_album">
      <div className="album_image_and_name">
        <h2 className="album_heading">Album</h2>
        {selectedAlbum.images?.length > 0 ? (
          <img src={selectedAlbum.images[0].url} alt="Track" />
        ) : (
          <img src={DEFAULT_PICTURE} alt="Track" />
        )}
        <h2 className="album_name">{selectedAlbum.name}</h2>
        <h4>
          {selectedAlbum.artists?.length > 0 && selectedAlbum.artists[0].name}
        </h4>
      </div>
      {previewUrl.length > 0 && (
        <audio src={previewUrl} autoPlay hidden={true} />
      )}
      <div className="track_names">
        <h2>Tracks</h2>
        {selectedAlbum.tracks?.items?.map(({ id, name, preview_url }) => (
          <div
            onMouseEnter={() => {
              if (preview_url) setPreviewUrl(preview_url);
              setHoveredTrackId(id);
            }}
            onMouseLeave={() => {
              setPreviewUrl("");
              setHoveredTrackId(null);
            }}
            className="individual_track_in_album"
            key={id}
          >
            <span>{name}</span>
            <button
              className={
                id === hoveredTrackId
                  ? "track_info_button"
                  : "track_info_button hide"
              }
              onClick={() =>
                selectTrack(
                  selectedAlbum.artists,
                  selectedAlbum.images,
                  name,
                  id,
                  preview_url
                )
              }
            >
              More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedAlbum;
