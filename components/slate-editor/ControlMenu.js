const ControlMenu = (props) => {
	return (
		<div className="control-menu">
			<div className="heading-primary--main mb-sm"> Create Blog </div>
			<button className={`btn-primary mb-sm`} disabled={props.isLoading} onClick={props.save} color="success">Save</button>
			<div className="heading-primary--sub">
				{ props.isLoading? 'Saving...' : 'Saved' }
			</div>
		</div>
	)
}

export default ControlMenu;