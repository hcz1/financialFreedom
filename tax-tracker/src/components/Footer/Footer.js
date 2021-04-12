const Footer = () => (
  <footer>
    <span>&#169; SimpleSalary {new Date().getFullYear()}</span>
    <span>
      <a href='terms-and-conditions.html'>Terms & Conditions</a>
    </span>
    <span style={{ cursor: 'pointer' }} onClick={() => window.popup.open()}>
      Cookie Policy
    </span>
  </footer>
);

export default Footer;
