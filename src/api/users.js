import data from "./db.json";

const DELAY = 3000;

export default function usersApi() {
  return {
    async getUsers({ page, pageSize }) {
      /*
       TODO 2: mock the api for a 3 second delay, data is stored in db.json as users list
       we need to make sure the response of this method is correctly paginated
       

       - DONE
       */

      /* SOLUTION START */
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const res = data.users;
          // const res = [];
          const totalPages = Math.ceil(res.length / pageSize);
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          const filteredUsers = res.slice(start, end);

          if (filteredUsers.length === 0) {
            reject(new Error("Users not found"));
          }

          resolve({
            total_pages: totalPages,
            page: page,
            page_size: pageSize,
            data: filteredUsers,
          });
        }, DELAY);
      });
      /* SOLUTION END */
    },
  };
}
