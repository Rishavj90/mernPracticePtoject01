const express = require('express');
const router = express.Router();
const {
    handleGetRequest,
    handlePutRequest,
    handleDelRequest,
    newUserPost,
    showAllData
} = require('../controllers/user')

router.get("/users", showAllData)
router.post("/new_user", newUserPost)


router.route('/:id')
    .get(handleGetRequest)
    .put(handlePutRequest)
    .delete(handleDelRequest);



module.exports = {
    router
}
