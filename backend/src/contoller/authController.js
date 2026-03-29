const User = require('../models/user');
const bcrypt = require('bcryptjs'); //hash password
const jwt = require('jsonwebtoken'); //generate token

// Register a new user: validate input -> hash password -> save user
const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body || {};
		const normalizedEmail = (email || '').trim().toLowerCase();

		if (!name || !normalizedEmail || !password) {
			return res.status(400).json({ message: 'Name, email and password are required' });
		}

		const existingUser = await User.findOne({ email: normalizedEmail });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Callback style hashing flow:
		// 1) create salt, 2) hash password with that salt, 3) store hash (not plain password)
		bcrypt.genSalt(10, (saltErr, salt) => {
			if (saltErr) {
				return res.status(500).json({ message: 'Error generating salt' });
			}

			bcrypt.hash(password, salt, async (hashErr, hash) => {
				if (hashErr) {
					return res.status(500).json({ message: 'Error hashing password' });
				}

				try {
					const payload = {
						name,
						email: normalizedEmail,
						password: hash
					};

					if (role) {
						payload.role = role;
					}

					const user = await User.create(payload);

					res.status(201).json({
						message: 'User registered successfully',
						user: {
							id: user._id,
							name: user.name,
							email: user.email,
							role: user.role
						}
					});
				} catch (dbErr) {
					console.error('Register DB error:', dbErr);
					res.status(500).json({ message: dbErr.message || 'Error creating user' });
				}
			});
		});
	} catch (error) {
		console.error('Register catch error:', error);
		res.status(500).json({ message: error.message || 'Server error during registration' });
	}
};

// Login user: verify email -> compare password hash -> return signed JWT token
const login = async (req, res) => {
	try {
		const { email, password } = req.body || {};
		const normalizedEmail = (email || '').trim().toLowerCase();

		if (!normalizedEmail || !password) {
			return res.status(400).json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email: normalizedEmail });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// compare() hashes the input password internally and checks it with stored hash
		bcrypt.compare(password, user.password, (compareErr, isMatch) => {
			if (compareErr) {
				return res.status(500).json({ message: 'Error checking password' });
			}

			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}

			// JWT payload contains user id + role. Client uses token for protected routes.
			const token = jwt.sign(
				{ id: user._id, role: user.role },
				process.env.JWT_SECRET || 'secretkey',
				{ expiresIn: '1d' }
			);

			res.status(200).json({
				message: 'Login successful',
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role
				}
			});
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error during login' });
	}
};

module.exports = {
	register,
	login
};

