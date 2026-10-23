import { ArrowRight, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type EnrollmentFormProps = {
  onOpenApplication: () => void;
};

export default function EnrollmentForm({ onOpenApplication }: EnrollmentFormProps) {
  const { t } = useTranslation();

  return (
    <section id="enroll" className="py-20 md:py-28 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            {t('enrollment.label')}
          </span>
          <h2 className="section-heading text-white mt-4 mb-4">{t('enrollment.title')}</h2>
          <p className="text-gray-400 text-lg">{t('enrollment.description')}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl border border-gray-100">
          <div className="w-14 h-14 bg-[#F7931A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="text-[#F7931A]" size={28} />
          </div>
          <h3 className="text-xl font-bold text-black mb-3">{t('enrollment.cardTitle')}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            {t('enrollment.cardDescription')}
          </p>
          <button
            type="button"
            onClick={onOpenApplication}
            className="btn-primary text-base px-10 py-4 w-full sm:w-auto justify-center"
            data-testid="open-application-wizard"
          >
            {t('enrollment.start')}
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-600 mt-6">
            {t('enrollment.questionsPrefix')}{' '}
            <a
              href="mailto:ambassadors@ismos.xyz?subject=Ambassador%20Question"
              className="text-orange-700 underline"
            >
              ambassadors@ismos.xyz
            </a>{' '}
            {t('enrollment.questionsSuffix')}
          </p>
        </div>
      </div>
    </section>
  );
}
