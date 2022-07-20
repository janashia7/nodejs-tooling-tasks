# Deploy

**Task :**
1. Deploy your Docker image from healtcheck task to target platform using cli commands.
2. Add deploy instruction including used cli command to Readme.md
3. Provide link to your running app.

# Deploy

**Task :**
1. Deploy your Docker image from healtcheck task to target platform using cli commands.
2. Add deploy instruction including used cli command to Readme.md
3. Provide link to your running app.

## Running app link
[Click here to see running app](http://ec2-18-192-100-251.eu-central-1.compute.amazonaws.com/random)

## Deploy instruction using docker cli and aws cli

**Step 1: Build the image from Dockerfile**

```sh
    docker build -t healthz .
```

**Step 2: Authenticate aws registry**

```sh
    aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 672300429544.dkr.ecr.eu-central-1.amazonaws.com
```

**Step 3: Tag the image to push repository**

```sh
    docker tag healthz:latest 672300429544.dkr.ecr.eu-central-1.amazonaws.com/healthz:latest
```

**Step 4: Push the image**
```sh
    docker push 672300429544.dkr.ecr.eu-central-1.amazonaws.com/healthz:latest
```

**Step 5: Deploy to aws**
create security group
```sh
    aws ec2 create-security-group --group-name healthcheck-security-group --description "HealthCheck Security Group"
    aws ec2 authorize-security-group-ingress --group-name healthcheck-security-group --protocol tcp --port 80 --cidr 0.0.0.0/0
    aws ec2 authorize-security-group-ingress --group-name healthcheck-security-group --protocol tcp --port 443 --cidr 0.0.0.0/0
```

create ec2 instance
```sh
    aws ec2 run-instances --image-id ami-0ed9277fb7eb570c9 --count 1 --instance-type t3.micro --security-groups healthcheck-security-group --iam-instance-profile Name=healthcheck-instance-profile --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=healthcheak}]' --user-data $'#!/bin/sh\nyum update -y\namazon-linux-extras install docker -y\nservice docker start\nusermod -a -G docker ec2-user\nchkconfig docker on\ndocker login -u AWS -p $(aws ecr get-login-password --region eu-central-1) 672300429544.dkr.ecr.eu-central-1.amazonaws.com\ndocker pull 672300429544.dkr.ecr.eu-central-1.amazonaws.com/healthz:latest\ndocker run -p 80:3000 --rm 672300429544.dkr.ecr.eu-central-1.amazonaws.com/healthz:latest'
```