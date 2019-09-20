pipeline {
  agent {
    label 'equipo01'
  }
  environment {
    DOCKERHUB = credentials('jenkinsudc-dockerhub-account')
  }
  stages {
    stage('Kill everything') {
      steps {
        sh 'docker-compose down -v --remove-orphans || true'
        sh 'docker container kill $(docker ps -a -q) || true'
        sh 'docker rmi --force $(docker images -a -q) || true'
        sh 'docker system prune --volumes --force || true'
      }
    }
    stage('Build image') {
      post {
        success {
          sh 'docker login --username $DOCKERHUB_USR --password $DOCKERHUB_PSW'
          sh 'docker tag equipo01-frontend-angular:latest $DOCKERHUB_USR/equipo01-frontend-angular:latest'
          sh 'docker push $DOCKERHUB_USR/equipo01-frontend-angular:latest'
        }
        failure {
          sh 'docker system prune --volumes --force || true'
          sh 'docker rmi --force $(docker images -a -q) || true'
        }
      }
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Deploy') {
      post {
        failure {
          sh 'docker-compose down -v --remove-orphans || true'
          sh 'docker container kill $(docker ps -a -q) || true'
          sh 'docker rmi --force $(docker images -a -q) || true'
          sh 'docker system prune --volumes --force || true'
        }
      }
      steps {
        sh 'docker-compose up -d'
      }
    }
  }
}
