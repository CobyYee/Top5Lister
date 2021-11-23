import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            
            <div id="title">Welcome to the Top 5 Lister!</div>
            <div id="description">
                Create, share, comment on all your favorite lists. It's easy! Just sign up with your email and get to work!
            </div>
            <Button variant = "outlined" component = {Link} to = "/login/" style={{
                color: "#000000",
                padding: "10px 36px",
                width: "150px",
                height: "40px",
                fontSize: "12px"
            }}> Login </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant = "outlined" component = {Link} to = "/register/" style={{
                color: "#000000",
                padding: "10px 36px",
                width: "150px",
                height: "40px",
                fontSize: "12px"
            }}> Register</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant = "outlined" style={{
                color: "#000000",
                padding: "10px 36px",
                width: "150px",
                height: "40px",
                fontSize: "12px"
            }}> Continue as Guest </Button> 
        </div>
    )
}