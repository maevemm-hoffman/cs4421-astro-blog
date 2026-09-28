import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StaticSiteStack } from '../lib/cdk-stack';

test('creates S3 bucket and CloudFront distribution', () => {
  const app = new cdk.App();
  const stack = new StaticSiteStack(app, 'TestStaticSiteStack');

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  template.resourceCountIs('Custom::CDKBucketDeployment', 1);
});
