import { useEffect, useRef, useState } from 'react';
import { Check, Language } from 'iconoir-react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LANGUAGES = [
  { code: 'en' as const, label: 'English' },
  { code: 'fr' as const, label: 'Français' },
  { code: 'sw' as const, label: 'Kiswahili' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

type LanguageSwitcherProps = {
  className?: string;
};

/** Language dropdown for the landing page sticky nav (Ink background). */
export default function LanguageSwitcher({ className = '' }: Readonly<LanguageSwitcherProps>) {
  const { i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (language: LangCode) => {
    void i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  return (
    <div ref={langRef} className={`lang-switcher ${className}`}>
      <button
        type="button"
        onClick={() => setLangOpen((prev) => !prev)}
        className="lang-switcher__toggle"
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label="Language"
      >
        <Language aria-hidden />
        <span className="lang-switcher__code">{currentLang.code}</span>
      </button>

      {langOpen && (
        <div className="lang-switcher__menu" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={i18n.resolvedLanguage === lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="lang-switcher__option"
            >
              <span className="lang-switcher__check" aria-hidden>
                {i18n.resolvedLanguage === lang.code && <Check />}
              </span>
              <span className="lang-switcher__label">{lang.label}</span>
              <span className="lang-switcher__code">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
