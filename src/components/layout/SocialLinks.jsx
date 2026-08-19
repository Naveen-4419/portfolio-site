import './SocialLinks.css'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Naveen-4419',
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A9.99 9.99 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/placeholder',
    icon: (
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.75h3.5V21H3.2V8.75zm6.2 0h3.36v1.68h.05c.47-.87 1.6-1.79 3.3-1.79 3.53 0 4.18 2.24 4.18 5.15V21h-3.5v-5.53c0-1.32-.02-3.02-1.87-3.02-1.87 0-2.16 1.42-2.16 2.92V21H9.4V8.75z" />
    ),
  },
  {
    label: 'Email',
    href: 'mailto:placeholder@example.com',
    icon: (
      <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13zm1.7.3 7.3 5.86 7.3-5.86H4.7zM19.5 7.1l-7.02 5.63a1 1 0 0 1-1.25 0L4.21 7.1v11.4h15.29V7.1z" />
    ),
  },
]

export default function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Social links">
      {LINKS.map((link) => (
        <a key={link.label} href={link.href} className="social-links__item" aria-label={link.label} title={link.label}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            {link.icon}
          </svg>
        </a>
      ))}
    </nav>
  )
}
