import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description = "" }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const encoded = {
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
    desc: encodeURIComponent(description),
  };

  const links = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
    },
    {
      label: "X (Twitter)",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link gekopieerd!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Deel:</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Deel op ${link.label}`}
          className="h-9 w-9 rounded-full border border-warm-200 bg-warm-50 flex items-center justify-center text-muted-foreground hover:text-terracotta-600 hover:border-terracotta-300 transition-colors"
        >
          <link.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Kopieer link"
        className="h-9 w-9 rounded-full border border-warm-200 bg-warm-50 flex items-center justify-center text-muted-foreground hover:text-terracotta-600 hover:border-terracotta-300 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-sage-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SocialShare;
