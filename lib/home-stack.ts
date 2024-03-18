import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class HomeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a DynamoDB table
    const table = new dynamodb.Table(this, 'MyTable', {
      partitionKey: { name: 'myPrimaryKey', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'mySortKey', type: dynamodb.AttributeType.NUMBER },
    });

    // Create an S3 bucket
    const bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
    });

    // Create a Lambda function
    const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('./lambda/'),
    });

    // Grant read/write permissions to the Lambda function for the DynamoDB table
    table.grantReadWriteData(lambdaFunction);

    // Grant read/write permissions to the Lambda function for the S3 bucket
    bucket.grantReadWrite(lambdaFunction);
  }
}