const ControlMenu = ({ mode, save, isLoading }) => {
  const title = mode === "create" ? "Create Blog" : "Update Blog";
  return (
    <div className="control-menu">
      <div className="heading-primary--main mb-sm">{title}</div>
      <button
        className={`btn-primary mb-sm`}
        disabled={isLoading}
        onClick={save}
        color="success"
      >
        Save
      </button>
      <div className="heading-primary--sub">
        {isLoading ? "Saving..." : "Saved"}
      </div>
    </div>
  );
};

export default ControlMenu;
