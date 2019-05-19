import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { ReactAuthProvider } from '@cognite/react-auth';
import { Route, Redirect, Switch } from 'react-router-dom'
import Model from "./Model"

const revisionUrl = `models/:modelId/revisions/:revisionId`;
const Login = ({ tenant, match }) => (
  <ReactAuthProvider 
    project={tenant}
    redirectUrl={window.location.href}
    errorRedirectUrl={window.location.href}
    usePopup
    enableTokenCaching
  >
    <Switch>
      {/* <Route exact path={`${match.url}/${revisionUrl}/comments/:nodeId`} component={Model} /> */}
      <Redirect exact strict from={`${match.url}/${revisionUrl}/`} to={`${match.url}/${revisionUrl}`} />
      <Route path={`${match.url}/models/:modelId/revisions/:revisionId`} component={Model} />
    </Switch>
   </ReactAuthProvider>
)
Login.propTypes = {
  tenant:  PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = (_, ownProps) => {
  const { tenant } = ownProps.match.params;
  return { tenant }
}

export default connect(mapStateToProps)(Login);
