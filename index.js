const app = require('express')();
const request = require('request');

app.all('/', (req, res) => {
  // Check if required parameters are provided
  if (!req.query.api_key || !req.query.project) {
    res.status(500).send('Missing one or both required parameters: "api_key" and "project"');
    return;
  }

  // Get all Codeship builds for this project
  request.get(`https://codeship.com/api/v1/projects/${req.query.project}.json?api_key=${req.query.api_key}`, function (error, response, body) {
    if (error) {
      res.status(500).send(error);
    } else {
      const data = JSON.parse(body);

      // Find the latest build for the master branch
      const build = data.builds.find(b => b.branch === 'master');

      if (!build) {
        res.status(500).send('No build from master branch found.');
      } else {
        // Restart the build on Codeship
        request.post(`https://codeship.com/api/v1/builds/${build.id}/restart.json?api_key=${req.query.api_key}`, function(error, response, body) {
          res.send(JSON.parse(body));
        });
      }
    }
  });

});
app.listen(3333);
