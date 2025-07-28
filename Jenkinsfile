pipeline {
    agent any

    tools {
        maven 'Maven 3.9.11'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "🔨 Build en cours..."
                dir('Ecommerce-Backend') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Test') {
            steps {
                echo "✅ Tests en cours..."
                // bat 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Déploiement (optionnel)"
            }
        }
    }
}
