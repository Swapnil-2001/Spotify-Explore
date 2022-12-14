const auth_endpoint = "https://accounts.spotify.com/authorize";

const { REACT_APP_CLIENT_ID } = process.env;

const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
];

export const spotify_popup_url =
  `${auth_endpoint}?client_id=${REACT_APP_CLIENT_ID}` +
  `&redirect_uri=${window.location.origin}/redirect&response_type=token` +
  `&scope=${scopes.join("%20")}&show_dialog=true`;
