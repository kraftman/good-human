const Influx = require('influx')
const influx = new Influx.InfluxDB({
  host: 'influx',
  database: 'fb_events',
  schema: [
    {
      measurement: 'messages',
      tags: [
        'user_id', 
        'timestamp',
        'author'
      ],
      fields: {
        raw: Influx.FieldType.STRING,
      }
    }
  ]
})

// add subscriber:
//CREATE SUBSCRIPTION "sub0" ON "mydb"."autogen" DESTINATIONS ALL 'http://example.com:9090'


const init = async () => {
  const names = await influx.getDatabaseNames();
  if (!names.includes('fb_events')) {
    await influx.createDatabase('fb_events');
  }
}

const faToInflux = (event) => {
  console.log('sender: ', event.senderID);
  const newEvent = {
    measurement: 'messages',
    fields: {
      raw: JSON.stringify(event)
    },
    tags: {
      author: event.senderID,
      timestamp: event.timestamp,
    },
  }
  return newEvent
}

const writeEvents = async (events) => {
  const influxEvents = events.map(faToInflux)
  await influx.writePoints(influxEvents)  
}

module.exports = {
  init,
  writeEvents,
}