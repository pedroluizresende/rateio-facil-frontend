import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={ styles.footer }>
      <p>Desenvolvido por Pedro Resende</p>
      <section className={ styles.socialMedia }>
        <a href="https://www.linkedin.com/in/pedro-luiz-resende/" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/pedroluizresende" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
