#!/usr/bin/env node
// @ts-ignore - source-map-support provides no TypeScript declarations in this setup
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib/core';
import { VpcCdkProjectStack } from '../lib/vpc-cdk-project-stack';
import { EC2Stack } from '../bin/ec2-stack';

const app = new cdk.App();
const vpcStack = new VpcCdkProjectStack(app, 'VpcCdkProjectStack', {});

new EC2Stack(app, 'EC2Stack', {
  vpc: vpcStack.vpc,  
});

app.synth();