/** Shared options for the Africa Bitcoin Education Ambassador application wizard */

/** Which CTA opened the wizard; sent to Customer.io as `application_intent`. */
export type ApplicationIntent = 'learner' | 'tutor';

export const AFRICAN_COUNTRIES = [
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Comoros',
  'Congo (Brazzaville)',
  'Congo (DRC)',
  "Côte d'Ivoire",
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea',
  'Guinea-Bissau',
  'Kenya',
  'Lesotho',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'São Tomé and Príncipe',
  'Senegal',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'Zambia',
  'Zimbabwe',
] as const;

export const PRIMARY_LANGUAGE_OPTIONS = [
  'English',
  'French',
  'Portuguese',
  'Arabic',
  'Swahili',
  'Hausa',
  'Amharic',
  'Yoruba',
  'Igbo',
  'Zulu',
  'Xhosa',
  'Shona',
  'Afrikaans',
  'Somali',
  'Wolof',
  'Twi',
  'Lingala',
  'Malagasy',
  'Tigrinya',
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
  { value: 'GMT-1', label: 'GMT−1 (Cape Verde)' },
  { value: 'GMT+0', label: 'GMT+0 (Accra, Abidjan, London)' },
  { value: 'GMT+1', label: 'GMT+1 (Lagos, Casablanca, Berlin)' },
  { value: 'GMT+2', label: 'GMT+2 (Johannesburg, Cairo, Kigali)' },
  { value: 'GMT+3', label: 'GMT+3 (Nairobi, Mogadishu)' },
  { value: 'GMT+4', label: 'GMT+4 (Mauritius, Seychelles)' },
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

export const STORAGE_KEY = 'abe-ambassador-application-v1';
