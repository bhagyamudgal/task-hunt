import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../components/navigation.module.css";
import Button from "../components/Button";

function Navigation(props) {
  const [displayMenu, setdisplayMenu] = useState(false);

  function displayMenuHandler() {
    if (displayMenu) setdisplayMenu(false);
    else setdisplayMenu(true);
  }

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <div className={styles.logo}></div>
        </div>
        <div className={styles.nav_items}>
          <span
            className={
              props.page === "home" ? styles.nav_item_active : styles.nav_item
            }
          >
            <Link href="/">Home</Link>
          </span>

          <span
            className={
              props.page === "features"
                ? styles.nav_item_active
                : styles.nav_item
            }
          >
            <Link href="/features">Features</Link>
          </span>
          <span
            className={
              props.page === "contact"
                ? styles.nav_item_active
                : styles.nav_item
            }
          >
            <Link href="/contact">Contact</Link>
          </span>
        </div>
        <div className={styles.button_group}>
          <Button text="Login" target="/login">Login</Button>
          <Button text="Register Now" target="/signup" width="230px">
            Register Now
          </Button>
        </div>
        <div className={styles.menu_icon} onClick={displayMenuHandler}>
          {displayMenu ? (
            <Image
              src="/menu-icon-cancel.svg"
              alt="menu-icon"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/menu-icon.svg"
              alt="menu-icon"
              width={28}
              height={28}
            />
          )}
        </div>
      </nav>
      <div className={displayMenu ? styles.display_menu : styles.none}>
        <div className={styles.nav_items_mobile}>
          <span
            className={
              props.page === "home" ? styles.nav_item_active : styles.nav_item
            }
          >
            <Link href="/">Home</Link>
          </span>
          <span
            className={
              props.page === "features"
                ? styles.nav_item_active
                : styles.nav_item
            }
          >
            <Link href="/features">Features</Link>
          </span>
          <span
            className={
              props.page === "contact"
                ? styles.nav_item_active
                : styles.nav_item
            }
          >
            <Link href="/contact">Contact</Link>
          </span>
        </div>

        <div className={styles.button_group_mobile}>
          <Button text="Login" target="/login">
            Login
          </Button>
          <Button text="Register Now" target="/signup" width="240px">
            Register Now
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
