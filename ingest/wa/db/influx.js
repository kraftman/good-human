const Influx = require('influx')
const influx = new Influx.InfluxDB({
  host: 'influx',
  database: 'wa_events',
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
  if (!names.includes('express_response_db')) {
    await influx.createDatabase('wa_events');
  }
}

const waToInflux = (event) => {
  const newEvent = {
    measurement: 'messages',
    fields: {
      raw: JSON.stringify(event)
    },
    tags: {
      author: event.id.id,
    },
  }
  return newEvent
}

const writeEvents = async (events) => {
  const influxEvents = events.map(waToInflux)
  await influx.writePoints(influxEvents)  
}

module.exports = {
  init,
  writeEvents,
}