import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage'; // HomePage 임포트 추가
import { CssBaseline, GlobalStyles } from '@mui/material';

function App() {
  return (
    <Router>
      {/* MUI의 기본 CSS를 적용하고, App.css의 내용을 초기화합니다. */}
      <CssBaseline />
      <GlobalStyles styles={{ '#root': { margin: 0, padding: 0, boxSizing: 'border-box' } }} />

      <Routes>
        {/* 기본 경로는 홈 페이지로 설정합니다. */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
