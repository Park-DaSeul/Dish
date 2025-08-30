import { useState } from "react";
import { Routes, Route, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Search } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { SearchResults } from "./components/SearchResults";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";

// Page Components

const HomePage = () => {
  const [homeSearchInput, setHomeSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (homeSearchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(homeSearchInput.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex justify-end items-center p-6 relative z-10">
        <Link to="/login">
          <Button
            type="button"
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            로그인
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 -mt-20">
        <div className="mb-8">
          <h1 className="text-6xl text-foreground font-normal tracking-tight">
            dish
          </h1>
        </div>

        <div className="w-full max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="검색어를 입력하세요"
              value={homeSearchInput}
              onChange={(e) => setHomeSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-4 py-3 h-12 bg-input-background border border-border rounded-full focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="secondary" className="px-6 py-2" onClick={handleSearch}>
              Dish 검색
            </Button>
            <Button variant="secondary" className="px-6 py-2" onClick={handleSearch}>
              I'm Feeling Lucky
            </Button>
          </div>
        </div>
      </main>

      <div className="h-20"></div>
    </div>
  );
};

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        onHomeClick={() => navigate('/')} 
        onSearchClick={() => navigate('/search')} 
      />
      <SearchResults searchQuery={searchQuery} onSearchChange={handleSearchChange} />
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <LoginForm 
      onSignupClick={() => navigate('/signup')} 
      onBackClick={() => navigate('/')}
    />
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <SignupForm 
      onLoginClick={() => navigate('/login')} 
      onBackClick={() => navigate('/')}
    />
  );
};

// Main App component with routing
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
