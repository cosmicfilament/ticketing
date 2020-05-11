import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>Your are signed in.</h1>
	) : (
		<h1>You are not signed in.</h1>
	);
};
// lets the client get initial data from the next js server
// during the server side rendering process
LandingPage.getInitialProps = async context => {
	console.log('LANDING PAGE');
	const client = buildClient(context);
	const { data } = await client.get('/api/users/currentuser');
	return data;
};

export default LandingPage;
