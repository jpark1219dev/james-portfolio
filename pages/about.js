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
            <> 
							<div className="heading-primary--main">Hi I'm James Park. I'm a Web Developer</div>
							<div className="heading-primary--sub">I live in Los Angeles, CA and work for Songtradr</div>
						</>
          )}
          {isAuthenticated && (
						<>
              <div className="heading-primary--main">Hi {user.name}!</div>
              <div className="heading-primary--main">You are in About!</div>
						</>
          )}
        </BaseContainer>
      </BaseLayout>
    );
  }
}

export default Index;
