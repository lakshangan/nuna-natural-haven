// In a custom backend with Supabase, we define how our data looks here
// This helps us keep our code clean and organized (The "Model" in MVC)

export const UserSchema = {
    tableName: 'profiles',
    fields: {
        id: 'uuid',
        full_name: 'text',
        address: 'text',
        phone: 'text'
    }
};

// We can add helper logic here for learning
export const validateUser = (userData) => {
    if (!userData.email) return "Email is required";
    return null;
};
