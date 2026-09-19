import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Lightbox.module.css";

export const Lightbox = ({ images, index, title, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && images.length > 1) {
        onNavigate((index + 1) % images.length);
      } else if (event.key === "ArrowLeft" && images.length > 1) {
        onNavigate((index - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, index, onClose, onNavigate]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      onClick={onClose}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        &times;
      </button>

      <div className={styles.stage} onClick={(event) => event.stopPropagation()}>
        {images.length > 1 ? (
          <button
            type="button"
            className={styles.nav}
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            aria-label="Previous screenshot"
          >
            &#8249;
          </button>
        ) : null}

        <img
          src={images[index]}
          alt={`${title} screenshot ${index + 1}`}
          className={styles.image}
        />

        {images.length > 1 ? (
          <button
            type="button"
            className={styles.nav}
            onClick={() => onNavigate((index + 1) % images.length)}
            aria-label="Next screenshot"
          >
            &#8250;
          </button>
        ) : null}
      </div>

      {images.length > 1 ? (
        <p className={styles.counter}>
          {index + 1} / {images.length}
        </p>
      ) : null}
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};
