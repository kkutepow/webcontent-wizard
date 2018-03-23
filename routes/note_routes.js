var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.collection('todos').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    // get all todos
    app.get('/api/todos', function (req, res) {
        db.collection('todos').find(function (err, cursor) {
            console.log("try to find any todos...");
            if (err)
                res.send(err);

            cursor.toArray().then((todos) => res.json(todos)); // return all todos in JSON format);
        });
    });

    // create to-do and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        const todo = req.body;
        db.collection('todos').insert(todo, (err, result) => {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            db.collection('todos').find(function (err, cursor) {
                console.log("try to find any todos...")
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                cursor.toArray().then((todos) => res.json(todos)); // return all todos in JSON format);

            });
        });
    });

// delete a to-do
    app.delete('/api/todos/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('todos').remove(details, (err, cursor) => {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            db.collection('todos').find(function (err, cursor) {
                console.log("try to find any todos...")
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                cursor.toArray().then((todos) => res.json(todos)); // return all todos in JSON format);

            });
        });
    });

// application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};