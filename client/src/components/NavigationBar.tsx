import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { ReactElement } from "react";

type FormatLinkObject = {
  linkTitle: string;
  linkAddress: string;
};

type FormatTitleObject = {
  title: string;
  svgLink: string;
};

function WebsiteTitle({ title, svgLink }: FormatTitleObject) {
  return (
    <div className={styles["card-web-title"]}>
      <img src={svgLink} alt="" />
      <span>{title}</span>
    </div>
  );
}

type ListOfLinksProps = {
  links: Array<FormatLinkObject>;
};
function ListOfLinks({ links }: ListOfLinksProps): ReactElement {
  return (
    <ul className={styles["container-links"]}>
      {links.map((link: FormatLinkObject) => {
        return (
          <li className={styles["card-link"]} key={link.linkTitle}>
            <Link className={styles["a-link"]} to={link.linkAddress}>{link.linkTitle}</Link>
          </li>
        );
      })}
    </ul>
  );
}

type NavigationBarProps = {
  links: Array<FormatLinkObject>;
  webTitle: FormatTitleObject;
};
function NavigationBar({ links, webTitle }: NavigationBarProps): ReactElement {
  console.log(webTitle.svgLink);

  return (
    <div className={styles["container-nav"]}>
      <nav className={styles["card-nav"]}>
        <WebsiteTitle title={webTitle.title} svgLink={webTitle.svgLink} />
        <ListOfLinks links={links} />
      </nav>
    </div>
  );
}

export default NavigationBar;
