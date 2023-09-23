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
