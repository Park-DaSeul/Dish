import { useState, useEffect, useCallback } from "react";
import { PostCard } from "./PostCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Grid3X3, Grid2X2, Square } from "lucide-react";

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

interface SearchResultsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type LayoutType = 1 | 2 | 3;

// Mock data for posts
const generateMockPosts = (startIndex: number, count: number): PostData[] => {
  const images = [
    "https://images.unsplash.com/photo-1647667092813-657795257d00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzaCUyMG1lYWwlMjByZXN0YXVyYW50fGVufDF8fHx8MTc1NjUyOTU0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1590301157890-4810ed352733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kfGVufDF8fHx8MTc1NjUyOTU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1739417083034-4e9118f487be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBpdGFsaWFufGVufDF8fHx8MTc1NjQ1MTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1684043435791-6b34d2ed7d84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwZm9vZHxlbnwxfHx8fDE3NTY0Mjk5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];
  
  const usernames = ["foodie_kim", "chef_park", "cooking_lee", "taste_jung", "recipe_choi"];
  const captions = [
    "오늘의 맛있는 요리! 정말 만족스러운 한 끼였어요 🍽️",
    "새로운 레시피로 만든 특별한 요리입니다. 여러분도 한번 도전해보세요!",
    "이렇게 맛있는 음식을 만날 수 있어서 행복해요 ✨",
    "친구들과 함께 먹으니 더욱 맛있네요! 좋은 시간이었습니다",
    "집에서 만든 요리인데 레스토랑 못지않은 맛이에요 👨‍🍳"
  ];

  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    return {
      id: `post-${index}`,
      username: usernames[index % usernames.length],
      userAvatar: `https://i.pravatar.cc/150?img=${(index % 20) + 1}`,
      image: images[index % images.length],
      caption: captions[index % captions.length],
      likes: Math.floor(Math.random() * 1000) + 10,
      comments: Math.floor(Math.random() * 50),
      timeAgo: `${Math.floor(Math.random() * 24) + 1}시간 전`
    };
  });
};

export function SearchResults({ searchQuery, onSearchChange }: SearchResultsProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearchQuery, setCurrentSearchQuery] = useState(searchQuery);
  const [layout, setLayout] = useState<LayoutType>(1);

  // Load initial posts
  useEffect(() => {
    setPosts(generateMockPosts(0, 5));
  }, []);

  // Infinite scroll handler
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newPosts = generateMockPosts(posts.length, 3);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setLoading(false);
      
      // Stop loading more after 20 posts (for demo)
      if (posts.length >= 20) {
        setHasMore(false);
      }
    }, 1000);
  }, [posts.length, loading, hasMore]);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  const handleSearch = () => {
    onSearchChange(currentSearchQuery);
    // Reset and reload posts for new search
    setPosts(generateMockPosts(0, 5));
    setHasMore(true);
  };

  const getGridClasses = () => {
    switch (layout) {
      case 1:
        return "max-w-lg mx-auto";
      case 2:
        return "max-w-4xl mx-auto grid grid-cols-2 gap-6";
      case 3:
        return "max-w-6xl mx-auto grid grid-cols-3 gap-6";
      default:
        return "max-w-lg mx-auto";
    }
  };

  return (
    <div className="ml-64 min-h-screen bg-background">
      {/* Search Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="검색어를 입력하세요"
                value={currentSearchQuery}
                onChange={(e) => setCurrentSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 h-10 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Layout Controls */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant={layout === 1 ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout(1)}
              className="p-2"
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === 2 ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout(2)}
              className="p-2"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === 3 ? "default" : "ghost"}
              size="sm"
              onClick={() => setLayout(3)}
              className="p-2"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="py-6">
        {searchQuery && (
          <div className="max-w-6xl mx-auto px-4 mb-6">
            <h2 className="text-xl font-medium">"{searchQuery}" 검색 결과</h2>
            <p className="text-muted-foreground">총 {posts.length}개의 게시물</p>
          </div>
        )}
        
        <div className={`px-4 ${getGridClasses()}`}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} layout={layout} />
          ))}
        </div>
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            모든 게시물을 불러왔습니다.
          </div>
        )}
      </div>
    </div>
  );
}