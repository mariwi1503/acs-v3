import { Icon } from "@/components/icon";
import { SOCIAL_LINKS } from "@/lib/content";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className ? `social-links ${className}` : "social-links"} aria-label="Media sosial">
      {SOCIAL_LINKS.map((item) => (
        <li key={item.label}>
          {item.url ? (
            <a className="social-link" href={item.url} target="_blank" rel="noopener noreferrer">
              <Icon name={item.icon} />
              <span className="sr-only">{item.label}</span>
            </a>
          ) : (
            <span className="social-link is-pending" title={`${item.label} segera hadir`}>
              <Icon name={item.icon} />
              <span className="sr-only">{item.label} (segera hadir)</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
