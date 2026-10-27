import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/content";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={className ? `social-links ${className}` : "social-links"} aria-label="Media sosial">
      {SOCIAL_LINKS.map((item) => (
        <li key={item.label}>
          <a className="social-link" href={item.url} target="_blank" rel="noopener noreferrer">
            <Image className="social-icon" src={`/images/social/${item.icon}.svg`} width={28} height={28} alt="" />
            <span className="sr-only">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
