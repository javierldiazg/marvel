import Image from "next/image";

interface FavoriteProps {
  isFavorite: boolean;
  type?: "detail" | "list";
}

export const Favorite = ({ isFavorite, type }: FavoriteProps) => {
  const size =
    type === "detail" ? { width: 24, height: 22 } : { width: 12, height: 10 };

  return (
    <>
      {isFavorite ? (
        <Image
          src="/images/heart-icon.png"
          alt="Marvel Logo"
          priority
          {...size}
        />
      ) : (
        <Image
          src="/images/heart-empty-icon.png"
          alt="Marvel Logo"
          priority
          {...size}
        />
      )}
    </>
  );
};
