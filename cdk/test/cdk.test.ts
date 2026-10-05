import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StaticSiteStack } from '../lib/cdk-stack';

test('creates S3 bucket and CloudFront distribution', () => {
  const app = new cdk.App();
  const stack = new StaticSiteStack(app, 'TestStaticSiteStack');

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
  template.resourceCountIs('AWS::CloudFront::Distribution', 1);
  template.resourceCountIs('AWS::CloudFront::Function', 1);
  template.resourceCountIs('Custom::CDKBucketDeployment', 1);

  const distribution = Object.values(template.findResources('AWS::CloudFront::Distribution'))[0];
  expect(distribution.Properties.DistributionConfig.DefaultCacheBehavior.FunctionAssociations).toHaveLength(1);

  const rewriteFunction = Object.values(template.findResources('AWS::CloudFront::Function'))[0];
  expect(rewriteFunction.Properties.FunctionCode).toContain("request.uri = uri + '/index.html'");
});
