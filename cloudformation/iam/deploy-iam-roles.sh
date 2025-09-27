#!/bin/bash

# Deploy IAM Roles for Lizard Bot CI/CD Pipeline
# Run from project root directory

set -e  # Exit on any error

# Configuration
PROJECT_NAME="lizardbot"
STACK_NAME="${PROJECT_NAME}-iam-roles"
REGION="us-east-1"  # Change to your preferred region
PARAMETERS_FILE="iam-roles-parameters.json"
TEMPLATE_FILE="iam-roles.yaml"

echo "🚀 Deploying IAM Roles for ${PROJECT_NAME}..."
echo "Stack Name: ${STACK_NAME}"
echo "Region: ${REGION}"

# Validate template
echo "📋 Validating CloudFormation template..."
aws cloudformation validate-template \
    --template-body file://${TEMPLATE_FILE} \
    --region ${REGION}

if [ $? -eq 0 ]; then
    echo "✅ Template validation successful"
else 
    echo "❌ Template validation failed"
    exit 1
fi

# Deploy/Update stack
echo "🔧 Deploying CloudFormation stack..."

# Check if stack exists
if aws cloudformation describe-stacks --stack-name ${STACK_NAME} --region ${REGION} >/dev/null 2>&1; then
    echo "📦 Stack exists, updating..."
    OPERATION="UPDATE"
else
    echo "🆕 Creating new stack..."
    OPERATION="CREATE"
fi

aws cloudformation deploy \
    --template-file ${TEMPLATE_FILE} \
    --stack-name ${STACK_NAME} \
    --parameter-overrides file://${PARAMETERS_FILE} \
    --capabilities CAPABILITY_NAMED_IAM \
    --region ${REGION} \
    --tags \
        Project=${PROJECT_NAME} \
        Environment=shared \
        Purpose=iam-roles

if [ $? -eq 0 ]; then
    echo "✅ IAM Roles deployment successful!"
    
    echo ""
    echo "📋 Stack Outputs:"
    aws cloudformation describe-stacks \
        --stack-name ${STACK_NAME} \
        --region ${REGION} \
        --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
        --output table
        
    echo ""
    echo "🎯 Next Steps:"
    echo "1. Update iam-roles-parameters.json with your GitHub info"
    echo "2. Create S3 artifacts bucket"
    echo "3. Store GitHub token in Secrets Manager"
    echo "4. Deploy CodePipeline infrastructure"
    
else
    echo "❌ Deployment failed!"
    exit 1
fi