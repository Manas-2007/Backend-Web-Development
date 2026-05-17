const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware config
app.use(express.json());
app.use(cors()); 

let homes = [];

// ==================== 1. CREATE (ADD HOME) ====================
app.post('/home-data', (req, res) => {
    const newHome = {
        id: Date.now(), 
        ...req.body
    };
    homes.push(newHome);
    res.json({
        success: true,
        message: "Home added to list successfully!",
        addedHome: newHome
    });
});

// ==================== 2. READ (GET ALL HOMES) ====================
app.get('/home-data', (req, res) => {
    res.json(homes);
});

// ==================== 3. DELETE (REMOVE HOME) ====================
app.delete('/home-data/:id', (req, res) => {
    const homeId = Number(req.params.id);
    homes = homes.filter(home => home.id !== homeId);
    res.json({
        success: true,
        message: "Home deleted from backend array!"
    });
});

// ==================== 4. UPDATE (EDIT HOME) ====================
app.put('/home-data/:id', (req, res) => {
    const homeId = Number(req.params.id);
    const updatedData = req.body;
    const homeIndex = homes.findIndex(home => home.id === homeId);

    if (homeIndex !== -1) {
        homes[homeIndex] = {
            id: homeId, 
            ...updatedData
        };

        res.json({
            success: true,
            message: "Home updated on backend successfully!"
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Home not found!"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Server is running live at http://localhost:${PORT}`);
});