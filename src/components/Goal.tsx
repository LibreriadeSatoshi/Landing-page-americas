import { Target, TrendingUp, Shield, Code2, Brain, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Goal() {
  const { t } = useTranslation();
  const subjects = [
    { icon: Target, label: t('goal.subjects.blockchain') },
    { icon: Code2, label: t('goal.subjects.cs') },
    { icon: Calculator, label: t('goal.subjects.econMath') },
    { icon: Shield, label: t('goal.subjects.crypto') },
    { icon: TrendingUp, label: t('goal.subjects.coding') },
    { icon: Brain, label: t('goal.subjects.ai') },
  ];

  return (
    <section id="program" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <span className="text-orange-700 text-sm font-semibold uppercase tracking-widest">
              {t('goal.label')}
            </span>
            <h2 className="section-heading text-black mt-4 mb-6">
              {t('goal.titlePrefix')}
              <br />
              <span className="text-orange-700">{t('goal.titleHighlight')}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{t('goal.description')}</p>
            <p className="text-gray-700 font-medium mb-6">{t('goal.pillars')}</p>

            {/* Subject grid */}
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
                >
                  <div className="w-8 h-8 bg-[#F7931A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#F7931A]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative">
            <div className="bg-black rounded-3xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="text-6xl font-black text-[#F7931A]">₿</div>
                <div className="text-white text-xl font-bold mt-2">{t('goal.cardTitle')}</div>
                <div className="text-gray-400 text-sm mt-1">{t('goal.cardSubtitle')}</div>
              </div>

              {/* Network visual */}
              <div className="space-y-3">
                {[
                  { level: t('goal.tiers.learner'), count: '∞', color: 'bg-gray-700' },
                  { level: t('goal.tiers.ambassador'), count: '100+', color: 'bg-[#F7931A]/30' },
                  { level: t('goal.tiers.educator'), count: '50+', color: 'bg-[#F7931A]/60' },
                  { level: t('goal.tiers.leader'), count: '10+', color: 'bg-[#F7931A]' },
                ].map((tier) => (
                  <div
                    key={tier.level}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                  >
                    <span className="text-gray-300 text-sm font-medium">{tier.level}</span>
                    <div className="flex items-center gap-3">
                      <div className={`h-2 rounded-full ${tier.color}`} style={{ width: '80px' }} />
                      <span className="text-[#F7931A] text-sm font-bold w-12 text-right">
                        {tier.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 text-xs">{t('goal.footer')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
