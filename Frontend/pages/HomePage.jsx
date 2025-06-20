import BaseLayout from "../layouts/BaseLayout";
import Posts from "../src/components/posts/Posts";
import Headers from "../src/components/headers/Headers";

const HomePage = () => {
  return (
    <>
      <BaseLayout>
        <Headers />
        <Posts />
      </BaseLayout>
    </>
  );
};

export default HomePage;
