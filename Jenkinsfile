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
                if exist "C:\\inetpub\\wwwroot\\myapp" (
                    rmdir /S /Q "C:\\inetpub\\wwwroot\\myapp"
                 )
                mkdir "C:\\inetpub\\wwwroot\\myapp"
                bat 'rmdir /S /Q "C:\\inetpub\\wwwroot\\myapp"'
                bat 'mkdir "C:\\inetpub\\wwwroot\\myapp"'
                bat 'xcopy /Y /E /I build "C:\\inetpub\\wwwroot\\myapp"'
            }
        }

        stage('Run Mabl Tests') {
            steps {
                echo 'Running Mabl tests...'
                bat 'npm install -g @mablhq/mabl-cli'
                bat 'mabl tests run --application-id=v8shDDOplBma19VTUWEkQA-a --environment-id=BbKahcHZaXCxvaDwV97Ugg-e --api-key=%MABL_API_KEY%'
            }
        }
    }
}
