import { Stack, Box, useTheme, Typography } from "@mui/material";
import getAvatar from "../../../../../utils/createAvatar";

const MessageContainer = ({
  message,
  me,
  isStartOfSequence,
  isEndOfSequence,
  msgType,
  isLastMessage,
}) => {
  const theme = useTheme();

  let borderRadiusStyle;

  if (isStartOfSequence && isEndOfSequence) {
    borderRadiusStyle = "20px";
  } else if (me && isStartOfSequence) {
    borderRadiusStyle = "20px 20px 5px 20px";
  } else if (me && isEndOfSequence) {
    borderRadiusStyle = "20px 5px 20px 20px";
  } else if (me) {
    borderRadiusStyle = "20px 5px 5px 20px";
  } else if (!me && isStartOfSequence) {
    borderRadiusStyle = "20px 20px 20px 5px";
  } else if (!me && isEndOfSequence) {
    borderRadiusStyle = "5px 20px 20px 20px";
  } else {
    borderRadiusStyle = "5px 20px 20px 5px";
  }

  const commonPadding = msgType === "text" ? 1.5 : "3px 0px";

  return (
    <Stack
      direction="row"
      justifyContent={me ? "flex-end" : "flex-start"}
      alignItems="center"
      sx={{ position: "relative" }}
    >
      {!me && isEndOfSequence && (
        <Box
          sx={{
            position: "absolute",
            top: msgType === "text" ? 10 : 18,
            left: -25,
          }}
        >
          {getAvatar(
            message.sender.avatar,
            message.sender.firstName,
            theme,
            20
          )}
        </Box>
      )}
      <Box
        p={commonPadding}
        sx={{
          width: "max-content",
          maxWidth: { xs: "12em", md: "30em" },
          backgroundColor:
            msgType === "text"
              ? me
                ? theme.palette.primary.main
                : theme.palette.background.default
              : "",
          borderRadius: borderRadiusStyle,
        }}
      >
        <Typography
          variant={msgType === "text" ? "body2" : "h3"}
          color={me ? "#fff" : theme.palette.text}
          sx={{ whiteSpace: "pre-line" }}
        >
          {message.message}
        </Typography>
      </Box>
      {me && isLastMessage && (
        <Box
          sx={{
            position: "absolute",
            top: 25,
            right: -16,
          }}
        >
          {getAvatar(
            message.sender.avatar,
            message.sender.firstName,
            theme,
            15
          )}
        </Box>
      )}
    </Stack>
  );
};

export default MessageContainer;
