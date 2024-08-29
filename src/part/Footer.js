import  '../Acetylate the parts/footer.css';
import  '../Acetylate the parts/Allstyle.css';
import { useContext } from 'react';
import ThemeContext from "../datadarkmode";
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t, i18n } = useTranslation();
  const { mode } = useContext(ThemeContext);
  return (
    <div dir='auto' className={`footersection ${mode}`}>
      <p>{t('The website was created and developed by Shadow ')}<span>&#129505;</span></p>
    </div>
  );
}

export default Footer;
