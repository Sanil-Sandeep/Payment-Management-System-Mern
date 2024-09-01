import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ( {destination = '/' }) => {
  return (
    <div className='flex'>
        <Link
           to={destination}
           className='bg-orange-900 text-white px-4 py-1 rounded-lg w-fit' 
        >   
        <BsArrowLeft className='text-2xl' />
        </Link>

    </div>
  )
}

export default BackButton