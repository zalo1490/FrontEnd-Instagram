import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../IntlContext";
import UserInfo from "../../Components/Header/UserInfo";
import { useUser } from "../../UserContext";
import { FormattedMessage } from "react-intl";
import { CiSearch } from "react-icons/ci";
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

  const handleSearch = async (e) => {
    e.preventDefault()
    setFiltros(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className={theme === "light" ? "light-theme" : "dark-theme"}>
      
      <Link to="/" id="gohome">
         <button>
           <span>ClonInsta</span>
         </button>
      </Link>
      
      <Link to="/posts" id="addpost">
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
      

      <form onSubmit={handleSearch} id="search">
        <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        />
        <button>
        <CiSearch />
        </button>
      </form>

      <button onClick={toggleTheme} id="theme">
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
