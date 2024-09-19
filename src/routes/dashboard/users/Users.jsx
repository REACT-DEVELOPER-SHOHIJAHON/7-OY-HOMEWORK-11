import { Divider, Table } from 'antd';
import { useGetUsersQuery} from "../../../redux/api/userApi";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const Users = () => {

  const {data} = useGetUsersQuery();

  console.log(data)
 
  return (
  <>
    <div>
      <Table columns={columns} dataSource={data} size="middle" />
      <h1>SHOHIJAHON </h1>
    </div>
  </>
  )
}

export default Users