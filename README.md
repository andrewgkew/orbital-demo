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
```
3. View this in Orbital by running the following query in Query Editor
```shell
import com.example.KafkaAccount
stream { KafkaAccount }
```
