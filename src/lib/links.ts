export const links = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/sunnykim23', emoji: '🐙' },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/deir.finity/',
    emoji: '📱',
  },
  { id: 'email', label: 'Email', href: 'mailto:boyrukim@gmail.com', emoji: '📮' },
] as const;

export type LinkId = (typeof links)[number]['id'];
