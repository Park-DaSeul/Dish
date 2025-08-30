import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material';

// 예시 요리 데이터
const dishes = [
  {
    id: 1,
    name: '김치찌개',
    description: '한국인의 소울푸드, 얼큰하고 맛있는 김치찌개',
    imageUrl: 'https://source.unsplash.com/random/400x300?kimchi',
  },
  {
    id: 2,
    name: '된장찌개',
    description: '구수하고 깊은 맛이 일품인 전통 된장찌개',
    imageUrl: 'https://source.unsplash.com/random/400x300?doenjang',
  },
  {
    id: 3,
    name: '비빔밥',
    description: '다양한 나물과 고기가 어우러진 건강한 한 끼',
    imageUrl: 'https://source.unsplash.com/random/400x300?bibimbap',
  },
  {
    id: 4,
    name: '불고기',
    description: '달콤한 양념에 재운 부드러운 소고기 요리',
    imageUrl: 'https://source.unsplash.com/random/400x300?bulgogi',
  },
  {
    id: 5,
    name: '떡볶이',
    description: '매콤달콤한 떡과 어묵의 환상적인 조화',
    imageUrl: 'https://source.unsplash.com/random/400x300?tteokbokki',
  },
  {
    id: 6,
    name: '잡채',
    description: '잔칫날 빠질 수 없는 다채로운 색감의 잡채',
    imageUrl: 'https://source.unsplash.com/random/400x300?japchae',
  },
];

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 상단 네비게이션 바 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            오늘 뭐 먹지?
          </Typography>
          <Button color="inherit">로그인</Button>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {dishes.map((dish) => (
            <Grid item key={dish.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={dish.imageUrl}
                  alt={dish.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {dish.name}
                  </Typography>
                  <Typography>{dish.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">레시피 보기</Button>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
