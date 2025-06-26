#!/bin/bash

echo "🧪 TESTING PIPELINE COMMANDS"
echo "================================"

# Test 1: Check if AWS CLI works
echo "📋 Test 1: AWS CLI Authentication"
if aws sts get-caller-identity --profile pessoal >/dev/null 2>&1; then
    echo "✅ AWS CLI authenticated successfully"
    aws sts get-caller-identity --profile pessoal --query 'Account' --output text
else
    echo "❌ AWS CLI authentication failed"
    exit 1
fi

echo ""

# Test 2: Check EC2 instance status
echo "📋 Test 2: EC2 Instance Status"
INSTANCE_STATE=$(aws ec2 describe-instances \
    --instance-ids "i-065af4b8413a074dd" \
    --profile pessoal \
    --query 'Reservations[0].Instances[0].State.Name' \
    --output text 2>/dev/null)

if [ "$INSTANCE_STATE" = "running" ]; then
    echo "✅ EC2 instance is running"
else
    echo "❌ EC2 instance is not running (State: $INSTANCE_STATE)"
fi

echo ""

# Test 3: Check SSM connectivity
echo "📋 Test 3: SSM Agent Status"
SSM_STATUS=$(aws ssm describe-instance-information \
    --filters "Key=InstanceIds,Values=i-065af4b8413a074dd" \
    --profile pessoal \
    --query 'InstanceInformationList[0].PingStatus' \
    --output text 2>/dev/null)

if [ "$SSM_STATUS" = "Online" ]; then
    echo "✅ SSM Agent is online"
else
    echo "⚠️  SSM Agent status: $SSM_STATUS"
    echo "   This might cause pipeline failures"
fi

echo ""

# Test 4: Simulate the deployment commands (dry run)
echo "📋 Test 4: Deployment Commands (Simulation)"
echo "Commands that will be executed on EC2:"
echo ""
echo "# Stop existing containers"
echo "sudo docker stop engineer-lab || true"
echo "sudo docker rm engineer-lab || true"
echo "sudo docker rmi engineer-lab:latest || true"
echo ""
echo "# Clone/pull latest code"
echo "cd /home/ec2-user"
echo "if [ -d \"engineer-lab\" ]; then"
echo "  cd engineer-lab && git pull"
echo "else"
echo "  git clone https://github.com/rennanribas/engineer-lab.git engineer-lab"
echo "  cd engineer-lab"
echo "fi"
echo ""
echo "# Build new image"
echo "sudo docker build -t engineer-lab:latest ."
echo ""
echo "# Start containers"
echo "sudo docker network create web || true"
echo "sudo docker run -d --name engineer-lab --network web -p 3001:80 engineer-lab:latest"
echo ""

# Test 5: Check repository accessibility
echo "📋 Test 5: Repository Accessibility"
if curl -s -o /dev/null -w "%{http_code}" "https://github.com/rennanribas/engineer-lab" | grep -q "200"; then
    echo "✅ engineer-lab repository is accessible"
else
    echo "❌ engineer-lab repository might not be accessible"
fi

if curl -s -o /dev/null -w "%{http_code}" "https://github.com/rennanribas/rennan-tech-landing" | grep -q "200"; then
    echo "✅ rennan-tech-landing repository is accessible"
else
    echo "❌ rennan-tech-landing repository might not be accessible"
fi

echo ""
echo "🎯 PIPELINE TEST SUMMARY"
echo "================================"
echo "✅ Items that look good will likely work in pipeline"
echo "❌ Items with issues need attention before deployment"
echo "⚠️  Items with warnings might work but could be unstable"
echo ""
echo "💡 TIP: If SSM Agent is not online, the pipeline will fail"
echo "   You might need to wait a few minutes after EC2 restart" 