import axios from 'axios';
import { BASE_URL } from './config.js';
import { seedSitesList } from './controllers/processController.js'
import { MOCK_USER_LIST } from './mocks/users.js'


const getCurrentUserList = async () => {
  try {
    const userList = await axios.get(`${BASE_URL}/user`);
    return userList.data;
  } catch (e) {
    console.log('Error while getting user list', e);
  }
};

const createNewUsers = async () => {
  try {
    await axios.post(`${BASE_URL}/group/create`, {
      id: 'camunda-admin',
      name: 'camunda BPM Administrators',
      type: 'SYSTEM',
    });

    MOCK_USER_LIST.forEach(async (user) => {
      await axios.post(`${BASE_URL}/user/create`, {
        profile: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName || null,
          email: user.email || null,
        },
        credentials: {
          password: user.password,
        },
      });
    });

    setTimeout(async () => {
      await axios.put(`${BASE_URL}/group/camunda-admin/members/admin`);

      for (let i = 0; i <= 17; i++) {
        await axios.post(`${BASE_URL}/authorization/create`, {
          type: 1,
          permissions: ['ALL'],
          userId: 'admin',
          groupId: null,
          resourceType: i,
          resourceId: '*',
        });
      }
    }, 2000);
  } catch (e) {
    console.log('Error while creating user in Camunda', e);
  }
};

const seed = async () => {
  const camundaUserList = await getCurrentUserList();
  await seedSitesList()
  if (camundaUserList && camundaUserList.length > 0) {
    console.log('Camunda already have users');
    return;
  } else {
    await createNewUsers();
    console.log('New users created.');
  }
};

export default seed;
