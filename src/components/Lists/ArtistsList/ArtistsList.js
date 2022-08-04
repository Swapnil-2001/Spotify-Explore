import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
  getRelatedArtists,
} from "../../../features/search/searchedArtists/searchedArtistsFunctions";
import { removeSelectedArtist } from "../../../features/search/searchedArtists/searchedArtistsSlice";
import "./ArtistsList.scss";

const ArtistsList = ({ artists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectArtist = (artistId) => {
    dispatch(removeSelectedArtist());
    dispatch(getArtist(artistId));
    dispatch(getArtistTopTracks(artistId));
    dispatch(getArtistAlbums(artistId));
    dispatch(getRelatedArtists(artistId));
    navigate("/artists");
  };

  return (
    <div className="artists_list_div">
      {artists
        ?.filter(({ images }) => images?.length > 0)
        .map(({ id, images }) => (
          <div key={id} className="individual_artist_in_list">
            <img className="artist_img" src={images[0].url} alt="Artist" />
            <button className="styled_button" onClick={() => selectArtist(id)}>
              Learn More
            </button>
          </div>
        ))}
    </div>
  );
};

export default ArtistsList;
