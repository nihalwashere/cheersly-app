import React from "react";
import { CHEERSLY_SUPPORT_EMAIL } from "../../utils/constants";

const PageNotFound = () => {
  return (
    <div className="">
      <div className="">Page Not Found</div>
      <div className="">
        Something has gone awry, please contact {CHEERSLY_SUPPORT_EMAIL}
      </div>
    </div>
  );
};

export default PageNotFound;
