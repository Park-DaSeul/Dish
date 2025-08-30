import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LoginFormProps {
  onSignupClick: () => void;
  onBackClick: () => void;
}

export function LoginForm({ onSignupClick, onBackClick }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', data);
        // You might want to store the token in localStorage or context
        // localStorage.setItem('token', data.token);
        alert('로그인 성공!');
        navigate('/'); // Redirect to the main page
      } else {
        // Handle login failure
        alert(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Back to home button */}
      <div className="absolute top-6 left-6">
        <Button variant="ghost" onClick={onBackClick}>
          ← 홈으로 돌아가기
        </Button>
      </div>

      {/* dish logo */}
      <div className="mb-8">
        <h1 className="text-4xl text-foreground font-normal tracking-tight">dish</h1>
      </div>

      {/* Login card */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Signup link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          계정이 없으신가요?{' '}
          <Button variant="link" onClick={onSignupClick} className="p-0 h-auto font-medium">
            회원가입
          </Button>
        </p>
      </div>
    </div>
  );
}
