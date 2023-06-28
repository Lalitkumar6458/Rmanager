const { default: Footer } = require("./Footer");
const { default: Header } = require("./Header");

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
