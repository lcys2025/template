import express from "express";
const router = express.Router();

// Store recognized users (in production, use a database)
const recognizedUsers = {
    'chan_tai_man': { password: '1234', fullName: 'Chan Tai Man' },
    'john_doe': { password: 'password123', fullName: 'John Doe' },
    'jane_smith': { password: 'secret456', fullName: 'Jane Smith' }
};

// GET route for the face recognition page
router.get("/", (req, res) => {
    res.render("face");
});

// POST route for face recognition login
router.post("/login", (req, res) => {
    const { username, confidence } = req.body;
    
    console.log(`Face recognition attempt for: ${username}, confidence: ${confidence}`);
    
    // Validate the user exists
    if (!recognizedUsers[username]) {
        return res.json({
            success: false,
            message: 'User not recognized in system'
        });
    }
    
    // Validate confidence level (adjust threshold as needed)
    if (confidence < 0.5) {
        return res.json({
            success: false,
            message: 'Recognition confidence too low'
        });
    }
    
    // Successful recognition - create session or JWT
    req.session.user = {
        username: username,
        fullName: recognizedUsers[username].fullName,
        loginMethod: 'face'
    };
    
    // Or if using JWT:
    // const token = generateJWT({ username, fullName: recognizedUsers[username].fullName });
    
    console.log(`Successful face login for: ${username}`);
    
    res.json({
        success: true,
        message: 'Face recognition successful',
        user: {
            username: username,
            fullName: recognizedUsers[username].fullName
        }
    });
});

export default router;
