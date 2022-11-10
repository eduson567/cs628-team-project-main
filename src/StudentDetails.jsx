const Navigate = ReactRouterDOM.Navigate;
class StudentDetails extends React.Component {
    constructor() {
        super();
        this.state = { redirect: undefined, obj: {}, student_id: '' };
    }

    componentDidMount() {
        if (this.state.student_id != this.props.student_id) {
            this.setState({ student_id: this.props.student_id });
            this.get_details(this.props.student_id).then(() => { });
        }
    }

    componentDidUpdate() {
        if (this.state.student_id != this.props.student_id) {
            this.setState({ student_id: this.props.student_id });
            this.get_details(this.props.student_id).then(() => { });
        }
    }

    get_details = async (student_id) => {
        var data = await this.props.student_details(student_id);
        if (data) {
            this.setState({ obj: data });
        }
    }

    save_details = async () => {
        const form = document.forms.studentDetailsForm;

        // student_id, first_name, last_name, data_of_birth, email, major
        await this.props.update_details(
            this.state.obj.login_id,
            form.firstName.value,
            form.lastName.value,
            form.dateOfBirth.value,
            form.email.value,
            form.major.value
        );

        await this.get_details(this.state.obj.login_id);
    }

    render() {
        console.log('details-props', this.props);
        if (!this.props.student_id) {
            return <Navigate push to='/' />
        }

        if (this.state.redirect) {
            return <Navigate push to={this.state.redirect} />
        }

        let details =
            <>
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Login Id</span>
                    <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="loginId" required readOnly defaultValue={this.state.obj.login_id ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">First Name</span>
                    <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="firstName" required defaultValue={this.state.obj.first_name ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Last Name</span>
                    <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="lastName" required defaultValue={this.state.obj.last_name ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Student Name</span>
                    <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="studentName" required readOnly defaultValue={this.state.obj.login_name ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                    <input type="email" className="form-control" aria-label="dateOfBirth" aria-describedby="inputGroup-sizing-lg" name="email" required defaultValue={this.state.obj.email ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Date of Birth</span>
                    <input type="date" className="form-control" aria-label="dateOfBirth" aria-describedby="inputGroup-sizing-lg" name="dateOfBirth" required defaultValue={this.state.obj.data_of_birth ?? ''} />
                </div>
                &nbsp;
                <div className="input-group input-group-lg">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Major</span>
                    <input type="text" className="form-control" aria-label="major" aria-describedby="inputGroup-sizing-lg" name="major" required defaultValue={this.state.obj.major ?? ''} />
                </div>
                &nbsp;
            </>

        const floatLeftStyle = {
            float: 'left'
        }
        return (
            <React.Fragment>
                <section className="py-5 text-center container">
                    <form name="studentDetailsForm">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <h2 style={floatLeftStyle}>Student Details: {this.state.obj.first_name} {this.state.obj.last_name}</h2>
                                {details}
                                &nbsp;
                                <div className="input-group input-group-lg">
                                    <button type="button" className="btn btn-primary mb-3" onClick={this.save_details}>Save</button>
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
            </React.Fragment >
        )
    }
}