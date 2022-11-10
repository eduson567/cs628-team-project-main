const Navigate = ReactRouterDOM.Navigate;
class StudentSearch extends React.Component {
    constructor() {
        super();
        this.state = { redirect: undefined, search_results: [], edit_id: undefined };
    }

    componentDidMount() {
        let w_loc = window.location.href.split('/');
        let q = w_loc[w_loc.length - 1];
        if (!q.includes('search')) {
            this.setState({ edit_id: q });
        }
    }

    get_details = async (student_id) => {
        var data = await this.props.student_details(student_id);
        this.setState({ obj: data });
    }

    search = async () => {
        const form = document.forms.studentSearchForm;
        var searchResults = await this.props.search(form.searchField.value);
        this.setState({ search_results: searchResults });
    }

    set_edit_user = async (edit_id) => {
        this.setState({edit_id: edit_id});
    }

    render() {
        console.log('render-state-', this.state);
        if (this.state.redirect) {
            return <Navigate push to={this.state.redirect} />
        }
        
        var edit_comp = <></>

        if (this.state.edit_id) {
            edit_comp = <StudentDetails student_details={this.props.student_details} update_details={this.props.update_details} login_name={this.props.login_name} student_id={this.state.edit_id} />
        }

        let details =
            <>
                <div className="input-group input-group-lg">
                    <input type="text" className="form-control" aria-label="name" aria-describedby="inputGroup-sizing-lg" name="searchField" required />
                </div>
                &nbsp;
            </>

        const floatLeftStyle = {
            float: 'left'
        }
        var results = this.state.search_results.map(x => <li key={x.login_id}> <a href="#" style={floatLeftStyle} onClick={() => this.set_edit_user(x.login_id)} >{x.login_name}</a></li>)
        return (
            <React.Fragment>
                <section className="py-5 text-center container">
                    <form name="studentSearchForm">
                        <div className="row py-lg-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <h2 style={floatLeftStyle}>Search:</h2>
                                {details}
                                &nbsp;
                                <div className="input-group input-group-lg">
                                    <button type="button" className="btn btn-primary mb-3" onClick={this.search}>Search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <ul>
                                {results}
                            </ul>
                        </div>
                    </div>
                </section>
                {edit_comp}
                <div className="album py-5 bg-light">
                    <div className="container">
                    </div>
                </div>
            </React.Fragment >
        )
    }
}