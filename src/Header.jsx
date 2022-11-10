function Header(props) {
    let first2Li;
    if (props.login_name) {
        first2Li = <React.Fragment>
            <li><a className="text-white">Hello {props.login_name}</a></li>
            <li><a className="text-white" onClick={() => props.logout()}>Log out</a></li>
        </React.Fragment>
    }
    else {
        first2Li = <React.Fragment>
            <li><Link className="text-white" to="/register">New Students/Register</Link></li>
            <li><Link className="text-white" to="/login">Current Students/Login</Link></li>
        </React.Fragment>
    }
    return (
        <React.Fragment>
            <div className="collapse bg-light" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">Student Register Application </h4>
                            <p className="text-muted">Students can create a student profile, view, register, update and delete
                                information or profiles. The system allows students to specify the function he/she would like to
                                perform such as Add a student, Update a student, or Delete a student</p>
                        </div>
                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Menu</h4>
                            <ul className="list-unstyled">
                                {first2Li}
                                <li><Link to="/details" className="text-white">Current Student</Link></li>
                                <li><Link to="/about" className="text-white">About</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar navbar-light bg-light shadow-sm">
                <div className="container">
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        <img
                            src="data:image/png;base64,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" />
                        <strong>Student Register Application </strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
                        aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}