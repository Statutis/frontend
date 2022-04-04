const ProgressBar = function (props) {
    return <div className={"progress " + props.className ?? ''}>
        <div className="progress-bar" style={{width: (props.progress ?? 0) + "%"}}/>
    </div>
}

export default ProgressBar;