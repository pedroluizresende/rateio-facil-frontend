import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={ styles.footer }>
      <p>Desenvolvido por Pedro Resende</p>
      <section className={ styles.socialMedia }>
        <a
          href="https://www.linkedin.com/in/pedro-luiz-resende/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin aria-label="LinkedIn" />
        </a>
        <a
          href="https://github.com/pedroluizresende"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub aria-label="GitHub" />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
