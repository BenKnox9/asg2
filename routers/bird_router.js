const express = require('express');
var bird_controller = require('../controllers/bird_controller');
const Bird = require('../models/birdSchema');
const bodyParser = require('body-parser');
/* create a router (to export) */
const router = express.Router();
router.use(bodyParser.json());


/* route the default URL: `/birds/ */
router.get('/', async (request, response) => {
    // extract the query params
    const search = request.query.search;
    const status = request.query.status;
    const sort = request.query.sort;
    const birdData = await Bird.find({});
    response.render('home', {
        birds: bird_controller.filter_bird_data(search, status, sort, birdData)
    });
});


// TODO: finishe the "Create" route(s)
router.get('/create', (request, response) => {
    response.render('create');
});


router.post('/birds/create', async (request, response) => {
    console.log('router.post/create');
    const bird_document = {

        primary_name: request.body.primary_name,
        english_name: request.body.english_name,
        scientific_name: request.body.scientific_name,
        order: request.body.order,
        family: request.body.family,
        other_names: request.body.other_names,
        status: request.body.status,
        photo: {
            credit: request.body.credit,
            source: request.body.source,
        },
        size: {
            length: {
                value: request.body.lvalue,
                units: request.body.lunits,
            },
            weight: {
                value: request.body.wvalue,
                units: request.body.wunits,
            }
        }
    };

    const db_info = await Bird.create(bird_document);
    console.log(db_info, '/create response');
    response.send("success! created message");
});




// TODO: get individual bird route(s)
router.get('/:id/', async (request, response) => {
    const id = request.params.id;
    const birdsdb = await Bird.find({ _id: id });
    response.render('oneBird', {
        birds: birdsdb
    });

})
// TODO: Update bird route(s)

router.get('/:id/edit', async (request, response) => {
    const id = request.params.id;
    const theBird = await Bird.find({ _id: id });
    response.render('edit', {
        birds: theBird
    });
});

router.post('/:id/edit', async (request, response) => {
    const id = request.body.id;
    const thingy = { _id: request.body.id }
    console.log('router.post/edit');
    console.log("this is the science name" + request.body.scientific_name);
    const bird_document = {

        primary_name: request.body.primary_name,
        english_name: request.body.english_name,
        scientific_name: request.body.scientific_name,
        order: request.body.order,
        family: request.body.family,
        other_names: request.body.other_names,
        status: request.body.status,
        photo: {
            credit: request.body.credit,
            source: request.body.source,
        },
        size: {
            length: {
                value: request.body.lvalue,
                units: request.body.lunits,
            },
            weight: {
                value: request.body.wvalue,
                units: request.body.wunits,
            }
        }
    };

    const db_info = await Bird.updateOne(thingy, bird_document);
    console.log(db_info, '/edit response');
    response.status(200).redirect("/birds/");
})

// TODO: Delete bird route(s)

router.get('/:id/delete', async (request, response) => {
    console.log("I am the delete.");
    const id = request.params.id;
    await Bird.findOneAndRemove({ _id: id });
    response.status(200).redirect("/birds/");
})

module.exports = router;