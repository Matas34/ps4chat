import React, { useRef, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LanguagesConstants } from '../../.constants/MainConstants';
import { useTranslation } from 'react-i18next';
import "../../styles/languageSelector.css";

const LanguageSelectInput = ({ selectedLanguage, onSelectLanguage }) => {
  const toggleRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (toggleRef.current) {
      setMenuWidth(toggleRef.current.offsetWidth);
    }
  }, [toggleRef]);

  const currentLanguage = LanguagesConstants.find(lang => lang.code === selectedLanguage);

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle
        variant="dark"
        id="dropdown-basic"
        className="d-flex align-items-center"
        ref={toggleRef}
      >
        <span className="flag-label">
          {currentLanguage?.flag}
          {currentLanguage ? currentLanguage.code.toUpperCase() : t('articles.createEdit.selectArticleLanguage')}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: menuWidth || 'auto' }}>
        {LanguagesConstants.map(({ code, flag }) => (
          <Dropdown.Item key={code} onClick={() => onSelectLanguage(code)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {flag}
              {code.toUpperCase()}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelectInput;


