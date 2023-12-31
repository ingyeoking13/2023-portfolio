'use client'
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

import {
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Response, request } from '@@/common/fetch';
import { useRouter } from 'next/navigation';

export const AppBarComponent = () => {
  const router = useRouter();
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleLogout = async () => {
    const { data } = (await request({
      url: "/auth/signout",
      method: "post",
      body: ''
    })) as Response;
    if (data) {
      window.localStorage.removeItem('access_token');
      window.location.reload();
    } else {
      alert('logout error.')
    }
  }

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token')
    if(accessToken) {
      setLoginStatus(true);
    }
  },[])

  const repoUrl = 'https://github.com/ingyeoking13';
  return (
    <AppBar component="nav">
      <Toolbar>
        <Link href={repoUrl} target="_blank">
          <IconButton>
            <GitHubIcon htmlColor="#fff" />
          </IconButton>
        </Link>
        <Box>
          <Button onClick={handleClick} variant="contained" disableElevation>
            <Typography>인증</Typography>
          </Button>
          <Menu
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={() => setAnchorElement(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem>
              <Button href="/signup" color="primary" LinkComponent={Link}>
                회원가입
              </Button>
            </MenuItem>
            {!loginStatus && (
              <MenuItem>
                <Button href="/signin" color="primary" LinkComponent={Link}>
                  로그인
                </Button>
              </MenuItem>
            )}
            {loginStatus && (
              <MenuItem>
                <Button onClick={handleLogout} color="primary">
                  로그아웃
                </Button>
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}