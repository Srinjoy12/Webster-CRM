import { useSession, signIn, signOut } from "next-auth/react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";

export default function AuthHeader() {
  const { data: session, status } = useSession();

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mini CRM
        </Typography>
        {status === "loading" ? null : !session ? (
          <Button color="primary" variant="outlined" onClick={() => signIn("google")}>Sign in with Google</Button>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={session.user.image} alt={session.user.name} sx={{ width: 32, height: 32 }} />
            <Typography variant="body1">{session.user.name}</Typography>
            <Button color="secondary" variant="outlined" onClick={() => signOut()}>Sign out</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 