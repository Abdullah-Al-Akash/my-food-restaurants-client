import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth()
    console.log(user);
    return (
        <div>
            <div><h3>Welcome to <span>{user?.displayName? user.displayName : 'back'}</span> </h3></div>
        </div>
    );
};

export default UserHome;