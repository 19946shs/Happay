const inquirer = require('inquirer')
const rdl = require('readline')
const std = process.stdout

const showDecisionPrompt = (prompt) => {
    inquirer.prompt([
        {
          type: 'rawlist',
          name: 'decision',
          message: 'Continue?',
          choices: ['Yes', 'No'],
        },
      ])
      .then(decision => {
        if(decision.decision === 'Yes') prompt()
        else {
            process.stdout.write('\033c')
            process.exit(1);
        }
        // showDecisionPrompt()
    });
}

const showSpinnerOrNot = (show) => {
  process.stdout.write('\x1B[?25l')
  const spinners = ['-', '\\', '|', '/']
  let index = 0

  const interval = setInterval(() => {
    let line = spinners[index]
    if (line === undefined) {
      index = 0
      line = spinners[index]
    }

    std.write(line)
    rdl.cursorTo(std, 0, 0)

    index = index >= spinners.length ? 0 : index + 1
  }, 100)

  if(!show) clearInterval(interval)
}

module.exports = showDecisionPrompt
// module.exports = showSpinnerOrNot