import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.footer_a}
        href="https://forms.gle/xx9CoP5FPmz365kK7"
        rel="noreferrer noopener"
      >
        お問い合わせ
      </a>
      <div>
        <small>@2020 yuji yanase</small>
      </div>
    </footer>
  );
};

export default Footer;
