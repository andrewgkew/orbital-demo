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
