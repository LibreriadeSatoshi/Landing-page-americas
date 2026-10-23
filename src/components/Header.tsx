import { useTranslation } from 'react-i18next';
import ismosMark from '../../design/ismos/logos/ismos-mark-paper.svg';
import './Header.css';

type HeaderProps = {
  /** Used above the application wizard: logo + back control */
  onCloseApplication?: () => void;
};

/**
 * Compact chrome for the ambassador application flow only.
 * The main site nav lives on {@link LandingPage}.
 */
export default function Header({ onCloseApplication }: Readonly<HeaderProps>) {
  const { t } = useTranslation();

  return (
    <header className="app-header ism-block">
      <div className="app-header__inner">
        <button type="button" className="app-header__brand" onClick={() => onCloseApplication?.()}>
          <img src={ismosMark} alt="ISMOS" width={24} height={24} />
          <span>
            {t('brand.prefix')}{' '}
            <span className="app-header__highlight">{t('brand.highlight')}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => onCloseApplication?.()}
          className="ism-btn ism-btn--on-color ism-btn--secondary"
        >
          {t('header.backToSite')}
        </button>
      </div>
    </header>
  );
}
