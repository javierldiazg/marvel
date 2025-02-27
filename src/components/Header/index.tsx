"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./Header.module.scss";

export const Header = () => {
  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.favorites.length
  );

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer}>
        <Image
          src="/images/marvel-logo.png"
          alt="Marvel Logo"
          width={130}
          height={52}
          priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/favorites" className={styles.favoritesLink}>
          <Image
            src="/images/heart-icon.png"
            alt="Marvel Logo"
            width={24}
            height={22}
            priority
          />
          <span className={styles.badge}>{favoriteCount}</span>
        </Link>
      </nav>
    </header>
  );
};
