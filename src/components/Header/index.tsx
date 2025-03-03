"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import styles from "./Header.module.scss";

export const Header = () => {
  const { state } = useFavorites();
  const favoriteCount = state.favorites.length;

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
            alt="Heart Icon"
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
