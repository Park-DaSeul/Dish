import React, { useState } from 'react';
import { signup } from '../services/authService';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const data = await signup(formData);
      setSuccess(`회원가입 성공! ${data.data.name}님 환영합니다.`);
    } catch (err) {
      setError(err.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="name" label="이름" name="name" autoComplete="name" autoFocus onChange={handleChange} />
            <TextField margin="normal" required fullWidth id="nickname" label="닉네임" name="nickname" autoComplete="nickname" onChange={handleChange} />
            <TextField margin="normal" required fullWidth id="email" label="이메일 주소" name="email" autoComplete="email" onChange={handleChange} />
            <TextField margin="normal" required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password" onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              회원가입
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
