import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../IntlContext";
import UserInfo from "../../Components/Header/UserInfo";
import { useUser } from "../../UserContext";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { SlSocialInstagram } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { useIntl } from "react-intl";
import "./Header.css";

const Header = ({ setFiltros }) => {
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [user] = useUser();
  const intl = useIntl();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.className = theme === "light" ? "light-theme" : "dark-theme";
  }, [theme]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setFiltros(searchTerm);
    setSearchTerm("");
  };

  return (
    <header
      className={`header ${
        theme === "light" ? "light-theme" : "dark-theme"
      } line-color`}
    >
      <Link to="/" id="gohome">
        <button style={{ fontSize: "25px" }}>
          <SlSocialInstagram />
        </button>
      </Link>

      <Link to="/posts" id="addpost">
        <button style={{ fontSize: "25px" }}>
          <IoMdAdd />
        </button>
      </Link>

      <span className="lang">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="es">🇪🇸 Es</option>
          <option value="en">🇬🇧 En</option>
          <option value="it">🇮🇹 It</option>
        </select>
      </span>

      <form onSubmit={handleSearch} id="search">
        <input
          type="text"
          placeholder={intl.formatMessage({ id: "header.searchPlaceholder" })}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button style={{ fontSize: "25px" }}>
          <CiSearch />
        </button>
      </form>

      <button onClick={toggleTheme} id="theme">
        {theme === "light" ? (
          <MdDarkMode style={{ fontSize: "25px" }} />
        ) : (
          <MdSunny style={{ fontSize: "25px" }} />
        )}
      </button>
      <UserInfo />
    </header>
  );
};

export default Header;
