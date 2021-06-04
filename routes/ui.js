const express = require('express');
const { homeUI, loginUI, signupUI, newAgencyUI, about, contactUs, links } = require('../controllers/ui');
const { isLoggedIn, authorize, protect } = require('../middleware/auth');

const toursRouter = require('./tours');

const router = express.Router();

router.use('newtour/tours', toursRouter);

router.get('/', isLoggedIn, homeUI);
router.get('/about', about);
router.get('/links', links);
router.get('/contact', contactUs);
router.get('/login', isLoggedIn, loginUI);
router.get('/signup', isLoggedIn, signupUI);
router.get('/newagency', protect, authorize('organiser', 'admin'), newAgencyUI);

module.exports = router;
