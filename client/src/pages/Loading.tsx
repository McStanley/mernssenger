import { Comment } from 'react-loader-spinner';
import Mernssenger from '../components/Mernssenger';

function Loading() {
  return (
    <div className="m-auto flex flex-col items-center gap-4">
      <h1 className="text-5xl">
        <Mernssenger />
      </h1>
      <Comment backgroundColor="#4b5563" />
    </div>
  );
}

export default Loading;
