import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMyInfo } from "../../hooks/api";
import { useUser } from "./../../UserContext";
import "./Header.css";
import { FormattedMessage } from "react-intl";

const UserInfo = () => {
  const [user] = useUser();

  if (user) return <UserInfoLoggedIn />;

  return (
    <button>
      <Link to="/login">
        <FormattedMessage id="userInfo.login" />
      </Link>
    </button>
  );
};

const UserInfoLoggedIn = () => {
  const [, setUser] = useUser();
  const info = useMyInfo();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <span className={`userinfo ${theme}`}>
      <img src={`http://localhost:3000/${info.data.user.avatar}`} />
      <Link
        to={`/profile/${info.data.user.id}`}
        onClick={() =>
          setTimeout(() => {
            window.location.reload();
          }, "100")
        }
      >
        {info.data.user.username}
      </Link>

      <span className="logout" onClick={() => setUser()}>
        <FaPowerOff
          className="logout-icon"
          style={{
            color: theme === "light" ? "#ffffff" : "#000000",
            backgroundColor: theme === "light" ? "#000000" : "##FF0000",
            fontSize: "20px",
          }}
        />
      </span>
    </span>
  );
};

export default UserInfo;






