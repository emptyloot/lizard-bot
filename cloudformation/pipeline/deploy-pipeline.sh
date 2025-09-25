#!/bin/bash

# Deploy Pipeline Infrastructure for Lizard Bot
# Run from project root directory

set -e  # Exit on any error

# Configuration
PROJECT_NAME="lizardbot"
STACK_NAME="${PROJECT_NAME}-pipeline"
REGION="us-east-1"  # Change to your preferred region
PARAMETERS_FILE="pipeline-parameters.json"
TEMPLATE_FILE="pipeline-infrastructure.yaml"

echo "🚀 Deploying Pipeline Infrastructure for ${PROJECT_NAME}..."
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
    --capabilities CAPABILITY_IAM \
    --region ${REGION} \
    --tags \
        Project=${PROJECT_NAME} \
        Environment=pipeline \
        Purpose=ci-cd-infrastructure

if [ $? -eq 0 ]; then
    echo "✅ Pipeline infrastructure deployment successful!"
    
    echo ""
    echo "📋 Stack Outputs:"
    aws cloudformation describe-stacks \
        --stack-name ${STACK_NAME} \
        --region ${REGION} \
        --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' \
        --output table
        
    echo ""
    echo "🎯 Next Steps:"
    echo "1. ⚠️  IMPORTANT: Complete GitHub Connection Setup"
    echo "   - Go to AWS Console → CodePipeline → Settings → Connections"
    echo "   - Find the pending connection and click 'Update pending connection'"
    echo "   - Authorize GitHub access in the popup"
    echo ""
    echo "2. Create environment-specific CloudFormation templates:"
    echo "   - cloudformation/environments/staging.yaml"
    echo "   - cloudformation/environments/production.yaml"
    echo ""
    echo "3. Push your code to GitHub ${GITHUB_BRANCH} branch"
    echo "4. Watch the pipeline execute automatically!"
    echo ""
    echo "🔍 Monitor your pipeline at:"
    echo "https://console.aws.amazon.com/codesuite/codepipeline/pipelines/${PROJECT_NAME}-pipeline/view"
    
else
    echo "❌ Deployment failed!"
    exit 1
fi