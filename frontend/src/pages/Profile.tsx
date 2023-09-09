import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { resetAuth } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchSpotifyAPI } from "../utils/spotifyApi";
import { BiUser } from "react-icons/bi";
import useAuth from "../hooks/useAuth";

const Profile: React.FC = () => {
  document.title = "Profile | Spotter";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useAuth();
  const { data } = useQuery("userName", () => fetchSpotifyAPI("/me", accessToken), {
    refetchOnWindowFocus: false,
    enabled: accessToken ? true : false,
  });

  const handleLogout = () => {
    dispatch(resetAuth());
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="profile__card">
        <div className="profile__image__wrapper">
          {!data ? null : data.images.length ? (
            <img
              className="profile__image"
              src={data.images[data.images.length - 1].url}
              alt="Profile"
            />
          ) : (
            <BiUser className="profile__image__alt" style={{ width: "16rem" }} />
          )}
        </div>
        <div className="profile__info">
          <div className="profile__name">
            You're logged in as {data && data.display_name}
          </div>
          <div className="profile__id">
            ID: <span>{data && data.id}</span>
          </div>
          <div className="profile__email">
            Email: <span>{data && data.email}</span>
          </div>
          <div className="profile__country">
            Country: <span>{data && data.country}</span>
          </div>
          <div className="profile__followers">
            Number of followers: <span>{data && data.followers.total}</span>
          </div>
          <div className="profile__buttons">
            <a
              className="profile__button profile__spotify"
              href="https://www.spotify.com/account/overview/"
              target="_blank"
              rel="noreferrer"
            >
              Spotify account
            </a>
            <button className="profile__button profile__logout" onClick={handleLogout}>
              Log me out 🏃🏽‍♂️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
