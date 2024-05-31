import User from "../models/user.model.js";

const adminData = {
    username:'admin',
    password:'admin123'
}

export const adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    // Check if the username and password match the hardcoded admin credentials
    if (username === adminData.username && password === adminData.password) {
        console.log('Admin login successful');
        // res.redirect('/admin/dashboard');

        return res.status(200).json({ success: true, message: "Admin login successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
};



export const getUsers = async(req, res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('Deleting user with ID:', userId);

        // If the user exists, delete it from the database
   const deleted =  await User.findByIdAndDelete(userId);
        console.log("sss",deleted);
        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
        // Handle deletion logic here
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Controller function to handle editing a user
export const editUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from request parameters
        const { username, email } = req.body; // Get updated user data from request body

        // Check if the user exists in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information
        user.username = username;
        user.email = email;

        // Save the updated user object
        await user.save();

        // Respond with a success message and the updated user object
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
