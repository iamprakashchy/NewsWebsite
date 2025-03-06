interface AdPlaceholderProps {
  className?: string;
  location: string;
}

export default function AdPlaceholder({ className, location }: AdPlaceholderProps) {
  return (
    <div 
      className={`bg-muted/30 flex items-center justify-center ${className}`}
      data-ad-slot={location}
    >
      <span className="text-sm text-muted-foreground">Advertisement</span>
    </div>
  );
} 