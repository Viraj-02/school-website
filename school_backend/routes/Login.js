// Backend: server.js
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 5000;

// Connect to MySQL database
const sequelize = new Sequelize('user_registration', 'root', 'Viraj@123', {
    host: 'localhost',
    dialect: 'mysql'
});




// // Define User model  for register  
// const Users = sequelize.define('Users', {
//     firstName: {
//         type: DataTypes.STRING
//     },
//     lastName: {
//         type: DataTypes.STRING
//     },
//     email: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//         allowNull: false, // Ensure email is not null
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING
//     }
// }, {
//     timestamps: false // Disable timestamps
// });
// // Create a route for user registration
// app.post('/api/login', async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;
//         const newUsers = await Users.create({ firstName, lastName, email, password });
//         console.log('User login successfully:', newUsers);
//         res.json(newUsers);
//     } catch (err) {
//         console.error('Error login user:', err);
//         res.status(500).json({ error: 'Error login user' });
//     }
// });







// Define User model
// const User = sequelize.define('User', {
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {

//     timestamps: false // Disable timestamps

// });

// // Create a route for user login
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({
//             where: { email },
//             attributes: ['email', 'password'] // Specify the columns you want to retrieve
//         });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
//         const match = await bcrypt.compare(password, user.password);
//         if (match) {
//             return res.status(200).json({ message: 'Login successful' });
//         } else {
//             return res.status(400).json({ message: 'Wrong password' });
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });






// Sync model with database
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.use(cors());
app.use(express.json());







// contact us 
const Contactus = sequelize.define('contact', {
    name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure email is not null
    },
    message: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false // Disable timestamps
});



app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body; // Use lowercase property names
        const newContact = await Contactus.create({ name, email, message });
        console.log('Message successfully sent:', newContact);
        res.json(newContact);
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: 'Error sending message' });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// student information form 
const StudentInfo = sequelize.define('studentinfo', {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    rollNumber: {
        type: DataTypes.INTEGER, // Define rollNumber as INTEGER type
        allowNull: false
    },
    whatsappNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parentsMobileNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parentsJob: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

// Route for handling student information form submission
app.post('/api/studentinfo', async (req, res) => {
    try {
        const { firstName, lastName, rollNumber, address, whatsappNumber, parentsMobileNumber, parentsJob, email, password } = req.body;

        // Validate input data
        if (!firstName || !lastName || !rollNumber || !address || !whatsappNumber || !parentsMobileNumber || !parentsJob || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if rollNumber is a valid integer
        if (!Number.isInteger(rollNumber)) {
            return res.status(400).json({ error: 'Invalid roll number' });
        }

        // Create student record in the database
        const studentInfo = await Studentregister.create({
            firstName, lastName, rollNumber, address, whatsappNumber, parentsMobileNumber, parentsJob, email, password
        });

        console.log('Student information saved:', studentInfo);
        res.json(studentInfo);
    } catch (err) {
        console.error('Error saving student information:', err);
        res.status(500).json({ error: 'Error saving student information' });
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define Student model
const Student = sequelize.define('studentinfo', {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    }, email: {
        type: DataTypes.STRING
    }, passwrd: {
        type: DataTypes.STRING
    },

    rollNumber: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure email is not null
    },
    whatsappNumber: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure email is not null
    },
    parentsMobileNumber: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ensure email is not null
    },

    parentsJob: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false // Disable timestamps
});




app.get('/students', async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// app.get('/students', async (req, res) => {
//     try {
//         const uniqueStudentIds = await Student.findAll({
//             attributes: ['id'],
//             group: ['id']
//         });
//         res.json(uniqueStudentIds);
//     } catch (error) {
//         console.error('Error fetching unique student IDs:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

