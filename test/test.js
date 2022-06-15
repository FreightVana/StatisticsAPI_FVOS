/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../bin/www');
const {
	port,
	testToken,
	testDatabaseURL,
	testDatabaseURL2,
	testDatabaseURL3,
	testDatabaseURL4,
} = require('../src/config/config');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('API resource', function () {
	this.timeout(20000);
	before(function () {
		return runServer(
			[testDatabaseURL, testDatabaseURL2, testDatabaseURL3, testDatabaseURL4],
			port,
		);
	});
	after(function () {
		return closeServer();
	});
	describe('check env vars', function () {
		it('should have all listed env vars', function () {
			process.env.should.include.all.keys(
				'NODE_ENV',
				'NAME',
				'DATABASE_URL',
			);
		});
	});
	describe('getAllActivities', function () {
		it('should do something', function () {
			return chai.request(app)
				.get('/reporting/basic/activities?limit=10&skip=0')
				.set({ Authorization: `Bearer ${testToken}` })
				.then((res) => {
					res.should.have.status(200);
				});
		});
	});
	// describe('updateStuffs', function () {
	// 	it('should do something', function () {
	// 		return chai.request(app)
	// 		.get('/updateStuffs')
	// 			.set({ Authorization: `Bearer ${testToken}` })
	// 			.then((res) => {
	// 				console.log(res);
	// 				res.should.have.status(200);
	// 			});
	// 	});
	// });
});
