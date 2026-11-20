import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import 'source-map-support/register';

export class VpcCdkProjectStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
        {
          name: 'Database',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });

    new cdk.CfnOutput(this, 'VpcId', {
      value: this.vpc.vpcId,
      description: 'VPC ID',
    });
  }
}

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: { vpc: ec2.Vpc } & cdk.StackProps) {
    super(scope, id, props);
  }
}

export class RDSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: { vpc: ec2.Vpc } & cdk.StackProps) {
    super(scope, id, props);
  }
}

const app = new cdk.App();

const vpcStack = new VpcCdkProjectStack(app, 'VpcCdkProjectStack');

new EC2Stack(app, 'EC2Stack', {
  vpc: vpcStack.vpc,
});

new RDSStack(app, 'RDSStack', {
  vpc: vpcStack.vpc,
});

app.synth();



