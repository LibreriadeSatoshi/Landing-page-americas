import { useTranslation } from 'react-i18next';

export type AudienceType = 'learners' | 'educators' | 'partners';

type AudienceSelectorProps = {
  selectedAudience: AudienceType;
  onAudienceChange: (audience: AudienceType) => void;
};

const audiences = [
  {
    id: 'learners' as const,
    labelKey: 'nav.forLearners',
    descriptionKey: 'hero.audiences.learners',
  },
  {
    id: 'educators' as const,
    labelKey: 'nav.forEducators',
    descriptionKey: 'hero.audiences.educators',
  },
  {
    id: 'partners' as const,
    labelKey: 'nav.forPartners',
    descriptionKey: 'hero.audiences.partners',
  },
] as const;

export default function AudienceSelector({
  selectedAudience,
  onAudienceChange,
}: Readonly<AudienceSelectorProps>) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
        {audiences.map((audience) => (
          <button
            key={audience.id}
            type="button"
            onClick={() => onAudienceChange(audience.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedAudience === audience.id
                ? 'bg-[#F7931A] text-black shadow-lg'
                : 'text-white hover:bg-white/10 hover:text-[#F7931A]'
            }`}
          >
            {t(audience.labelKey)}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 max-w-md text-center">
        {t(audiences.find((a) => a.id === selectedAudience)?.descriptionKey || '')}
      </p>
    </div>
  );
}
