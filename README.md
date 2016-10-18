# restart-latest-codeship-build

We built this little service because we wanted to set up a Webhook on [Contentful] that triggers a restart of the latest build of a project on [Codeship] whenever new content is published. Unfortunately Codeship only provides an API to trigger a  build for which you must know the *build_id* upfront. In order to get the ID of the latest build, one must first request the [details of the project], find the ID of the latest build on the master branch, and then [restart the build] using that ID. But that requires two requests and a bit of code and thus cannot be expressed with a single URL that you can use as a Webhook. Well, now you can.


## Usage

Send a POST request to

```
https://restart-latest-codeship-build.automat.io/:codeship_api_key/:codeship_project_id
```

Get the value for `:codeship_api_key` from your [account settings page] and the `:codeshop_project_id` from the URL of the projects page (e.g. https://app.codeship.com/projects/<em>:codeship_project_id</em>)


## Feedback? Questions?

Please use [GitHub issues].

[Contentful]: https://www.contentful.com/
[Codeship]: https://www.codeship.com/
[details of the project]: https://documentation.codeship.com/integrations/api/#get-a-single-project
[restart the build]: https://documentation.codeship.com/integrations/api/#restart-a-single-build
[account settings]: https://app.codeship.com/user/edit
[GitHub issues]: https://github.com/acolorbright/restart-latest-codeship-build/issues
