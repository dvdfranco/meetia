import { MainLayout } from './MainLayout';
import Principal from './pages/Principal';
import { Route, Routes } from 'react-router-dom';

const AppRoutes : React.FC = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Principal/>} />
        </Route>
    </Routes>
)

export default AppRoutes;