import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import classNames from "classnames";

function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success }
}) {
  return (
    <Fragment>
      <div className="card card-body my-3">
        <div className="row">
          <div className="col-mb-9">
            <h4>
              Mission :{" "}
              <span
                className={classNames({
                  "text-success": launch_success,
                  "text-danger": !launch_success
                })}
              >
                {mission_name}
              </span>
            </h4>
            <p>
              Date : <Moment format="YYYY/MM/DD">{launch_date_local}</Moment>
            </p>
          </div>
          <div className="col-md-3">
            <Link
              to={`/launch-details/${flight_number}`}
              className="btn  btn-secondary"
            >
              Mission Details
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LaunchItem;
