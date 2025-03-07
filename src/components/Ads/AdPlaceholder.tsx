type AdLocation = 'article_top' | 'article_inline' | 'article_sidebar';

interface AdPlaceholderProps {
  className?: string;
  location: AdLocation;
  height?: string;
  width?: string;
}

export default function AdPlaceholder({
  className = '',
  location,
  height = 'auto',
  width = '100%'
}: AdPlaceholderProps) {
  return (
    <div
      className={`bg-muted/30 flex items-center justify-center rounded-md transition-opacity hover:bg-muted/40 ${className}`}
      data-ad-slot={location}
      style={{ height, width }}
      role="complementary"
      aria-label={`Advertisement - ${location.replace('_', ' ')}`}
    >
      <span className="text-sm text-muted-foreground select-none">
        Advertisement
      </span>
    </div>
  );
} 