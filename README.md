# Orbital Example
This project is an example project that spins orbital up with some stub services to give you an example project

## Prerequisite
Below are the tools you need installed to use this project
1. Docker Desktop (or similar to run docker compose)

## Getting Started
To get started following the steps below

1. Checkout the repo to your local machine
```shell
git clone https://github.com/andrewgkew/orbital-demo.git
```
2. Navigate to the checked out repo
```shell
cd orbital-demo
```
3. Run the following command
```shell
docker compose up -d
```
4. Navigate to Orbital in UI `http://localhost:9022`

You should now see Orbital, have a demo taxi project with some models, services and types
and some data sources already connected

## Interacting with Stubbed Data Sources
### Add Kafka Message
One of the data source is kafka, you can add a message onto the topic with the steps below
1. Run the following command from your local machine. This command connects to the topic
on the current kafka stub container
```shell
docker exec -it $(docker ps -aqf "name=kafka_stub") kafka-console-producer.sh --broker-list kafkaStub:9092 --topic account
```
2. Put a message onto the topic
```shell
{"id":"1","type":"personal"}
{"id":"2","type":"business"}
```
3. View this in Orbital by running the following query in Query Editor
```shell
import com.example.KafkaAccount
stream { KafkaAccount }
```

### MongoDB
One of the other data source is MongoDB. By default when the mongo container comes up it inializes 
mongo with a new databases called `orbital` and a new collection called `accounts`. There is also
a username/password created set to `orbital/orbital`.

#### Init
There is an initialization script that is defined in the project and run once when Mongo comes up
which creates new `orbital` database, username and password and `accounts` collection. This is defined
it `docker/init-mongo.js`

#### Data
The data that is stored in Mongo from the new databases/collections and data within them
is stored on your host machine in a folder called `mongodb_data`. Because this is on the
host machine it will remain between container restarts if you want to refresh the database
then blow that folder away. Its ignored in version control so you wont commit it to the repo
```shell
rm -rf mongodb_data
```

#### Connecting to Mongo
If you want to connect directly to Mongo and check what data is in the database you can do so like this
1. Run the following command to connect onto mongo and use `mongosh` to connected to the database
```shell
docker exec -it $(docker ps -aqf "name=mongodbStub") mongosh orbital -u orbital -p
```
Enter the password of `orbital` and then you should see the following response
```shell
Enter password: *******
Current Mongosh Log ID:	674f243307afac0501f7c613
Connecting to:		mongodb://<credentials>@127.0.0.1:27017/orbital?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3
Using MongoDB:		8.0.3
Using Mongosh:		2.3.3

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/
orbital>
```
You are now connected to Mongo and can run standard Mongo commands
2. See all collections
```shell
orbital> show collections
accounts
```
3. Find all records in a collection `accounts`
```shell
orbital> db.accounts.find()
[
  {
    _id: '1',
    _inserted: ISODate('2024-12-02T17:49:11.639Z'),
    _topicPartitionOffset: 'account-0-6',
    _updated: ISODate('2024-12-02T17:49:11.639Z'),
    type: 'personal'
  },
  {
    _id: '2',
    _inserted: ISODate('2024-12-02T17:49:15.355Z'),
    _topicPartitionOffset: 'account-0-11',
    _updated: ISODate('2024-12-02T18:00:34.205Z'),
    type: 'business'
  },
  {
    _id: '3',
    _inserted: ISODate('2024-12-02T17:49:18.756Z'),
    _topicPartitionOffset: 'account-0-8',
    _updated: ISODate('2024-12-02T17:49:18.756Z'),
    type: 'personal'
  },
  {
    _id: '4',
    _inserted: ISODate('2024-12-02T17:52:14.160Z'),
    _topicPartitionOffset: 'account-0-10',
    _updated: ISODate('2024-12-02T17:52:14.160Z'),
    type: 'personal'
  }
]
```

## Endpoints
By default there are a few endpoints that have been define within Orbital
1. Stream
The stream endpoint is a named query that connects onto the Kafka topic and writes any message
that get sent to the topic into MongoDB collection. This stream looks as follows
```shell
query streamKafkaToMongo {
    stream { KafkaAccount }
    call com.example.MongoAccountService::upsertAccount
}
```
2. REST API
The REST API is a HTTP operation that is wrapped around getting data out of Mongo. This API looks
as follows
```shell
@taxi.http.HttpOperation(url = '/api/q/accounts', method = 'GET')
query getAllAccounts {
  find { Account[] }
}
```
To access this API you can use either a browser or cli tool like httpie
* Browser: `http://localhost:9022/api/q/accounts`
* Httpie: `http :9022/api/q/accounts`