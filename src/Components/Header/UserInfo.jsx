import { Link } from "react-router-dom";
import { useState } from "react";
import { useMyInfo } from "../../hooks/api";
import { CgLogOff } from "react-icons/cg";
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

      <button className="logout" onClick={() => setUser()}>
        <CgLogOff 
          className="logout-icon"
          style={{fontSize: "25px"}}
        />
      </button>
    </span>
  );
};

export default UserInfo;






