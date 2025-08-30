import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";

interface PostData {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

interface PostCardProps {
  post: PostData;
  layout?: 1 | 2 | 3;
}

export function PostCard({ post, layout = 1 }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const getCardClasses = () => {
    const baseClasses = "bg-background border-border";
    switch (layout) {
      case 1:
        return `${baseClasses} max-w-lg mx-auto mb-6`;
      case 2:
        return `${baseClasses} mb-6`;
      case 3:
        return `${baseClasses} mb-6`;
      default:
        return `${baseClasses} max-w-lg mx-auto mb-6`;
    }
  };

  const isCompact = layout > 1;

  return (
    <Card className={getCardClasses()}>
      {/* Post Header */}
      <div className={`flex items-center justify-between ${isCompact ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center gap-3">
          <Avatar className={isCompact ? "h-6 w-6" : "h-8 w-8"}>
            <ImageWithFallback
              src={post.userAvatar}
              alt={post.username}
              className="h-full w-full object-cover rounded-full"
            />
          </Avatar>
          <div>
            <p className={`font-medium ${isCompact ? 'text-sm' : ''}`}>{post.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className={isCompact ? "h-4 w-4" : "h-5 w-5"} />
        </Button>
      </div>

      {/* Post Image */}
      <div className="aspect-square">
        <ImageWithFallback
          src={post.image}
          alt="Post image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className={isCompact ? "p-3" : "p-4"}>
        <div className={`flex items-center justify-between ${isCompact ? 'mb-2' : 'mb-3'}`}>
          <div className={`flex items-center ${isCompact ? 'gap-3' : 'gap-4'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="p-0 h-auto"
            >
              <Heart
                className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <MessageCircle className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 h-auto">
              <Share className={isCompact ? "h-5 w-5" : "h-6 w-6"} />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
            className="p-0 h-auto"
          >
            <Bookmark
              className={`${isCompact ? 'h-5 w-5' : 'h-6 w-6'} ${isSaved ? "fill-current" : ""}`}
            />
          </Button>
        </div>

        {/* Likes */}
        <p className={`font-medium ${isCompact ? 'mb-1 text-sm' : 'mb-2'}`}>
          좋아요 {post.likes + (isLiked ? 1 : 0)}개
        </p>

        {/* Caption */}
        <div className={isCompact ? "mb-1" : "mb-2"}>
          <span className={`font-medium mr-2 ${isCompact ? 'text-sm' : ''}`}>{post.username}</span>
          <span className={isCompact ? 'text-sm' : ''}>{isCompact ? post.caption.slice(0, 60) + (post.caption.length > 60 ? '...' : '') : post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments > 0 && !isCompact && (
          <Button variant="ghost" className="p-0 h-auto text-muted-foreground mb-2">
            댓글 {post.comments}개 모두 보기
          </Button>
        )}

        {/* Time */}
        <p className={`text-muted-foreground ${isCompact ? 'text-xs' : 'text-sm'}`}>{post.timeAgo}</p>
      </div>
    </Card>
  );
}