pipeline {
    agent any

    environment {
        MABL_API_KEY = credentials('mabl-api-key')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                bat 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to C:\\inetpub\\wwwroot\\myapp...'
                bat """
                if exist "C:\\inetpub\\wwwroot\\myapp" (
                rmdir /S /Q "C:\\inetpub\\wwwroot\\myapp"
                )
                mkdir "C:\\inetpub\\wwwroot\\myapp"
                echo Dummy deploy file > "C:\\inetpub\\wwwroot\\myapp\\index.html"
                """
            }
        }

        stage('Run Mabl Tests') {
            steps {
                echo 'Running Mabl tests...'
                bat '''
                npm install -g @mablhq/mabl-cli
                set PATH=%APPDATA%\\npm;%PATH%
                mabl tests run --application-id=v8shDDOplBma19VTUWEkQA-a --environment-id=BbKahcHZaXCxvaDwV97Ugg-e --api-key=%MABL_API_KEY%
                '''
            }
        }

    }
}
