// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as Home from '../lib/home-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/home-stack.ts
// test('SQS Queue Created', () => {
// //   const app = new cdk.App();
// //     // WHEN
// //   const stack = new Home.HomeStack(app, 'MyTestStack');
// //     // THEN
// //   const template = Template.fromStack(stack);

// //   template.hasResourceProperties('AWS::SQS::Queue', {
// //     VisibilityTimeout: 300
// //   });
// });

import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { HomeStack } from '../lib/home-stack';

describe('HomeStack', () => {
  test('Stack contains a DynamoDB table', () => {
    const app = new cdk.App();
    const stack = new HomeStack(app, 'TestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DynamoDB::Table', {
      KeySchema: [
        { AttributeName: 'myPrimaryKey', KeyType: 'HASH' },
        { AttributeName: 'mySortKey', KeyType: 'RANGE' },
      ],
    });
  });

  test('Stack contains an S3 bucket with versioning enabled', () => {
    const app = new cdk.App();
    const stack = new HomeStack(app, 'TestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      VersioningConfiguration: {
        Status: 'Enabled',
      },
    });
  });

  test('Stack contains a Lambda function', () => {
    const app = new cdk.App();
    const stack = new HomeStack(app, 'TestStack');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
      Runtime: 'nodejs18.x',
    });
  });
});