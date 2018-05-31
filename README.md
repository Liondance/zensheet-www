# ZenSheet WWW

## Description

This repository contains the code of the current ZenSheet website (www.zensheet.com). This site will give access to users to the ZenSheet Portal (i.e: the web application to manage the models that are created with ZenSheet Studio). Its main purpose is to present the ZenSheet Stack to the public and to attract them to use our product.

## Required information to configure the environments

To establish communication with the Cognito web interface, this site's code must know three parameters. **Note**: They are different depending if you're going to perform a local or a cloud deployment. 

Please copy these three values as you will need them as environment variables for any of the deployment possibilities.

The first parameter that we need to look for is the **Client ID**, which identifies the ZenSheet Portal as a *client* (i.e: a web application that has credentials to communicate with the Cognito User's Database). 

You may find it on the [Cognito User Pool Console](https://console.aws.amazon.com/cognito/) **Note**: Remember to select the correct region to our User Pool:  
  1. Click on *Manage your User Pools*.
  2. Select your user Pool.
  3. Click on *General settings*.
  4. Click on *App clients*. 

**Note:** You will find on the User Pool (Cognito's management console) at least two clients. Choose the one that corresponds to the desired environment (Local or Cloud).

You will also need to know which is the **Callback URL**. This represents the link (of the ZenSheet Portal) where the user will be redirected after a successful authentication flow with Cognito. On the same Cognito console, look for the following:
  1. Click on *App integration*.
  2. Click on *App client settings*. 

Finally, you need to know which is the **Domain Name** of the Cognito Pool, you can find this information on the same console:
  1. Click on *App integration*. 
  2. Click on *Domain name*.
  
## Cloud Configuration 

### Instances Configuration  

This site has been deployed both on Heroku and Amazon Web Services. This section will explain how to perform the deployment using AWS Elastic Beanstalk (i.e: a 'wrapper' to ease the deployment/maintenance/scalability of web applications created by Amazon).

**Note:** these steps have already been performed but this documentation was made in case they are needed to be repeated. 

First, we need to create an Amazon Web Services Elastic BeanStalk application (i.e: a set of AWS Elastic Cloud Instances called environments) for *'ZenSheet WWW'*. 

We can do that by entering on the [Elastic BeanStalk Console](https://us-east-2.console.aws.amazon.com/elasticbeanstalk/) and following the steps that are available on the following [link](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications.html). For now, we will name our application as 'ZenSheet WWW'.

Now, inside the application we can define several environments. An environment is no more than an AWS Elastic Cloud Compute (EC2) Instance which runs Amazon Linux where our web application will be deployed. 

An environment can also be configured from the console with different additional resources such as a load balancer, more capacity, the number of instances, etc.  

We can define several environments for each application. For this case, we should have at least two environments (Development and Production). However, for the moment we just have the first one of those created.

To create an environment, you may follow these [instructions](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.environments.html). We will choose the following:
  * **Name:** Something such as 'Development'.
  * **Environment tier:** Web server environment.
  * **Domain:** something like 'zensheet', 'zensheet-site', 'zensheet-dev'.
  * **Platform:** Preconfigured - Node.js.
  * **Application code:** Sample application (we will replace this on the following section).

After creating the environment (this takes several minutes), open the link where your app is hosted and verify that is running.

We now need to configure the environment variables. To do this, from the your environment view do the following: 
  * Click on the 'Configuration' tab.
  * Click on *'Modify'* on the *'Software'* card.
  * Scroll until *'Environment properties'* and add the following *Name/Value* pairs:
    * COGNITO_APP_CLIENT_ID / The client id that you obtained from the cognito console.
    * COGNITO_APP_CLIENT_CALLBACK_URL / The callback url that you obtained from the same site.
    * COGNITO_DOMAIN / The domain name that you obtained from the same site.
  * Click on *'Apply'* and wait for the changes to be perfomed.

### Deployment from console

After creating and configuring the instances, we may do deployments from our local environment with simple console commands.

#### Installation 

There are several ways to perform a deployment of the code for an AWS Elastic Beanstalk (EB). This section describes how to perform deployments from a terminal like bash. This is easier that manually creating and uploading a .zip file on the AWS EB Console each time a change is made. 

To do this, you need to install the AWS EB command line interface. You will find instruction for this on the following [link](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html). 

#### Configuration

First, create the EBS configuration file to connect with the instance/ Run this command on the root folder of the repository. This file will create a configuration folder that will be ignored by Git.

```bash
	eb init
```

**Note**: The first time that you run this command you will need to provide your AWS developer credentials. You should receive these from the administrator of the AWS account. You need an account with access to use and manage the cloud resources.

This command will ask for several information. Select the corresponding AWS Region, the existant EB application and the environment (these were created on the previous section) where the code will be deployed each time. Say no to use 'AWS Code Commit'. 

That's all you need.

#### Deployments from the command line

If you want to deploy the last commit of the repository.
```bash
	eb deploy
```

If you want to deploy the files that are staged 
```bash
	eb deploy --staged
```

This command will connect with the AWS EB environment and will perform a new deployment. You should see the result of this on the command line.

For further information of the EB CLI you may visit this [link](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)

## Local Configuration

### Installation requirements (Local development)
- Node.js and npm 

### Install the required dependencies:
```bash 
	npm install
```
### Define the required environment variables: 

These three values must be added as environment variables of the host computer. On an Ubuntu environment, you may do this by editing the '.bashrc' file located on your home directory and adding the following lines: 

```bash 
	export COGNITO_APP_CLIENT_ID={The client id that you obtained from the cognito console}
	export COGNITO_APP_CLIENT_CALLBACK_URL={The callback url that you obtained from the same site}
	export COGNITO_DOMAIN={The domain name that you obtained from the same site}
```

After that, you will need to load these environment variables:

```bash
	source ~/.bashrc 
```

## Local Usage 

After installing the dependencies and defining the environment variables, you may run the site locally by running the following command. 

```bash
	npm run start:dev 
``` 

**Note**: This will use a library called 'nodemon' which will automatically restart the server after each file change. This is used to ease the development tasks.
