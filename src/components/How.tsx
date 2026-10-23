import { Users, Wrench, MessageCircle, Share2, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function How() {
  const { t } = useTranslation();
  const steps = [
    {
      number: '01',
      icon: Users,
      title: t('how.steps.one.title'),
      description: t('how.steps.one.description'),
    },
    {
      number: '02',
      icon: Wrench,
      title: t('how.steps.two.title'),
      description: t('how.steps.two.description'),
    },
    {
      number: '03',
      icon: MessageCircle,
      title: t('how.steps.three.title'),
      description: t('how.steps.three.description'),
    },
    {
      number: '04',
      icon: Share2,
      title: t('how.steps.four.title'),
      description: t('how.steps.four.description'),
    },
    {
      number: '05',
      icon: CheckCircle,
      title: t('how.steps.five.title'),
      description: t('how.steps.five.description'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-orange-700 text-sm font-semibold uppercase tracking-widest">
            {t('how.label')}
          </span>
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-black mb-6">
            {t('how.titlePrefix')}{' '}
            <span className="text-orange-700">{t('how.titleHighlight')}</span>
          </h2>
          <p className="section-subheading">{t('how.description')}</p>
        </div>

        {/* Timeline / Steps */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="lg:w-5/12">
                    <div className="card hover:shadow-lg transition-shadow group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#F7931A] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon size={22} className="text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold mb-1">
                            {t('how.stepLabel')} {step.number}
                          </div>
                          <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:flex lg:w-2/12 justify-center">
                    <div className="w-10 h-10 bg-black border-4 border-[#F7931A] rounded-full flex items-center justify-center z-10">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
