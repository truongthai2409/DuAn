import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegesterPage from "../../pages/regester";

const router = [
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/register',
        element: <RegesterPage/>,
    },
    
]
export default router;