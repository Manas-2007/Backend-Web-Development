let array = [];
const User = {
    // Add a user to the array
    save: (userData) => {
        array.push(userData);
        return userData;
    },

    // Retrieve all users
    getAll: () => {
        return array;
    },

    // Authentication search logic
    authenticate: (loginData) => {
        return array.find((user) =>
            user.name.toLowerCase() === loginData.name.toLowerCase() && 
            user.contact === loginData.contact && 
            user.bloodGroup.toLowerCase() === loginData.bloodGroup.toLowerCase() && 
            user.city.toLowerCase() === loginData.city.toLowerCase()
        );
    }
};

module.exports = User;