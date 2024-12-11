pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "clinic-management-backend"
    }
    
    stages {
        stage('Build Docker Image') {
            steps {
                script {                    
                    // Build Docker image
                    sh '''
                        docker build -t $IMAGE_NAME:latest .
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Remove existing container if it exists
                    sh '''
                        docker rm -f clinic-management-backend-deployed || true
                    '''
                    
                    // Pull and run the latest version
                    sh '''
                        docker run -d --name clinic-management-backend-deployed -p 3000:3000 $IMAGE_NAME:latest
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup Docker credentials
            sh 'docker logout'
        }
    }
}