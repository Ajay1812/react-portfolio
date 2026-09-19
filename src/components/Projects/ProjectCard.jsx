import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utilis";
import { Lightbox } from "./Lightbox";

export const ProjectCard = ({
  project: { title, description, skills, demo, demoType, source, images },
  index,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const imageUrls = (images ?? []).map((path) => getImageUrl(path));

  return (
    <li className={styles.container}>
      <span className={styles.index}>0{index}</span>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.links}>
            <a href={source} target="_blank" rel="noreferrer">
              Code
            </a>
            {imageUrls.length > 0 ? (
              <button
                type="button"
                className={styles.previewButton}
                onClick={() => setLightboxIndex(0)}
              >
                Preview
              </button>
            ) : null}
            {demo ? (
              <a href={demo} target="_blank" rel="noreferrer">
                {demoType === "video" ? "Watch demo" : "Live"}
              </a>
            ) : null}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <p className={styles.skills}>{skills.join(", ")}</p>
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          images={imageUrls}
          index={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </li>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    demo: PropTypes.string,
    demoType: PropTypes.oneOf(["video", "live"]),
    source: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
