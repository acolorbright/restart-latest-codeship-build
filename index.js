const app = require('express')();
const request = require('request');

app.get('*', (req, res) => {
  res.send(`<!doctype html><title>Restart latest Codeship build</title><code><p><strong>USAGE</strong><br>curl -X POST https://${req.headers.host}/<mark>:codeship_api_key</mark>/<mark>:codeship_project_id</mark>/<mark>:branch</mark></p></code>`);
});

app.post('/:api_key/:project_id/:branch', (req, res) => {
  // Get all Codeship builds for this project
  request.get(`https://codeship.com/api/v1/projects/${req.params.project_id}.json?api_key=${req.params.api_key}`, (buildsError, _, buildsBody) => {
    if (buildsError) {
      res.status(500).send(buildsError);
    } else {
      const data = JSON.parse(buildsBody);

      // Find the latest build for the given branch (defaults to `master`)
      const branch = req.params.branch || 'master';
      const build = data.builds.find(b => b.branch === branch);

      if (!build) {
        res.status(500).send(`No build from ${branch} branch found.`);
      } else {
        // Restart the build on Codeship
        request.post(`https://codeship.com/api/v1/builds/${build.id}/restart.json?api_key=${req.params.api_key}`, (buildError, __, buildBody) => {
          if (buildError) {
            res.status(500).send(buildError);
          } else {
            res.send(JSON.parse(buildBody));
          }
        });
      }
    }
  });
});

app.listen(3333);
