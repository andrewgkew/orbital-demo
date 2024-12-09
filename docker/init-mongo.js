db = db.getSiblingDB('admin');
db.auth('admin', 'password');

db = db.getSiblingDB('orbital');
db.createUser({
    user: 'orbital',
    pwd: 'orbital',
    roles: [
        {
            role: 'readWrite',
            db: 'orbital',
        },
    ],
});

db.createCollection('accounts');
db.createCollection('customers');
db.createCollection('parameters');

db.customers.insert([
    {"_id" : "1","title" : "Mr","firstname" : "John","surname" : "Doe"},
    {"_id" : "2","title" : "Mrs","firstname" : "Jane","surname" : "Doe"},
    {"_id" : "3","title" : "Dr","firstname" : "Theodor","surname" : "Seuss"},
    {"_id" : "4","title" : "Miss","firstname" : "Janie","surname" : "Doe"},
    {"_id" : "5","title" : "Mr","firstname" : "Richard","surname" : "Roe"},
]);

db.parameters.insert([
    {"_id" : "ACCOUNT.STATES","params" :[{"name":"business", "value":"OPEN"},{"name":"personal", "value":"VALID"}]}
]);
