import React from 'react';

const BaseContainer = ({children}) => {
	return (
		<div className="base-container">
			<div className="base-grid">
				{children}
			</div>
		</div>
	)
}

export default BaseContainer;