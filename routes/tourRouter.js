const express=require('express');
const tourRouter=express.Router();
const tourController=require('../controller/tourController');


/**
 * @swagger
 * /api/v1/tour/top-5-budget-tour:
 *   get:
 *     summary: Get the top 5 budget tours
 *     description: Returns the top 5 tours sorted by price and ratings average. Only `name`, `price`, and `ratingsAverage` fields are included in the response.
 *     tags:
 *       - Tours
 *     parameters:
 *       - in: query
 *         name: sort
 *         description: Sorting criteria for the tours (set automatically to '-price,ratingsAverage').
 *         schema:
 *           type: string
 *           example: -price,ratingsAverage
 *       - in: query
 *         name: limit
 *         description: Number of records to return (set automatically to 5).
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: fields
 *         description: Comma-separated list of fields to include in the response (set automatically to 'name,price,ratingsAverage').
 *         schema:
 *           type: string
 *           example: name,price,ratingsAverage
 *     responses:
 *       200:
 *         description: A successful response with the top 5 budget tours.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 result:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Budget Tour 1
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 299.99
 *                       ratingsAverage:
 *                         type: number
 *                         format: float
 *                         example: 4.8
 *       400:
 *         description: Bad request or server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Fail
 *                 message:
 *                   type: string
 *                   example: Some error message
 */

tourRouter.route('/top-5-budget-tour').get(tourController.getTopTours,tourController.getTours);
/**
 * @swagger
 * /api/v1/tour/tourStats:
 *   get:
 *     summary: Get tour statistics
 *     description: Retrieve aggregated tour statistics for tours with a `ratingsAverage` greater than 4.5.
 *     tags:
 *       - Tours
 *     responses:
 *       201:
 *         description: Successfully retrieved aggregated tour statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       _id: null
 *                       ratingsAverage: 4.8
 *                       count: 10
 *       400:
 *         description: Bad request or failure during aggregation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Fail
 *                 message:
 *                   type: string
 *                   example: Some error message
 */
tourRouter.route('/tourStats').get(tourController.tourStats);

/**
 * @swagger
 * /api/v1/tour/monthly-plan/{year}:
 *   get:
 *     summary: Get a monthly tour plan
 *     description: Retrieve the monthly tour plan for a specific year, including the total number of tours for each month.
 *     tags:
 *       - Tours
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         description: The year for which to retrieve the monthly tour plan.
 *         schema:
 *           type: integer
 *           example: 2024
 *     responses:
 *       200:
 *         description: Successfully retrieved the monthly tour plan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: integer
 *                         example: 1
 *                       numTours:
 *                         type: integer
 *                         example: 5
 *                       tours:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "The Forest Hiker"
 *       400:
 *         description: Invalid year parameter or request failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Fail
 *                 message:
 *                   type: string
 *                   example: Invalid year provided
 */

tourRouter.route('/monthly-plan/:year').get(tourController.monthlyPlan);

/**
 * @swagger
 * /api/v1/tour:
 *   get:
 *     summary: Retrieve a list of tours
 *     responses:
 *       200:
 *         description: A list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Create a new tour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               duration:
 *                 type: number
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tour created successfully
 */
tourRouter.route('/').get(tourController.getTours).post(tourController.createTour);

/**
 * @swagger
 * /api/v1/tour/{id}:
 *   get:
 *     summary: Get a single tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tour ID
 *     responses:
 *       200:
 *         description: A single tour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *   patch:
 *     summary: Update a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tour ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tour updated successfully
 *   delete:
 *     summary: Delete a tour by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tour ID
 *     responses:
 *       204:
 *         description: Tour deleted successfully
 */
tourRouter.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);
module.exports=tourRouter;