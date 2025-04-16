import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userActions"; // Assuming you're using Redux to manage state
import "./Header.css";

function Header({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Function to check if user is logged in via cookie
  const checkLoginStatus = () => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("uapToken="));

    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];
      try {
        const { user, token } = JSON.parse(decodeURIComponent(tokenValue));
        if (user && token) {
          dispatch(setUser(user, token)); // Dispatch user info to the Redux store
        }
      } catch (error) {
        console.error("Error parsing user from cookie", error);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on initial load
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchValue(value);
      setIsSearching(true);

      const timeoutId = setTimeout(() => {
        onSearch(value);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [onSearch]
  );

  const handleLogin = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      // Redirect to the login page
      window.location.href = "https://uap-pi.vercel.app/login";
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">UAPages</span>
        </Link>

        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${
              location.pathname === "/" ? "nav-item-active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`nav-item ${
              location.pathname === "/explore" ? "nav-item-active" : ""
            }`}
          >
            Explore
          </Link>
          <Link
            to="/create"
            className={`nav-item ${
              location.pathname === "/create" ? "nav-item-active" : ""
            }`}
          >
            Create
          </Link>
        </nav>

        <div className="search-container">
          <div
            className={`search-wrapper ${isSearching ? "is-searching" : ""}`}
          >
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              aria-label="Search pins"
            />
            {isSearching && (
              <div className="search-loading">
                <div className="loading-spinner"></div>
              </div>
            )}
          </div>
        </div>

        <div className="header-icons">
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <button className="icon-button" onClick={handleLogin}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>

              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
