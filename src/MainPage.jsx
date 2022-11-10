function MainPage(props) {
    const clipStyle = {
        clipPath: 'inset(65px 0px 0px 0px)'
    }
    const imageStyle2 = {
        paddingTop: "97px"
    }
    let welcomeTag;
    let loginRegisterButton;
    if (props.login_name) {
        welcomeTag = <h1 className="fw-light">Welcome <b><i>{props.login_name}</i></b> to City University of Seattle</h1>
        loginRegisterButton = <React.Fragment></React.Fragment>
    }
    else {
        welcomeTag = <h1 className="fw-light">City University of Seattle</h1>
        loginRegisterButton = <React.Fragment>
            <Link className="btn btn-primary my-2" to="/register">Register</Link>
            &nbsp;
            <Link className="btn btn-secondary my-2" to="/login">Login</Link>
        </React.Fragment>
    }

    return (
        <React.Fragment>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        {welcomeTag}
                        <p className="width: fit-content">CityU is truly a global community. Each year, the institution serves
                         over 500 international students at our Seattle campus who come to CityU to complete their bachelors 
                         degree or earn a graduate degree. We continue our mission of offering access to a high quality, 
                         relevant U.S.-style degree to those in other countries. 
                         There are now partnerships with institutions in Canada, China, the Czech Republic, Mexico, Slovakia,
                          and Vietnam. No matter which program students choose, they gain global perspectives from their
                           peers while expanding their professional expertise.</p>
                        <p>
                            {loginRegisterButton}
                        </p>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div className="card shadow-sm">
                                <div style={clipStyle}>
                                    <img src="/images/current_student.png" width="299px" height="299px"></img>
                                </div>
                                <div className="card-body">
                                    <h3>Current Student</h3>

                                    <p className="card-body">List of registered students. #CityUStudent</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to="/details" type="button" className="btn btn-sm btn-outline-secondary">View</Link>
                                            <Link to="/search" type="button" className="btn btn-sm btn-outline-secondary">Search</Link>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <div style={imageStyle2}>
                                    <img src="/images/student_regis.png" width="299px" height="202px"></img>
                                </div>
                                <div className="card-body">
                                    <h3>Student Registration</h3>
                                    <p className="card-text">Spring Registration is now available! Self-service registration opens for Summer Quarter May 1st,
                                        Fall Quarter August 1st, Winter Quarter November 1st, and Spring Quarter February 1st.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to="/" type="button" className="btn btn-sm btn-outline-secondary">View</Link>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <div>
                                    <img src="/images/about.png" width="299px" height="299px"></img>
                                </div>

                                <div className="card-body">
                                    <h3>About</h3>
                                    <p className="card-text">City University of Seattle is recognized as a Top 10
                                        educator of adults nationwide1 and ranked by US News and World Report as a
                                        best Online Bachelors program.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <Link to="/about" type="button" className="btn btn-sm btn-outline-secondary">View</Link>
                                        </div>
                                        <small className="text-muted">9 mins</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
