import { Outlet } from 'react-router-dom';

export const MainLayout = (): any => {
    return (
        <div className="layout">
            <div>
                <Outlet />
            </div>
        </div>
    );
};


