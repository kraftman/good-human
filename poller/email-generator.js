
const { v4 } = require('uuid');


const dayInSeconds = 60*60*24

const top = `
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Bad Human</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body>
`
const bottom = `
</body>
</html>`

const genEmail = async () => {
  
  const email = {
    id: v4(),
    secret: v4(),
    expiresAt: Math.floor(((new Date() / 1000) - dayInSeconds)),
  }
  return email;
  // write id and secret to redis with expiry;
}

const genEmailBody = async (people, emailData) => {
  const items = people.map(person => {
    const base =  `http://soshul.dev/email/${emailData.id}/`;
    const qp = `id=${person.id}&secret=${emailData.secret}`;
    // add duration strings
    // seen in person (this week/this month)
    // spoken online (this week/this month)
    // sleep for X
    return `<a href=${base + qp}>${person.name}</a>`;
  })
  return items
}

const generateEmail = async (people) => {
  const emailData = await genEmail();
  const emailBody = await genEmailBody(people, emailData);
  const full = top + emailBody.concat('<br>') + bottom
  return full
}

module.exports = {
  generateEmail
}