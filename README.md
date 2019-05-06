<h1 align="center">aws-actions-list</h1>

<h4 align="center">📄 A list of all documented AWS actions for IAM Policy Document 👤</h4>

<div align="center">
<img src="./docs/summary.gif">

<a href="https://www.npmjs.com/package/aws-actions-list"><img src="https://img.shields.io/npm/v/aws-actions-list.svg" alt="npm"></a>
<a href="https://circleci.com/gh/jagaapple/aws-actions-list"><img src="https://img.shields.io/circleci/project/github/jagaapple/aws-actions-list/master.svg" alt="CircleCI"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/github/license/jagaapple/aws-actions-list.svg" alt="license"></a>
<a href="https://twitter.com/jagaapple_tech"><img src="https://img.shields.io/badge/contact-%40jagaapple_tech-blue.svg" alt="@jagaapple_tech"></a>
</div>

## Table of Contents

<!-- TOC depthFrom:2 -->

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Requirements](#requirements)
  - [Installation](#installation)
- [Basic Command](#basic-command)
  - [`show`](#show)
    - [Extracting Columns](#extracting-columns)
    - [Output Format](#output-format)
- [Contributing to aws-actions-list](#contributing-to-aws-actions-list)
- [License](#license)

<!-- /TOC -->


## Features

| FEATURES                           | WHAT YOU CAN DO                                                                                                                     |
|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 🌏 **Fetches all policy actions** | Don't give up to write [`PolicyDocument`](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_action.html) |
| 📄 **Only documented actions**    | All actions are fetched from official online documents                                                                                              |
| 🔄 **Always up-to-date**          | Fetched actions are always up-to-date                                                                                                   |
| 💭 **Interactive Filtering**      | You can extract only actions you want                                                                                                     |


## Quick Start
### Requirements
- Node.js 8.0.0 or higher
- npm or Yarn


### Installation
```bash
$ npm install -g aws-actions-list
```

aws-actions-list is CLI program so recommend to install globally.

If you use Yarn, use the following command.

```bash
$ yarn global add aws-actions-list
```


## Basic Command
### `show`
```bash
$ aws-actions-list show
```

Gets all services and acitons and you can extract actions you want.

#### Extracting Columns
When you extract two or more columns, aws-actions-list outputs actions as object (hash/dictionary/set) in array.

```json
[
  {
    "name": "appsync:CreateApiKey",
    "description": "Creates a unique key that you can distribute to clients who are executing your API.",
    "documentURI": "https://docs.aws.amazon.com/appsync/latest/APIReference/API_CreateApiKey.html"
  },
  {
    "name": "appsync:CreateDataSource",
    "description": "Creates a DataSource object.",
    "documentURI": "https://docs.aws.amazon.com/appsync/latest/APIReference/API_CreateDataSource.html"
  }
]
```

When you extract one column, aws-actions-list outputs actions as string in array. `name` column is selected by default.

```json
[
  "appsync:CreateApiKey",
  "appsync:CreateDataSource"
]
```

#### Output Format
Currently aws-actions-list supports to output actions as JSON or YAML format.

```
? Select an output type (Use arrow keys)
❯ json
  yaml
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
