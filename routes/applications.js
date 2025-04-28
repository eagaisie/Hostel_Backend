// routes/applications.js
const express = require('express');
const db      = require('../db');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const router  = express.Router();

// ─────────────────────────────────────────────────────────────
// Apply for a room
// Frontend should send { room_id }
// ─────────────────────────────────────────────────────────────
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { room_id, status, application_date} = req.body;

  try {
    const result = await db.query(
      `INSERT INTO applications (student_id, room_id, status, application_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, room_id, status, application_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// ─────────────────────────────────────────────────────────────
// Get current user's applications
// ─────────────────────────────────────────────────────────────
router.get('/my-applications', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const q = await db.query(
      `SELECT
         a.id,
         a.status,
         a.processed_by,
         a.processed_date,
         a.application_date,
         r.id   AS room_id,
         r.room_number,
         r.room_type,
         r.price
       FROM applications a
       LEFT JOIN rooms r ON r.id = a.room_id
       WHERE a.student_id = $1
       ORDER BY a.application_date DESC`,
      [userId]
    );
    res.json(q.rows);
  } catch (err) {
    console.error('Error fetching user applications:', err);
    res.status(500).json({ message: 'Failed to fetch your applications' });
  }
});

// ─────────────────────────────────────────────────────────────
// Admin: view all applications
// ─────────────────────────────────────────────────────────────
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const q = await db.query(
      `SELECT
         a.id,
         a.status,
         a.application_date,
         u.id   AS user_id,
         u.name AS name,
         u.email AS email,
         r.id   AS room_id,
         r.room_number,
         r.room_type,
         h.id   AS hostel_id,
         h.name AS hostel_name
       FROM applications a
       JOIN users    u ON u.id = a.student_id
       LEFT JOIN rooms   r ON r.id = a.room_id
       LEFT JOIN hostels h ON h.id = r.hostel_id
       ORDER BY a.application_date DESC`
    );
    res.json(q.rows);
  } catch (err) {
    console.error('Error fetching all applications:', err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// ─────────────────────────────────────────────────────────────
// Admin: update application status and/or assigned room
// Frontend should send { status, room_id }
// ─────────────────────────────────────────────────────────────
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { status, room_id } = req.body;
  const appId = req.params.id;
  try {
    const q = await db.query(
      `UPDATE applications
       SET status = $1,
           room_id = $2
       WHERE id = $3
       RETURNING *`,
      [status, room_id, appId]
    );
    res.json(q.rows[0]);
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ message: 'Failed to update application' });
  }
});

module.exports = router;