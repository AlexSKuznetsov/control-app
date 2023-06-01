import axios from "axios";
import { BASE_URL } from "./config";
import { seedSitesList } from "./controllers/seedController";
import { MOCK_USER_LIST } from "./mocks/users";

const getCurrentUserList = async () => {
  try {
    const userList = await axios.get(`${BASE_URL}/user`);
    return userList.data;
  } catch (e) {
    console.log("Error while getting user list", e);
  }
};

const createNewUsers = async () => {
  try {
    // creating a special SYSTEM group for admin
    await axios.post(`${BASE_URL}/group/create`, {
      id: "camunda-admin",
      name: "camunda BPM Administrators",
      type: "SYSTEM",
    });

    // creating users
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

    // waiting until users and groups created
    setTimeout(async () => {
      // add admin to special group
      await axios.put(`${BASE_URL}/group/camunda-admin/members/admin`);

      // the are 21 resources that might be granted to user, so we give to Admin all on them
      // https://docs.camunda.org/manual/develop/user-guide/process-engine/authorization-service/#resources
      for (let i = 0; i <= 21; i++) {
        await axios.post(`${BASE_URL}/authorization/create`, {
          type: 1,
          permissions: ["ALL"],
          userId: "admin",
          groupId: null,
          resourceType: i,
          resourceId: "*",
        });
      }
    }, 2000);
  } catch (e) {
    console.log("Error while creating user in Camunda", e);
  }
};

const seed = async () => {
  // seeding sites
  await seedSitesList();

  const camundaUserList = await getCurrentUserList();
  if (camundaUserList && camundaUserList.length > 0) {
    console.log("Camunda already have users");
  } else {
    // seeding users
    await createNewUsers();
    console.log("New users created.");
  }
};

export default seed;
