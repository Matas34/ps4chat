import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { LanguagesConstants } from '../../.constants/MainConstants';
import "../../styles/languageSelector.css";

const LanguageSelector = (props) => {
  const { i18n, t } = useTranslation();
  const toggleRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState(null);

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    if (toggleRef.current) {
      setMenuWidth(toggleRef.current.offsetWidth);
    }
  }, []);

  const currentLanguage = LanguagesConstants.find(lang => lang.code === i18n.language) || LanguagesConstants[0];
  const currentLabel = t(`languages.${currentLanguage.code}`);

  return (
    <Dropdown className="language-selector" {...props}>
      <Dropdown.Toggle 
        variant="dark" 
        id="dropdown-basic" 
        className="d-flex align-items-center" 
        ref={toggleRef}
        aria-label={`Select language. Current language is ${currentLabel}`}
      >
        <span className="flag-label">
          {currentLanguage.flag}
          {currentLabel}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ width: menuWidth || 'auto' }}>
        {LanguagesConstants.map(({ code, flag }) => {
          const label = t(`languages.${code}`);
          return (
            <Dropdown.Item 
              as="button"
              key={code} 
              onClick={() => handleLanguageChange(code)}
              aria-label={`Change language to ${label}`}
            >
              <div style={{ display: 'flex', alignItems: 'center'}}>
                {flag}
                {label}
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;
