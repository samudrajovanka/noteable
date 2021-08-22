import User from '@models/UserModel';
import bcrypt from 'bcrypt';

class UserService {
  async createUser({ fullname, email, password }) {
    const dateNow = Date.now();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const user = await newUser.save();

    return user._id;
  }
}

export default UserService;
