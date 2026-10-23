import { AlertTriangle, Globe, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Why() {
  const { t } = useTranslation();
  const reasons = [
    {
      icon: AlertTriangle,
      title: t('why.reasons.gap.title'),
      description: t('why.reasons.gap.description'),
    },
    {
      icon: Globe,
      title: t('why.reasons.languages.title'),
      description: t('why.reasons.languages.description'),
    },
    {
      icon: Heart,
      title: t('why.reasons.teachers.title'),
      description: t('why.reasons.teachers.description'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            {t('why.label')}
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-white mb-6">
            {t('why.titlePrefix')} <span className="text-[#F7931A]">{t('why.titleHighlight')}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">{t('why.description')}</p>
        </div>

        {/* Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border border-white/10 rounded-2xl p-6 hover:border-[#F7931A]/40 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#F7931A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F7931A]/20 transition-colors">
                <Icon size={22} className="text-[#F7931A]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Big quote */}
        <div className="text-center border-t border-white/10 pt-16">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl mx-auto leading-tight">
            {t('why.quotePrefix')} <span className="text-[#F7931A]">{t('why.quoteHighlight')}</span>
          </p>
          <p className="text-gray-400 mt-4">{t('why.quoteAuthor')}</p>
        </div>
      </div>
    </section>
  );
}
