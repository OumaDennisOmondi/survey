class Auth {
    constructor() {
      
      
      this.authenticated = false;
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb) {
      localStorage.removeItem('access_token');
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      const auth_token=localStorage.getItem('access_token');
      if(auth_token!== undefined){
          this.authenticated =true;
      }
      else{
          this.authenticated=false;
      }
      return this.authenticated;
    }
  }
  
  export default new Auth();
  