import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { jwtDecode } from 'jwt-decode';


export default function ProfilePage() {

  const token = localStorage.getItem("tokenAdmin");

  
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  

  return (
    <>
                <span className="hidden md:block text-lg "><strong>{decodedToken.username}</strong></span>

                      <Stack direction="row" spacing={2}>
                            <Avatar>
                              {decodedToken.username.charAt(0)}
                            </Avatar>
                        </Stack>
    </>
  );
}