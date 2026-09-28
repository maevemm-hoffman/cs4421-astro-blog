#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticSiteStack } from '../lib/cdk-stack';

const app = new cdk.App();
new StaticSiteStack(app, 'StaticSiteStack', {
  env: { account: '951603962608', region: 'us-east-1' },
});
