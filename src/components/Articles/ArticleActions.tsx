"use client";

import { Button } from "@/components/ui/button";
import {
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";

interface ArticleActionsProps {
  articleId: string;
  title: string;
  slug?: string;
  className?: string;
}

export default function ArticleActions({
  articleId,
  title,
  slug,
  className
}: ArticleActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount] = useState(0);

  const shareUrl = slug
    ? `${window.location.origin}/articles/${slug}`
    : window.location.href;

  const handleShare = async (platform?: string) => {
    try {
      const shareData = {
        title,
        url: shareUrl,
      };

      if (platform) {
        let shareUrl = '';
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
            break;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
        toast.success(`Shared on ${platform}`);
      } else if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Article shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share article");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/articles/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, action: isSaved ? 'remove' : 'add' }),
      });

      if (!response.ok) throw new Error('Failed to update bookmark');

      setIsSaved(!isSaved);
      toast.success(
        isSaved
          ? "Article removed from bookmarks"
          : "Article saved to bookmarks"
      );
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to update bookmarks");
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch('/api/articles/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleId, action: isLiked ? 'unlike' : 'like' }),
      });

      if (!response.ok) throw new Error('Failed to update like');

      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      toast.success(isLiked ? "Like removed" : "Article liked!");
    } catch (error) {
      console.error("Error liking article:", error);
      toast.error("Failed to update like");
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between py-6 border-y border-border",
      className
    )}>
      <div className="flex items-center gap-4">
        <Button
          variant={isLiked ? "primary" : "outline"}
          size="sm"
          className="flex items-center gap-2"
          onClick={handleLike}
          leftIcon={<ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-white' : ''}`} />}
        >
          <span>{likeCount > 0 ? likeCount : 'Like'}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => { }}
          leftIcon={<MessageCircle className="w-4 h-4" />}
        >
          <span>{commentCount > 0 ? commentCount : 'Comment'}</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleShare('facebook')}>
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')}>
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('linkedin')}>
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare()}>
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleSave}
          leftIcon={isSaved ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
} 