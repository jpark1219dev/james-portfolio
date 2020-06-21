import React from 'react';

const Panel = ({width, children}) => {
	return (
		<div className={`panel-${width}`}>
			{children}
		</div>
	)
}

export default Panel