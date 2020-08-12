const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
  }

  async execute () {
    const result = await this.Jira.findIssue(this.argv.jql)

    if (result.issues.length > 1) {
      console.error("jql query returned more than 1 result")
      console.error(result)
    } else if (result.issues.length == 0) {
      return
    }

    return { key: result.issues[0].key }
  }
}
