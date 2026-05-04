import { Link, useLocation } from "react-router";
import moonIconUrl from "../../assets/icons/moon-waning-crescent.svg";
import sunIconUrl from "../../assets/icons/white-balance-sunny.svg";
import menuIconUrl from "../../assets/icons/menu.svg";
import styles from "./Navbar.module.css";
import { useContext, useState } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import AuthContext from "../../contexts/AuthContext";
import defaultAvatarUrl from "../../assets/icons/default-avatar.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { authUser } = useContext(AuthContext);

  function toggleMenu() {
    setIsMenuOpen((previousIsOpen) => {
      return previousIsOpen ? false : true;
    });
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>tech</span>ItEasy
        </Link>
        <ul
          className={
            isMenuOpen
              ? ` ${styles.navigationList} ${styles.active}`
              : styles.navigationList
          }
        >
          <li>
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              onClick={() => {
                isMenuOpen && toggleMenu();
              }}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              onClick={() => {
                isMenuOpen && toggleMenu();
              }}
            >
              about
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className={
                location.pathname === "/posts"
                  ? `${styles.link} ${styles.active}`
                  : styles.link
              }
              onClick={() => {
                isMenuOpen && toggleMenu();
              }}
            >
              posts
            </Link>
          </li>
          {authUser && (
            <li>
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                <div className={styles.profileImageFrame}>
                  <img
                    className={styles.profileImage}
                    src={
                      authUser?.profileImage
                        ? `${import.meta.env.VITE_UPLOADS_URL}/profiles/${authUser?.profileImage}`
                        : defaultAvatarUrl
                    }
                    alt="Profile Image"
                  />
                </div>
              </Link>
            </li>
          )}
        </ul>
        <button
          className={styles.toggleThemeBtn}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <img src={moonIconUrl} alt="activate dark theme" />
          ) : (
            <img src={sunIconUrl} alt="activate light theme" />
          )}
        </button>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          <img src={menuIconUrl} alt="toggle menu" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
