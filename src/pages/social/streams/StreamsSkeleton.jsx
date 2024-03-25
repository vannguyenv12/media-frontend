import 'src/pages/social/streams/Streams.scss';
import SuggestionsSkeletons from 'src/components/suggestions/SuggestionsSkeleton';
// import PostFormSkeleton from 'src/components/posts/post-form/PostFormSkeleton';
// import PostSkeleton from 'src/components/posts/post/PostSkeleton';

const StreamsSkeleton = () => {
  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post">
          {/* <PostFormSkeleton /> */}
          <p>Post Form</p>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index}>
              {/* <PostSkeleton /> */}
              post item
            </div>
          ))}
        </div>
        <div className="streams-suggestions">
          <SuggestionsSkeletons />
        </div>
      </div>
    </div>
  );
};

export default StreamsSkeleton;
