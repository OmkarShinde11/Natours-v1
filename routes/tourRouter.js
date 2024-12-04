const express=require('express');
const tourRouter=express.Router();
const tourController=require('../controller/tourController');

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
 * /tours/{id}:
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
 *               name:
 *                 type: string
 *               duration:
 *                 type: number
 *               location:
 *                 type: string
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
tourRouter.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour)
module.exports=tourRouter;