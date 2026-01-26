#!/bin/bash
source "$(dirname "$0")/.env"
ssh -i ${EC2_SSH_KEY} ${EC2_USER}@${EC2_HOST}