import React from "react";
import styles from "./About.module.css";

import { getImageUrl } from "../../utilis";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="cursorIcon" />
            <div className={styles.aboutItemText}>
              <h3>Data Engineer</h3>
              <p>
                Experienced Data Engineer at Vitispro, skilled in web scraping
                and NLP projects.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="serverIcon" />
            <div className={styles.aboutItemText}>
              <h3>Data Analyst</h3>
              <p>
                Expertise in Python, SQL, Streamlit, and Power BI, with a focus
                on data analysis, data science, and machine learning. Known for
                Strong analytical skills, passionate about utilizing data to
                inform decisions and extract actionable insights in the
                corporate sphere.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
