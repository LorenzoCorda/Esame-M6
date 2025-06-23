import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark p-3">
        <div className="row">
          <div className="col">
            <footer className="text-center text-warning">
              <p className="text-warning">© 2025 Epiblog.</p>
              <p>Follow Us:</p>
              <p>
                <a className="text-white" href="#">
                  <Facebook className="m-1" />
                </a>
                <a className="text-white" href="#">
                  <Instagram className="m-1" />
                </a>
                <a className="text-white" href="#">
                  <Twitter className="m-1" />
                </a>
                <a className="text-white" href="#">
                  <Youtube className="m-1" />
                </a>
              </p>

              <div className="d-flex justify-content-center ">
                <p className="d-flex flex-column">
                  <a
                    href="/privacy"
                    className="text-warning text-decoration-none m-1 "
                  >
                    Blog
                  </a>

                  <a
                    href="/FAQ"
                    className="text-warning text-decoration-none m-1"
                  >
                    FAQ
                  </a>

                  <a
                    href="/terms"
                    className="text-warning text-decoration-none m-1"
                  >
                    Contact Us
                  </a>

                  <a
                    href="/terms"
                    className="text-warning text-decoration-none"
                  >
                    About Us
                  </a>
                </p>
                <p className="d-flex flex-column">
                  <a
                    href="/privacy"
                    className="text-warning text-decoration-none m-1 "
                  >
                    Cookie Policy
                  </a>

                  <a
                    href="/terms"
                    className="text-warning text-decoration-none m-1"
                  >
                    Privacy Policy
                  </a>

                  <a
                    href="/terms"
                    className="text-warning text-decoration-none m-1"
                  >
                    Help
                  </a>

                  <a
                    href="/terms"
                    className="text-warning text-decoration-none"
                  >
                    Terms os Use
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
