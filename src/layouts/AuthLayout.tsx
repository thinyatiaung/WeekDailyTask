import { Outlet } from 'react-router-dom';
import { useAuthRoute } from '@hooks/useAuth';
import { Container } from 'reactstrap';
import Notification from '@components/Notification';
export const AuthLayout: React.FC = () => {
    useAuthRoute();

    return (
        <Container className="p-4 wrapper" fluid>
            <Outlet />
            <Notification />
        </Container>
    );
};
