"use client";

import { useState, type CSSProperties } from "react";
import { HeartFillIcon, HeartIcon } from "@primer/octicons-react";

export function ProfileHeart() {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(0);

  return (
    <button
      className="profile-heart"
      type="button"
      aria-label={liked ? "Unlike profile" : "Like profile"}
      aria-pressed={liked}
      title={liked ? "Unlike profile" : "Like profile"}
      style={{ color: liked ? "var(--heart-color)" : "var(--fgColor-muted)" }}
      onClick={() => {
        setLiked((value) => !value);
        setBurst((value) => value + 1);
      }}
    >
      <span
        key={burst}
        className={`heart-animation${liked ? " is-animating" : ""}`}
        aria-hidden="true"
      >
        {liked ? (
          <HeartFillIcon className="heart-symbol" size={20} />
        ) : (
          <HeartIcon className="heart-symbol" size={20} />
        )}
        {liked && (
          <>
            <span className="heart-ring" />
            {Array.from({ length: 6 }, (_, index) => (
              <span
                key={index}
                className="heart-particle"
                style={{ "--angle": `${index * 60 - 30}deg` } as CSSProperties}
              />
            ))}
          </>
        )}
      </span>
      <span className="sr-only" role="status">
        {burst > 0 ? (liked ? "Thank you for the love!" : "Like removed.") : ""}
      </span>
    </button>
  );
}
