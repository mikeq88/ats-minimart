import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container">
            <div className="col-md-12, text-center">
                <h1 className="display-1">
                    404
                </h1>
                <p>
                    Page Not Found!
                </p>

                <Link to="/" className="btn btn-link">
                    Back to Admin Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;