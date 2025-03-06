import styles from "./About.module.css";
export default function About(): React.ReactElement {
  return (
    <main className={styles["container-main"]}>
      <section className={styles["card-about-content"]}>
        <h1>About</h1>
        <h2>Author</h2>
        <p>My name is Ismael Valenzuela</p>
        <h2>Description</h2>
        <p>
          The Tagging Wizard is my implementation on the image tagging full
          stack application project assignment from The Odin Project, utilizing
          PostgeSQL, Express, React, and NodeJS.
        </p>
        <h2>Project Links</h2>
        <dl>
          <dt>GitHub Repo for this Project:</dt>
          <dd>
            <a href="https://github.com/Ishm4el/Image-Tagging-App">
              https://github.com/Ishm4el/Image-Tagging-App
            </a>
          </dd>
          <dt>The Odin Project page for this assignment can be found here:</dt>
          <dd>
            <a href="https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app">
              https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app
            </a>
          </dd>
        </dl>
      </section>
    </main>
  );
}
