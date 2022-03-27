import Sidebar from '../../components/Sidebar';
import SinglePost from '../../components/SinglePost';

const Show = () => {
    return (
        <div className='flex'>
            <SinglePost />
            <Sidebar />
        </div>
    );
}

export default Show;