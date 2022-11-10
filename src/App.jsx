const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Routes = ReactRouterDOM.Routes;
const Outlet = ReactRouterDOM.Outlet;
const useParams = ReactRouterDOM.useParams;
const useNavigate = ReactRouterDOM.useNavigate;

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body);
        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                console.log(error.extensions);
                const details = error.extensions.exception.errors.join('/n');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}
class About extends React.Component{
    render(){
        return <section className="py-5 text-center container">
            <div className="row py-lg-5">
            <h2>Welcome to City University of Seattle</h2>
            <div className="col-lg-6 col-md-8 mx-auto">
                <p className="width: fit-content">At CityU, we strive to change our students lives for good by offering high-quality and relevant lifelong education. 
                Our vision is educational access worldwide through a network of partners and programs offered on-site and online. At CityU, we value:</p>
                <p>
                <ul class="list-group">
                    <li class="list-group-item">Flexibility — Design and deliver programs and services to be convenient to students</li>
                    <li class="list-group-item">Accessibility — Provide educational opportunities to anyone, anywhere</li>
                    <li class="list-group-item">Innovation — Continually create new educational opportunities</li>
                    <li class="list-group-item">Relevance — What we teach today can be applied tomorrow</li>
                    <li class="list-group-item">Global — Act local but think global</li>
                </ul>
                </p>
            </div>
        </div>
    </section>;
    }
}
class MainBody extends React.Component {
    constructor() {
        super();
        this.state = { student_id: "", login_name: "", is_login: false, is_register: false }
    }

    componentWillMount() {
        cookieStore.get('login_name').then(function (d) {
            if (d) {
                this.setState({ login_name: d.value });
            }
        }.bind(this));

        cookieStore.get('student_id').then(function (d) {
            if (d) {
                this.setState({ student_id: d.value });
            }
        }.bind(this));
    }

    tryLogin = async (login_name, password) => {
        const query = `
        query Query($loginName: String!, $password: String!) {
            login(login_name: $loginName, password: $password)
          }`

        const data = await graphQLFetch(query, { loginName: login_name, password: password });
        console.log(data);
        if (data && data.login) {
            this.setState({ student_id: data.login, login_name: login_name });
            await cookieStore.set('student_id', data.login);
            await cookieStore.set('login_name', login_name);
            this.setMain();
            return true;
        }
        return false;
    }


    tryRegister = async (login_name, password, student_name, date_of_birth, major) => {
        const query = `mutation Register($loginName: String!, $password: String!, $studentName: String!, $dateOfBirth: String!, $major: String!) {
            register(login_name: $loginName, password: $password, student_name: $studentName, date_of_birth: $dateOfBirth, major: $major)
          }`;

        const data = await graphQLFetch(query, { loginName: login_name, password: password, studentName: student_name, dateOfBirth: date_of_birth, major: major });
        console.log(data);
        if (data && data.register) {
            this.setState({ student_id: data.register, login_name: login_name });
            this.setMain();
            return true;
        }
        return false;
    }

    tryGetDetails = async (student_id) => {
        const query = `
        query Student_profile($loginId: String!) {
            student_profile(login_id: $loginId) {
              login_id
              login_name
              student_name
              first_name
              last_name
              data_of_birth
              email
              major
            }
          }
        `
        const data = await graphQLFetch(query, { loginId: student_id });
        console.log(data);
        if (data && data.student_profile) {
            return data.student_profile;
        }
        return undefined;
    }

    tryUpdateDetails = async (student_id, first_name, last_name, data_of_birth, email, major) => {
        const query = `
        mutation Mutation($updateDetailsLoginId2: String!, $firstName: String!, $lastName: String!, $dataOfBirth: String!, $email: String!, $major: String!) {
            update_details(login_id: $updateDetailsLoginId2, first_name: $firstName, last_name: $lastName, data_of_birth: $dataOfBirth, email: $email, major: $major)
          }
        `;
        const data = await graphQLFetch(query, { updateDetailsLoginId2: student_id, firstName: first_name, lastName: last_name, dataOfBirth: data_of_birth, email: email, major: major });
        return data;
    }

    trySearch = async (name) => {
        const query = `
        query Search($name: String!) {
            search(name: $name) {
              login_id
              login_name
            }
          }
        `;
        const data = await graphQLFetch(query, { name: name });
        return data.search;
    }

    setLoginPage = () => {
        this.setState({ is_login: true });
    }

    setRegisterPage = () => {
        this.setState({ is_register: true });
    }

    setMain = () => {
        this.setState({ is_login: false, is_register: false });
    };

    logout = () => {
        this.setState({ student_id: '', login_name: '' })
        cookieStore.delete('student_id');
        cookieStore.delete('login_name');
    }
    render() {
        return (
            <Router>
                <React.Fragment>
                    <header id="header_content">
                        <Header setLogin={this.setLoginPage} setRegister={this.setRegisterPage} setMain={this.setMain} setAbout={this.setAbout} logout={this.logout} login_name={this.state.login_name} />
                    </header>
                    <main id="contents">
                        <Routes>
                            <Route path="/" element={<MainPage setLogin={this.setLoginPage} setRegister={this.setRegisterPage} login_name={this.state.login_name} />} />
                            <Route exact path="/login" element={<LoginRegister page="login" login={this.tryLogin} login_name={this.state.login_name} />} />
                            <Route path="/about" element={<About />} />
                            <Route exact path="/register" element={<LoginRegister page="register" register={this.tryRegister} login_name={this.state.login_name} />} />
                            <Route exact path="/details" element={<StudentDetails student_details={this.tryGetDetails} update_details={this.tryUpdateDetails} login_name={this.state.login_name} student_id={this.state.student_id} />} />
                            <Route exact path="/search/*" element={<StudentSearch search={this.trySearch} student_details={this.tryGetDetails} update_details={this.tryUpdateDetails} login_name={this.state.login_name} student_id={this.state.student_id} />}/>
                        </Routes>
                    </main>
                </React.Fragment>
            </Router>
        )
    }
}


const body = <MainBody />
ReactDOM.render(body, document.getElementById('body'));