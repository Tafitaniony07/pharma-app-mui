import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function LoaderMain({account}) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("Isaccount", account);
    setTimeout(()=>{
        if (account === null ){
          navigate('/')
          return
        }
        if (account.account_type === "gestionnaires")
            navigate("/admin")
    }, 1000)
  }, [account])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
