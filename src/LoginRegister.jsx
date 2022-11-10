const Navigate = ReactRouterDOM.Navigate;
class LoginRegister extends React.Component {
    constructor() {
        super();
    }

    on_register = async () => {
        const form = document.forms.loginRegisterForm;
        const student_name = form.studentName;
        const date_of_birth = form.dateOfBirth;
        const major = form.major;
        const login_name = form.loginName;
        const password = form.password;
        await this.props.register(login_name.value, password.value, student_name.value, date_of_birth.value, major.value);
    }

    on_login = async () => {
        const form = document.forms.loginRegisterForm;
        const login_name = form.loginName;
        const password = form.password;
        var logged_in = await this.props.login(login_name.value, password.value);
    }

    render() {
        let primaryButton;
        let registrationFields;
        
        if (this.props.login_name) {
            return <Navigate push to="/" />
        }

        if (this.props.page == "login") {
            primaryButton = <button type="button" className="btn btn-primary mb-3" onClick={this.on_login}>Login</button>
            registrationFields = <></>
        }
        else {
            primaryButton = <button type="button" className="btn btn-primary mb-3" onClick={this.on_register}>Register</button>
            registrationFields =
                <>
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Student Name</span>
                        <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="studentName" required />
                    </div>
                    &nbsp;
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Date of Birth</span>
                        <input type="date" className="form-control" aria-label="dateOfBirth" aria-describedby="inputGroup-sizing-lg" name="dateOfBirth" required />
                    </div>
                    &nbsp;
                    <div className="input-group input-group-lg">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Major</span>
                        <input type="text" className="form-control" aria-label="major" aria-describedby="inputGroup-sizing-lg" name="major" required />
                    </div>
                    &nbsp;
                </>
        }
        return (
            <React.Fragment>
                <section className="py-5 text-center container">
                    <form name="loginRegisterForm">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                {registrationFields}
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Login</span>
                                    <input type="text" className="form-control" aria-label="login" aria-describedby="inputGroup-sizing-lg" name="loginName" />
                                </div>
                                &nbsp;
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                                    <input type="password" className="form-control" aria-label="password" aria-describedby="inputGroup-sizing-lg" name="password" />
                                </div>
                                &nbsp;
                                <div className="input-group input-group-lg">
                                    {primaryButton}
                                    &nbsp;
                                    <Link className="btn btn-secondary mb-3" to="/">Back to Main</Link>
                                </div>

                            </div>
                        </div>
                    </form>
                </section>
                <div className="album py-5 bg-light">
                    <div className="container">
                    </div>
                </div>
            </React.Fragment>
        )
    }
}