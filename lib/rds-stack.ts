import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';


interface RDSStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class RDSstack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);

    // Create an RDS instance within the provided VPC
    const database = new rds.DatabaseInstance(this, 'Database', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      multiAz: false,
      allocatedStorage: 20,
      databaseName: 'mydb',
      storageEncrypted: true,
    });

    cdk.Tags.of(database).add('Name', 'MyRDSInstance');
    cdk.Tags.of(database).add('Environment', 'Production');

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: database.dbInstanceEndpointAddress,
      description: 'RDS Database Endpoint',
    });

  }
}