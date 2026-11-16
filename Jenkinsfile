pipeline {
    agent any

    environment {
        REGISTRO = 'us-east1-docker.pkg.dev/unisabana-devops-labs/shopnova'
        IMAGEN   = "${REGISTRO}/shopnova-api"
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                checkout scm
                script {
                    env.TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
                echo "Imagen a construir: ${IMAGEN}:${TAG}"
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build --pull -t "$IMAGEN:$TAG" .'
            }
        }

        stage('Escanear con Trivy') {
            steps {
                sh '''
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v trivy-cache:/root/.cache/ \
                      aquasec/trivy:0.58.1 image --severity HIGH,CRITICAL --ignore-unfixed "$IMAGEN:$TAG"

                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v trivy-cache:/root/.cache/ \
                      aquasec/trivy:0.58.1 image --severity CRITICAL --ignore-unfixed --exit-code 1 "$IMAGEN:$TAG"
                '''
            }
        }

        stage('Publicar en Artifact Registry') {
            steps {
                withCredentials([file(credentialsId: 'gcp-artifact-registry', variable: 'GCP_KEY')]) {
                    sh '''
                        cat "$GCP_KEY" | docker login -u _json_key --password-stdin https://us-east1-docker.pkg.dev
                        docker push "$IMAGEN:$TAG"
                        docker logout https://us-east1-docker.pkg.dev
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker rmi "$IMAGEN:$TAG" || true'
            deleteDir()
        }
        success {
            echo 'Pipeline terminado: imagen publicada'
        }
        failure {
            echo 'El pipeline falló'
        }
    }
}
