import axios from "axios";
const deleteServer = async (serverId: string) => {
  await axios.put(`/api/servers/${serverId}}`);

  return console.log("Deleted Server");
};
export default deleteServer;
