import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utilis";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Ajay 👋</h1>
        <p className={styles.description}>
          Experienced Data Engineer skilled in web scraping and NLP projects.
          Expertise in Python, SQL, Streamlit, and Power BI, with a focus on
          data analysis projects.
        </p>
        <div className={styles.buttonContainer}>
          <a href="mailto:a.kumar01c@gmail.com" className={styles.contactBtn}>
            Contact Me
          </a>
          <a href="https://bit.ly/3VASQWy" className={styles.contactBtn}>
            &nbsp;&nbsp;&nbsp;&nbsp;Resume&nbsp;&nbsp;&nbsp;&nbsp;
          </a>
        </div>
      </div>
      <img
        src={getImageUrl("hero/profile.png")}
        alt="hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
