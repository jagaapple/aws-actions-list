<h1 align="center">aws-actions-list</h1>
<h4 align="center">📄 A list of all documented AWS actions for IAM Policy Document 📄</h4>

```bash
$ aws-actions-list --service s3
[
  {
    "name": "s3:AbortMultipartUpload",
    "description": "Aborts a multipart upload.",
    "documentURI": "https://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadAbort.html"
  },
  {
    "name": "s3:CreateBucket",
    "description": "Creates a new bucket.",
    "documentURI": "https://docs.aws.amazon.com/AmazonS3/latest/API/RESTBucketPUT.html"
  },
  ...

$ aws-actions-list --service s3 --only name --style plain
s3:AbortMultipartUpload
s3:CreateBucket
...
```

<div align="center">
<a href="https://www.npmjs.com/package/aws-actions-list"><img src="https://img.shields.io/npm/v/aws-actions-list.svg" alt="npm"></a>
<a href="https://circleci.com/gh/jagaapple/aws-actions-list"><img src="https://img.shields.io/circleci/project/github/jagaapple/aws-actions-list/master.svg" alt="circleci"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/aws-actions-list.svg" alt="license"></a>
<a href="https://twitter.com/jagaapple_tech"><img src="https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg" alt="@jagaapple_tech"></a>
</div>

<h4 align="center">⚠️ THIS IS EXPERIMENTAL NOW ⚠️</h4>
<div align="center"><i>This is written about aws-actions-list features, but they may be not implemented yet.</i></div>

## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Installation](#installation)
- [Basic Command](#basic-command)
- [Contributing to aws-actions-list](#contributing-to-aws-actions-list)
- [License](#license)

<!-- /TOC -->


## Features

<h4 align="center">⚠️ THIS IS EXPERIMENTAL NOW ⚠️</h4>

| FEATURES                           | WHAT YOU CAN DO                                                                                                                     |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 📄 **Fetching all policy actions** | Don't give up to write [`PolicyDocument`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html) |
| 🌏 **Only documented actions**     | Fetches from official online documents                                                                                              |
| 🔄 **Always up-to-date**           | Deprecated names are not included                                                                                                   |
| ✨ **No dependencies**             | You don't need install anything                                                                                                     |


## Quick Start
### Installation
TODO


## Basic Command
```bash
```


## Contributing to aws-actions-list
Bug reports and pull requests are welcome on GitHub at
[https://github.com/jagaapple/aws-actions-list](https://github.com/jagaapple/aws-actions-list).
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.

Please read [Contributing Guidelines](./.github/CONTRIBUTING.md) before development and contributing.


## License
The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Copyright 2019 Jaga Apple. All rights reserved.
