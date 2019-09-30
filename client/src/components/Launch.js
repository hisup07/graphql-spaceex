import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Spinner from "./Spinner";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
        rocket_id
        rocket_type
      }
    }
  }
`;

const Launch = ({ match }) => {
  let flight_number = parseInt(match.params.flight_number);

  return (
    <Fragment>
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          if (error) console.log(error);
          console.log(data.launch);
          const {
            launch_date_local,
            launch_success,

            mission_name,
            rocket: { rocket_id, rocket_name, rocket_type }
          } = data.launch;

          return (
            <div>
              <h4 className="my-2">
                <span className="text-primary"> Mission : </span>
                {"  "}
                {mission_name}
              </h4>
              <h3 className="mb-3">Launch Details</h3>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number : <span>{flight_number}</span>
                </li>
                <li className="list-group-item">
                  Date :{" "}
                  <Moment format="YYYY/MM/DD">{launch_date_local}</Moment>{" "}
                </li>
                <li className="list-group-item">
                  Launch Success :{" "}
                  <span
                    className={classNames({
                      "text-success": launch_success,
                      "text-danger": !launch_success
                    })}
                  >
                    {launch_success ? "YES" : "NO"}
                  </span>
                </li>
              </ul>
              <h4 className="my-3">Rocket Deatils</h4>
              <ul className="list-group">
                <li className="list-group-item">Rocket Id : {rocket_id}</li>
                <li className="list-group-item">Rocket Name : {rocket_name}</li>
                <li className="list-group-item">Rocket Type : {rocket_type}</li>
              </ul>
              <Link to="/" className="my-3 btn btn-primary">
                Back To All Launches
              </Link>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Launch;
