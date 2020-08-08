import React from "react";
import { BaseLayout, BaseContainer } from "../components/layouts";
import NavHeader from "../components/layouts/NavHeader";

class Index extends React.Component {
  render() {
    const { isAuthenticated, user, isAdmin } = this.props.auth;
    return (
      <BaseLayout mainClass="home">
        <BaseContainer>
          <NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
          {!isAuthenticated && (
            <div className="heading-primary--main">Projects!</div>
          )}
          {isAuthenticated && (
            <>
              <div className="heading-primary--main">Hi {user.name}!</div>
              <div className="heading-primary--main">
                You are in Projects!
              </div>
            </>
          )}
        </BaseContainer>
      </BaseLayout>
    );
  }
}

export default Index;
