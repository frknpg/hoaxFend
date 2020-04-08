// @flow 
import * as React from 'react';
import { changeLanguage } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';

const LanguageSelector = (props) => {
  const { i18n } = useTranslation();

  const onChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  }

  return (
    <div className="container">
      <img src="https://www.countryflags.io/tr/shiny/24.png" alt="Turkish Flag" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }} />
      <img src="https://www.countryflags.io/us/shiny/24.png" alt="Usa Flag" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default LanguageSelector;