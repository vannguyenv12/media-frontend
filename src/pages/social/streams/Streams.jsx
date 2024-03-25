import { useRef } from 'react';

import './Streams.scss';
import Suggestions from 'src/components/suggestions/Suggestions';
import { useDispatch } from 'react-redux';
import { getUserSuggestions } from 'src/redux-toolkit/api/suggestion';
import useEffectOnce from 'src/hooks/useEffectOnce';
const Streams = () => {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  return (
    <div className="streams">
      <div className="streams-content">
        <div
          className="streams-post"
          ref={bodyRef}
          style={{ backgroundColor: 'white' }}
        >
          <div>Post Form</div>
          <div>Posts Items</div>
          <div
            ref={bottomLineRef}
            style={{ marginBottom: '50px', height: '50px' }}
          ></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Streams;
