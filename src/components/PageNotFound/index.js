import React from "react";
import { CHEERSLY_SUPPORT_EMAIL } from "../../utils/constants";
import "./styles.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-text">Page Not Found</div>
      <div className="page-not-found-description-text">
        Something has gone awry, please contact {CHEERSLY_SUPPORT_EMAIL}
      </div>
    </div>
  );
};

export default PageNotFound;
