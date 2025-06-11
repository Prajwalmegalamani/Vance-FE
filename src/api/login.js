import data from "./db.json";

const DELAY = 2000;

export default function loginApi() {
  return {
    async login({ email, password }) {
      /* 
      TODO 1: retrieve data from json user_auth, search for user, and return if exists
      if match, return user response, if not, return error, 
      we will need to mock the api response, to simulate a delay of 2 seconds here,
      return Error message "Login failed" in case user is not found - 
      - DONE
      */

      /* SOLUTION START */

      return new Promise((resolve, reject) => {
        let user = data.user_auth.find(
          (user) => user.email === email && user.password === password
        );



        setTimeout(() => {
          if (!user) {
            reject(new Error("Login failed"));
            return;
          }

          user = { ...user, password: undefined };

          resolve(user);
        }, DELAY);
      });

      /* SOLUTION END */
    },
  };
}
