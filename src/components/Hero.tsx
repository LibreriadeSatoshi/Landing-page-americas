import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AudienceSelector, { type AudienceType } from './AudienceSelector';

type HeroProps = {
  audience?: AudienceType;
  onAudienceChange?: (audience: AudienceType) => void;
  onApply?: () => void;
};

export default function Hero({
  audience = 'learners',
  onAudienceChange,
  onApply,
}: Readonly<HeroProps>) {
  const { t } = useTranslation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApply = () => {
    if (onApply) onApply();
    else scrollTo('enroll');
  };

  const stats = [
    { value: '54', label: t('hero.stats.countries') },
    { value: '100%', label: t('hero.stats.free') },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #F7931A 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #F7931A 0%, transparent 50%)`,
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 pt-32">
        {onAudienceChange && (
          <AudienceSelector selectedAudience={audience} onAudienceChange={onAudienceChange} />
        )}

        <div className="inline-flex items-center gap-2 bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A] text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-[#F7931A] rounded-full animate-pulse" />
          {t(`hero.badge.${audience}`)}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          {t(`hero.title.${audience}.prefix`)}{' '}
          <span className="text-[#F7931A]">{t(`hero.title.${audience}.highlight`)}</span>{' '}
          {t(`hero.title.${audience}.middle`)} <br className="hidden sm:block" />
          {t(`hero.title.${audience}.suffix`)}
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
          {t(`hero.description.${audience}`)}
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-[#F7931A]">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button type="button" onClick={handleApply} className="btn-primary text-base px-10 py-4">
            {t(`hero.cta.${audience}.apply`)}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="btn-secondary text-base px-10 py-4"
          >
            {t(`hero.cta.${audience}.learnMore`)}
          </button>
        </div>

        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="mt-16 text-gray-400 hover:text-[#F7931A] transition-colors flex flex-col items-center gap-2 mx-auto"
          aria-label={t('hero.scrollAria')}
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scrollLabel')}</span>
          <ArrowDown size={16} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
