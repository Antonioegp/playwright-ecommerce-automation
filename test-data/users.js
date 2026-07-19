import { faker } from '@faker-js/faker';

export const users = {
  mainUser: {
    username: "demoqa@demo.com",
    password: "demoQA_123456",
    incorrectPassword: "demoQS_78910"
  },
  
  validRandomUser:{
    username: "demoqa"+Date.now()+"@demo.com",
    password: "demoQA_123456",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber:
        faker.number.int({ min: 1, max: 9 }).toString() +
        faker.string.numeric(9),
  }
};

export const occupation = {
  doctor: "Doctor",
  student: "Student",
  engineer: "Engineer",
  scientist: "Scientist"
};


