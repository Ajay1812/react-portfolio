import React from "react";
import { getImageUrl } from "../../utilis";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:a.kumar01c@gmail.com">a.kumar01c@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="Email icon" />
          <a href="https://www.linkedin.com/in/nf-analyst">
            linkedin.com/in/nf-analyst
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Email icon" />
          <a href="https://github.com/Ajay1812">https://github.com/Ajay1812</a>
        </li>
      </ul>
    </footer>
  );
};
