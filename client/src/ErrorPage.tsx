import { Link } from "react-router-dom";

export default function ErrorPage(): React.ReactElement {
  return (
    <div className="container-error-page">
      <div className="card-response">
        <h1>This route does not exist, sorry!</h1>
        <Link to="/">Return to the homepage by clicking here!</Link>
      </div>
    </div>
  );
}
