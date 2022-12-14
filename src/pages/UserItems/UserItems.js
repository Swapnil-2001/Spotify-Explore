import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import spotify, { isAccessTokenValid } from "../../utils/functions";
import "./UserItems.scss";

const UserItems = () => {
  const [accessTokenSet, setAccessTokenSet] = useState(false);
  const { page } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const isUserBaseRoute =
      window.location.pathname === "/me" || window.location.pathname === "/me/";
    if (isUserBaseRoute) {
      navigate("recent");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isAccessTokenValid()) {
      localStorage.clear();
      navigate("/login");
    } else {
      const accessToken = localStorage.getItem("access_token");
      spotify.setAccessToken(accessToken);
      setAccessTokenSet(true);
    }
  }, [navigate]);

  const goToUserRecents = () => {
    navigate("recent");
  };

  const goToUserTopTracks = () => {
    navigate("tracks");
  };

  const goToUserTopArtists = () => {
    navigate("artists");
  };

  const goToDiscover = () => {
    navigate("discover");
  };

  return (
    <div className="user_items_main_div">
      <div className="user_buttons_div">
        <button
          className={`user_button ${
            page === "recent" ? "user_button_selected" : ""
          }`}
          onClick={goToUserRecents}
        >
          Recent
        </button>
        <button
          className={`user_button ${
            page === "tracks" ? "user_button_selected" : ""
          }`}
          onClick={goToUserTopTracks}
        >
          Top Tracks
        </button>
        <button
          className={`user_button ${
            page === "artists" ? "user_button_selected" : ""
          }`}
          onClick={goToUserTopArtists}
        >
          Top Artists
        </button>
        <button
          className={`user_button ${
            page === "discover" ? "user_button_selected" : ""
          }`}
          onClick={goToDiscover}
        >
          Discover
        </button>
        <button
          onClick={() => navigate("/tracks")}
          style={{ marginLeft: "20px" }}
          className="styled_button"
        >
          Home
        </button>
      </div>
      {accessTokenSet && <Outlet />}
    </div>
  );
};

export default UserItems;
