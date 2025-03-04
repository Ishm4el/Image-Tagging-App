import { Link, useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";
import { ReactElement, useEffect, useRef } from "react";

type FormatLinkObject = {
  linkTitle: string;
  linkAddress: string;
};

type FormatTitleObject = {
  title: string;
  svgLink: string;
  homeRoute: string;
};

function WebsiteTitle({ title, svgLink, homeRoute }: FormatTitleObject) {
  const divCardWebTitleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  function returnHomeEvent(ev: MouseEvent | KeyboardEvent) {
    if (
      (ev instanceof KeyboardEvent && (ev.key === " " || ev.key === "Enter")) ||
      ev instanceof MouseEvent
    ) {
      navigate(homeRoute);
    }
  }
  useEffect(() => {
    if (!divCardWebTitleRef.current)
      throw Error("divCardWebTitleRef is not assigned");
    else {
      divCardWebTitleRef.current.addEventListener("click", returnHomeEvent);
      divCardWebTitleRef.current.addEventListener("keydown", returnHomeEvent);
    }
  }, [divCardWebTitleRef]);
  return (
    <div className={styles["container-web-title"]}>
      <div
        className={styles["card-web-title"]}
        tabIndex={0}
        ref={divCardWebTitleRef}
      >
        <img src={svgLink} alt="" />
        <span>{title}</span>
      </div>
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
            <Link className={styles["a-link"]} to={link.linkAddress}>
              {link.linkTitle}
            </Link>
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
  return (
    <div className={styles["container-nav"]}>
      <nav className={styles["card-nav"]}>
        <WebsiteTitle
          title={webTitle.title}
          svgLink={webTitle.svgLink}
          homeRoute={webTitle.homeRoute}
        />
        <ListOfLinks links={links} />
      </nav>
    </div>
  );
}

export default NavigationBar;
