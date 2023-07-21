import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { ChatFooter, ChatHeader } from '.';
import Message from './ChatsComponents/Message';

function Conversation({ sidebar }) {
  // using theme
  const theme = useTheme();

  return (
    // initializing height and width for conversation area
    <Box
      sx={{
        height: '100%',
        width: sidebar.open ? 'calc(100vw - 720px)' : 'calc(100vw - 400px)',
        transition: sidebar.open ? '' : 'width 0.1s ease-in-out',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Parent Stack */}
      <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        {/* header */}
        <ChatHeader />

        {/* Main Conversation */}
        <Box
          sx={{
            width: '100%',
            flexGrow: 1,
            height: '100%',
            overflowY: 'scroll',
          }}
          className="scrollbar"
        >
          <Message />
        </Box>

        {/* footer */}
        <ChatFooter />
      </Stack>
    </Box>
  );
}

export default Conversation;