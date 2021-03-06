def getEnvName(branchName) {
	if ("dev".equals(branchName)){
		return "dev";
	} else if("staging".equals(branchName)) {
		return "staging";
	} else if ("master".equals(branchName)) {
		return "production";
	} else {
		return "anyOtherBranch"
	}
}

def getName(branchName) {
	if("dev".equals(branchName)) {
		return "dev_statistics_api";
	} else if("staging".equals(branchName)) {
		return "staging_statistics_api";
	} else if ("master".equals(branchName)) {
		return "statistics_api";
	}
}

def getPortNumber(branchName) {
	if("dev".equals(branchName)) {
		return 9076;
	} else if("staging".equals(branchName)) {
		return 7076;
	} else if ("master".equals(branchName)) {
		return 5076;
	}
}

pipeline {
	triggers {
		pollSCM('H/5 * * * *')
	}
	agent {
		label 'pacific'
	}
	options {
		timeout(time: 1, unit: 'HOURS')
		buildDiscarder(logRotator(daysToKeepStr: '0', numToKeepStr: '0'))
	}
	environment {
		NODE_ENV = getEnvName(env.BRANCH_NAME)
		NAME = getName(env.BRANCH_NAME)
		PORT = getPortNumber(env.BRANCH_NAME)
		HOME = '.'
		TEST_DATABASE_URL = credentials('DEV_DB_SRV')
		TEST_DATABASE_URL2 = credentials('DEV_DB_SRV')
		TEST_DATABASE_URL3 = credentials('DEV_DB_SRV')
		TEST_DATABASE_URL4 = credentials('DEV_DB_SRV')
		DATABASE_URL_DEV = credentials('DEV_DB_SRV')
		STAGING_DATABASE_URL = credentials('STAGING_DB_SRV')
		DATABASE_URL = credentials('PROD_DB_SRV')
		DATABASE_URL2 = credentials('PROD_DB_SRV')
		DATABASE_URL3 = credentials('PROD_DB_SRV')
		DATABASE_URL4 = credentials('PROD_DB_SRV')
		SOCKETS_URL_DEV = credentials('SOCKETS_URL_DEV')
		SOCKETS_URL_STAGING = credentials('SOCKETS_URL_STAGING')
		SOCKETS_URL = credentials('SOCKETS_URL')
		TEST_TOKEN = credentials('TEST_TOKEN')
	}
	stages {
		stage('Build and Test Staging/Prod') {
			when {
				expression {
					return NODE_ENV == 'staging' || NODE_ENV == 'production' ;
				}
			}
			agent {
				dockerfile {
					filename 'Dockerfile'
					additionalBuildArgs '-t ${NAME}'
					label 'pacific'
				}
			}
			steps {
				sh 'npm install'
				// sh 'npm test'
			}
		}
		stage('Build Dev') {
			when {
				expression {
					return NODE_ENV == 'dev';
				}
			}
			agent {
				dockerfile {
					filename 'Dockerfile'
					additionalBuildArgs '-t ${NAME}'
					label 'pacific'
				}
			}
			steps {
				sh 'npm install'
			}
		}
		stage('Prep') {
			when {
				expression {
					return NODE_ENV == 'dev' || NODE_ENV == 'staging' || NODE_ENV == 'production' ;
				}
			}
			steps {
				script {
					try {
						sh 'docker stop ${NAME}'
						sh 'docker rm ${NAME}'
					} catch(Exception e) {
						echo 'Exception occurred: ' + e.toString()
					}
				}
			}
		}
		stage('Deploy Dev') {
			when {
				expression {
					return NODE_ENV == 'dev';
				}
			}
			steps {
				sh '''
					docker run \
						-d \
						-p ${PORT}:3000 \
						--name ${NAME} \
						-e DATABASE_URL=${DATABASE_URL_DEV}/FVOS?appName=${NAME} \
						-e DATABASE_URL2=${DATABASE_URL_DEV}/Carriers?appName=${NAME} \
						-e DATABASE_URL3=${DATABASE_URL_DEV}/Contacts?appName=${NAME} \
						-e DATABASE_URL4=${DATABASE_URL_DEV}/Operations?appName=${NAME} \
						-e TEST_DATABASE_URL=${TEST_DATABASE_URL}/FVOS?appName=${NAME} \
						-e TEST_DATABASE_URL2=${TEST_DATABASE_URL2}/Carriers?appName=${NAME} \
						-e TEST_DATABASE_URL3=${TEST_DATABASE_URL3}/Contacts?appName=${NAME} \
						-e TEST_DATABASE_URL4=${TEST_DATABASE_URL4}/Operations?appName=${NAME} \
						-e SOCKETS_URL=${SOCKETS_URL_DEV} \
						-e NODE_ENV=${NODE_ENV} \
						-e NAME=${NAME} \
						-e TEST_TOKEN=${TEST_TOKEN} \
						${NAME}
				'''
			}
		}
		stage('Deploy Staging') {
			when {
				expression {
					return NODE_ENV == 'staging';
				}
			}
			steps {
				sh '''
					docker run \
						-d \
						-p ${PORT}:3000 \
						--name ${NAME} \
						-e DATABASE_URL=${STAGING_DATABASE_URL}/FVOS?appName=${NAME} \
						-e DATABASE_URL2=${STAGING_DATABASE_URL}/Carriers?appName=${NAME} \
						-e DATABASE_URL3=${STAGING_DATABASE_URL}/Contacts?appName=${NAME} \
						-e DATABASE_URL4=${STAGING_DATABASE_URL}/Operations?appName=${NAME} \
						-e TEST_DATABASE_URL=${TEST_DATABASE_URL}/FVOS?appName=${NAME} \
						-e TEST_DATABASE_URL2=${TEST_DATABASE_URL2}/Carriers?appName=${NAME} \
						-e TEST_DATABASE_URL3=${TEST_DATABASE_URL3}/Contacts?appName=${NAME} \
						-e TEST_DATABASE_URL4=${TEST_DATABASE_URL4}/Operations?appName=${NAME} \
						-e SOCKETS_URL=${SOCKETS_URL_STAGING} \
						-e NODE_ENV=${NODE_ENV} \
						-e NAME=${NAME} \
						-e TEST_TOKEN=${TEST_TOKEN} \
						${NAME}
				'''
			}
		}
		stage('Deploy Production') {
			when {
				expression {
					return NODE_ENV == 'production';
				}
			}
			steps {
				sh '''
					docker run \
						-d \
						-p ${PORT}:3000 \
						--name ${NAME} \
						-e DATABASE_URL=${DATABASE_URL}/FVOS?appName=${NAME} \
            			-e DATABASE_URL2=${DATABASE_URL2}/Carriers?appName=${NAME} \
						-e DATABASE_URL3=${DATABASE_URL3}/Contacts?appName=${NAME} \
						-e DATABASE_URL4=${DATABASE_URL4}/Operations?appName=${NAME} \
						-e TEST_DATABASE_URL=${TEST_DATABASE_URL}/FVOS?appName=${NAME} \
						-e TEST_DATABASE_URL2=${TEST_DATABASE_URL2}/Carriers?appName=${NAME} \
						-e TEST_DATABASE_URL3=${TEST_DATABASE_URL3}/Contacts?appName=${NAME} \
						-e TEST_DATABASE_URL4=${TEST_DATABASE_URL4}/Operations?appName=${NAME} \
						-e SOCKETS_URL=${SOCKETS_URL} \
						-e NODE_ENV=${NODE_ENV} \
						-e NAME=${NAME} \
						-e TEST_TOKEN=${TEST_TOKEN} \
						${NAME}
				'''
			}
		}
		stage('Cleanup') {
			when {
				expression {
					return NODE_ENV == 'dev' || NODE_ENV == 'staging' || NODE_ENV == 'production';
				}
			}
			steps {
				sh 'docker image prune -f'
			}
		}
	}
}