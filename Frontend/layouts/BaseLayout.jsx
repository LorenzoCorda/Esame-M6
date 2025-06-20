import Navigation from "../src/components/navigation/Navigation";
import Footer from "../src/components/footer/Footer";

const BaseLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default BaseLayout;
