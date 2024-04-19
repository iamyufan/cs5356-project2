import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Questionify</strong> for{" "}
          <a href="https://jgthms.com">CS 5356</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
