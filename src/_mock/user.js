import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  email: sample([
    'agric@gmail.com',
    'music@gmail.com',
    'radiotheraphy@gmail.com',
    'adult@gmail.com',
    'pharmacy@gmail.com',
    'mathematics',
    'economics@gmail.com',
    'elect@gmail.com',
    'biochemistry@gmail.com',
    'history@gmail.com',
  ]),
  department: sample([
    'Agricultural Economics',
    'Music',
    'Radiotheraphy',
    'Adult Education',
    'Pharmacy',
    'Mathematics',
    'Economics',
    'Elect. Eng',
    'Biochemistry',
    'History',
  ]),
  faculty: sample([
    'Agriculture & Forestry',
    'Arts',
    'Medicine',
    'Education',
    'Pharmacy',
    'Science',
    'Social Sciences',
    'Technology',
    'Vertinary Medicine',
    'Arts',
  ]),
}));

export default users;


// import { useState, useEffect } from "react";
// import axios from "axios";

// const ShowAdmin = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/admin/all-admins"
//         );
//         console.log(response);
//         const fetchedUsers = response.data;
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.log("Error fetching admins", error);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   // Restructure user data
//   const userData = users.map((user) => ({
//     name: user.name,
//     email: user.email,
//     department: user.department,
//     faculty: user.faculty,
//     resource: user.resource,
//   }));

//   return userData;
// };

// export default ShowAdmin;
