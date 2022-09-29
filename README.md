# ui-oa

Copyright (C) 2021 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

The Open Access UI Module or ui-oa, is a Stripes UI module for the management of OA publication requests and related resources

## Prerequisites

In order to view and log into the platform being served up, a suitable Okapi backend will need to be running. The [Folio testing-backend](https://app.vagrantup.com/folio/boxes/testing-backend) Vagrant box should work if your app does not yet have its own backend module.

Additionally, until it is part of the Okapi backends, the [mod-oa](https://github.com/folio-org/mod-oa) module needs to be running.

## Running

Note that the following commands require that [`stripes-cli`](https://github.com/folio-org/stripes-cli) is installed globally.

Run the following from the ui-oa directory to serve `ui-oa` by itself using a development server:
```
stripes serve
```

Note: When serving up a newly created app that does not have its own backend permissions established, pass the `--hasAllPerms` option to display the app in the UI navigation. For example:
```
stripes serve --hasAllPerms
```

To specify your own tenant ID or to use an Okapi instance other than http://localhost:9130, pass the `--okapi` and `--tenant` options.
```
stripes serve --okapi http://my-okapi.example.com:9130 --tenant my-tenant-id
```

## Additional information

Read the [Stripes Module Developer's Guide](https://github.com/folio-org/stripes/blob/master/doc/dev-guide.md).

Other [modules](https://dev.folio.org/source-code/#client-side).

See project [UIOA](https://issues.folio.org/browse/UIOA)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)

