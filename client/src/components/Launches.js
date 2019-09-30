import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Spinner from "./Spinner";
import Launchitem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <h4 className="my-3">Launches</h4>
        </div>
        <MissionKey />
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner />;
            }
            if (error) console.error(error);

            return (
              <Fragment>
                {data.launches.map(launch => (
                  <Launchitem key={launch.flight_number} launch={launch} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
export default Launches;
