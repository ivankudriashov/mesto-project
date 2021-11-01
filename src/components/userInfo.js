export class UserInfo {
  constructor(userName, userDescriptoin){
    this._name = userName;
    this._description = userDescriptoin;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }

  getUserInfo(apiRequest, callback) {
    apiRequest()
      .then(res => {
        callback(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

