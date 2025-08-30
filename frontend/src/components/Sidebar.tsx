import { Button } from "./ui/button";
import { Search, Home, Compass, Heart, MessageCircle, PlusSquare, User, Menu } from "lucide-react";

interface SidebarProps {
  onHomeClick: () => void;
  onSearchClick: () => void;
}

export function Sidebar({ onHomeClick, onSearchClick }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-normal tracking-tight">dish</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
            onClick={onHomeClick}
          >
            <Home className="h-6 w-6" />
            홈
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
            onClick={onSearchClick}
          >
            <Search className="h-6 w-6" />
            검색
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
          >
            <Compass className="h-6 w-6" />
            탐색
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
          >
            <MessageCircle className="h-6 w-6" />
            메시지
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
          >
            <Heart className="h-6 w-6" />
            알림
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
          >
            <PlusSquare className="h-6 w-6" />
            만들기
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-6 py-3 h-auto"
          >
            <User className="h-6 w-6" />
            프로필
          </Button>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 px-6 py-3 h-auto"
        >
          <Menu className="h-6 w-6" />
          더보기
        </Button>
      </div>
    </div>
  );
}