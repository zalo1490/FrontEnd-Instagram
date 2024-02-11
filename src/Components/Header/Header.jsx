import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../IntlContext";
import UserInfo from "../../Components/Header/UserInfo";
import { useUser } from "../../UserContext";
import { FormattedMessage } from "react-intl";
import "./Header.css";

const Header = ({ setFiltros }) => {
  const [lang, setLang] = useLang();
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [user] = useUser();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setFiltros(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className={theme === "light" ? "light-theme" : "dark-theme"}>
      <nav>
        <Link to="/">
          <button>
            <span>ClonInsta</span>
          </button>
        </Link>
      </nav>
      <Link to="/posts">
        <button>
          <FormattedMessage id="header.post" />
        </button>
      </Link>

      <span className="lang">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">🇬🇧 en</option>
          <option value="es">🇪🇸 es</option>
        </select>
      </span>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button onClick={handleSearch}>
        <FormattedMessage id="header.search" />
      </button>

      <button onClick={toggleTheme}>
        {theme === "light" ? (
          <FormattedMessage id="header.themeDark" />
        ) : (
          <FormattedMessage id="header.themeLight" />
        )}
      </button>
      <UserInfo />
    </header>
  );
};

export default Header;
