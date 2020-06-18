const ControlMenu = (props) => {
	return (
		<div className="control-menu">
			<h1 className="title"> Write Your Story... </h1>
			<div className="status-box">
				{ props.isLoading? 'Saving...' : 'Saved' }
			</div>
			<button disabled={props.isLoading} onClick={props.save} color="success">Save</button>
		</div>
	)
}

export default ControlMenu;