import React from "react";
import { BaseLayout, BaseContainer, NavHeader } from "../components/layouts";

class Index extends React.Component {
  render() {
    const { isAuthenticated, user, isAdmin } = this.props.auth;
    return (
      <BaseLayout mainClass="home">
        <BaseContainer>
          <NavHeader isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
          {!isAuthenticated && (
            <div className="heading-primary--main">Hello World! I'm James!</div>
          )}
          {isAuthenticated && (
            <div className="heading-primary--main">Hi {user.name}!</div>
          )}
        </BaseContainer>
      </BaseLayout>
    );
  }
}

export default Index;
