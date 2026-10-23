/** Shared options for the Americas Bitcoin Education Ambassador application wizard */

/** Which CTA opened the wizard; sent to Customer.io as `application_intent`. */
export type ApplicationIntent = 'learner' | 'tutor';

export const AMERICAS_COUNTRIES = [
  'Antigua and Barbuda',
  'Argentina',
  'Bahamas',
  'Barbados',
  'Belize',
  'Bolivia',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'El Salvador',
  'Grenada',
  'Guatemala',
  'Guyana',
  'Haiti',
  'Honduras',
  'Jamaica',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Paraguay',
  'Peru',
  'Puerto Rico',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Suriname',
  'Trinidad and Tobago',
  'United States',
  'Uruguay',
  'Venezuela',
] as const;

export const PRIMARY_LANGUAGE_OPTIONS = [
  'Spanish',
  'English',
  'Portuguese',
  'French',
  'Haitian Creole',
  'Quechua',
  'Guarani',
  'Aymara',
  'Nahuatl',
  "K'iche'",
  'Mapudungun',
  'Dutch',
  'Other',
] as const;

/** “Additional languages” dropdown per application spec */
export const ADDITIONAL_LANGUAGES_OPTIONS = [
  'None',
  'One additional language',
  'Two additional languages',
  'Three or more additional languages',
] as const;

export const TIMEZONES = [
  { value: 'GMT-10', label: 'GMT−10 (Honolulu)' },
  { value: 'GMT-8', label: 'GMT−8 (Los Angeles, Vancouver, Tijuana)' },
  { value: 'GMT-7', label: 'GMT−7 (Denver, Phoenix)' },
  { value: 'GMT-6', label: 'GMT−6 (Mexico City, Guatemala, San Salvador, Chicago)' },
  { value: 'GMT-5', label: 'GMT−5 (Bogotá, Lima, Quito, Panama, New York)' },
  { value: 'GMT-4', label: 'GMT−4 (Caracas, La Paz, Santo Domingo, Santiago)' },
  { value: 'GMT-3', label: 'GMT−3 (Buenos Aires, São Paulo, Montevideo)' },
  { value: 'GMT-2', label: 'GMT−2 (Fernando de Noronha)' },
] as const;

export const HEAR_ABOUT_OPTIONS = [
  'Social Media',
  'Friend/Referral',
  'Bitcoin Community',
  'Current/Former Student',
  'Website',
  'Other',
] as const;

export const HOURS_PER_WEEK_OPTIONS = [
  '5-10 hours',
  '10-15 hours',
  '15-20 hours',
  '20+ hours',
] as const;

export const BITCOIN_KNOWLEDGE_OPTIONS = [
  {
    value: 'beginner',
    label: "Beginner: I'm still learning",
  },
  {
    value: 'intermediate',
    label: 'Intermediate: I understand Bitcoin well',
  },
  {
    value: 'advanced',
    label: 'Advanced: I have deep knowledge',
  },
  {
    value: 'expert',
    label: 'Expert: highly knowledgeable',
  },
] as const;

export const STORAGE_KEY = 'ambe-ambassador-application-v1';
