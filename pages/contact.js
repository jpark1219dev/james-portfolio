import React from "react";
import withAuth from '../components/hoc/withAuth';
import { BaseLayout, BaseContainer } from "../components/layouts";
import NavHeader from "../components/layouts/NavHeader";

class Contact extends React.Component {
  render() {
    const { isAuthenticated, user, isAdmin } = this.props.auth;
    return (
      <BaseLayout mainClass="home">
        <BaseContainer>
          <NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
          {!isAuthenticated && (
            <div className="heading-primary--main">Contact me at jpark1219dev@gmail.com</div>
          )}
          {isAuthenticated && (
            <>
              <div className="heading-primary--main">Hi {user.name}!</div>
              <div className="heading-primary--main">You are in Contact!</div>
            </>
          )}
        </BaseContainer>
      </BaseLayout>
    );
  }
}

export default Contact;
