

class UserModel {

  constructor(userData) {
    this.token = userData.jwtAccessToken;
    this.email = userData.user.email;
    // console.log('user details in blueprint: ' + this.token + '...' + this.email);
  }

}

export default UserModel;
