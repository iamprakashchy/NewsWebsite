"use client";

import { Twitter, Facebook, Link } from 'lucide-react';
import { LinkedinIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialShareProps {
  article: {
    title: string;
    _id: string;
  };
}

export default function SocialShare({ article }: SocialShareProps) {
  const shareUrl = `${window.location.origin}/articles/${article._id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error("Failed to copy link", err);
      toast.error('Failed to copy link');
    }
  };
  const handleShare = (platform: string) => {
    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank');
    }
  };

  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Share Article</h3>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Twitter className="w-5 h-5" />
          <span>Share on Twitter</span>
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Facebook className="w-5 h-5" />
          <span>Share on Facebook</span>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <LinkedinIcon className="w-5 h-5" />
          <span>Share on LinkedIn</span>
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Link className="w-5 h-5" />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
}