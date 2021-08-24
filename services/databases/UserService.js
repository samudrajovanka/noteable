import InvariantError from '@exceptions/InvariantError';
import User from '@models/UserModel';
import bcrypt from 'bcrypt';

class UserService {
  async createUser({ fullname, email, password }) {
    const dateNow = Date.now();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname: fullname.trim(),
      email,
      password: hashedPassword,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const user = await newUser.save();

    return user._id;
  }

  async emailExists(email) {
    const user = await User.findOne({ email });

    if (user) {
      throw new InvariantError('Email already exists', 'EMAIL_EXIST');
    }

    return false;
  }
}

export default UserService;
