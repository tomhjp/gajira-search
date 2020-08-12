const fs = require('fs')
const YAML = require('yaml')
const core = require('@actions/core')

const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      argv: {jql: core.getInput('jql')},
      config,
    }).execute()

    if (result) {
      console.log(`Found issue: ${result.key}`)

      // Expose issue's key as an output
      core.setOutput("issue", result.key)
    } else {
      console.log('Did not find any issues.')
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

exec()
