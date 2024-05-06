//return all episodes
const handleAllEpisodes = (app, controller) => {
    app.get('/api/episodes', (req, resp) => {
        const data = controller.getAllEpisodes();
        resp.json(data);
    })
};

//return requested episode
const handleEpisode = (app, controller) => {
    app.get('/api/episodes/:episode', (req, resp) => {
        const data = controller.findByEpisode(req.params.episode);
        if(data) {
            resp.json(data);
        } else {
            resp.json(jsonMessage(`Episode ${req.params.episode} not found`));
        }
    })
};

//return all contestants
const handleAllContestants = (app, controller) => {
    app.get('/api/contestants', (req, resp) => {
        const data = controller.getAllContestants();
        resp.json(data);
    })
};

//return requested contestant
const handleContestant = (app, controller) => {
    app.get('/api/contestants/:contestant', (req, resp) => {
        const data = controller.findByContestant(req.params.contestant);
        if(data) {
            resp.json(data);
        } else {
            resp.json(jsonMessage(`Contestant ${req.params.contestant} not found`));
        }
    })
};

//THIS PROBABLY DOESNT WORK YOU FUCKING IDIOT
const handleUserEmail = (app, controller) => {
    app.get('/api/userEmail/:email', (req, resp) => {
        const data = controller.findByUserEmail(req.params.email);
        if(data) {
            resp.json(data);
        } else {
            resp.json(jsonMessage(`User ${req.params.email} not found`));
        }
    })
}

const handleAllUserRatings = (app, controller) => {
    app.get('api/user/ratings', (req, resp) => {
        const data = controller.getAllUserRatings();
        resp.json(data);
    })
}

const handleAllUserContestantRatings = (app, controller) => {
    app.get('api/user/ratings/contestants/:id'), (req, resp) => {
        console.log(req.params.id)
        const data = controller.getAllUserContestantRatings(req.params.id);
        if(data){
            resp.json(data)
        } else {
            resp.json(jsonMessage(`User ${req.params.id} not found`));
        }
    }
}

// const handleAllUserEpisodeRatings = (app, controller) => {
//     app.get('api/user/ratings/episodes/:id'), (req, resp) => {
//         const data = controller.getAllUserEpisodeRatings(req.params.id);
//         if(data){
//             resp.json(data)
//         } else {
//             resp.json(jsonMessage(`User ${req.params.id} not found`));
//         }
//     }
// }

// const handleNewUserRatings = (app, controller) => {
//     app.post('api/user/ratings/:id'), (req, resp) => {
//         console.log(req.params.id)
//         const data = controller.addNewUserRating(req.params.id);

//         if(data){
//             resp.json(data);
//         } else {
//             resp.json(jsonMessage(`Could not create ${req.params.id} ratings`));
//         }
//     }
// }

//error messages returned in JSON format
const jsonMessage = (msg) => {
    return{message: msg};
};

module.exports = {
    handleAllContestants, 
    handleAllEpisodes, 
    handleContestant, 
    handleEpisode,
    handleUserEmail
}