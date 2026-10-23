import { Award, Bitcoin, Briefcase, Globe, Cpu, FolderOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Benefits() {
  const { t } = useTranslation();
  const benefits = [
    {
      icon: Award,
      title: t('benefits.cards.certified.title'),
      description: t('benefits.cards.certified.description'),
    },
    {
      icon: Bitcoin,
      title: t('benefits.cards.earnAsYouLearn.title'),
      description: t('benefits.cards.earnAsYouLearn.description'),
    },
    {
      icon: Briefcase,
      title: t('benefits.cards.internships.title'),
      description: t('benefits.cards.internships.description'),
    },
    {
      icon: Globe,
      title: t('benefits.cards.globalOpportunities.title'),
      description: t('benefits.cards.globalOpportunities.description'),
    },
    {
      icon: Cpu,
      title: t('benefits.cards.techTraining.title'),
      description: t('benefits.cards.techTraining.description'),
    },
    {
      icon: FolderOpen,
      title: t('benefits.cards.portfolio.title'),
      description: t('benefits.cards.portfolio.description'),
    },
  ];
  const subjects = [
    t('benefits.subjects.one'),
    t('benefits.subjects.two'),
    t('benefits.subjects.three'),
    t('benefits.subjects.four'),
    t('benefits.subjects.five'),
    t('benefits.subjects.six'),
  ];

  return (
    <section id="benefits" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-orange-700 text-sm font-semibold uppercase tracking-widest">
            {t('benefits.label')}
          </span>
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-black mb-6">
            {t('benefits.titlePrefix')}{' '}
            <span className="text-orange-700">{t('benefits.titleHighlight')}</span>
          </h2>
          <p className="section-subheading">{t('benefits.description')}</p>
        </div>

        {/* Benefits grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group w-full max-w-sm"
            >
              <div className="w-10 h-10 bg-[#F7931A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F7931A] transition-colors">
                <Icon
                  size={20}
                  className="text-[#F7931A] group-hover:text-white transition-colors"
                />
              </div>
              <h3 className="font-bold text-black mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* What you'll learn */}
        <div className="bg-black rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
                {t('benefits.curriculumLabel')}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4">
                {t('benefits.curriculumTitle')}
              </h3>
              <p className="text-gray-400 leading-relaxed">{t('benefits.curriculumDescription')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 bg-[#F7931A] rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
