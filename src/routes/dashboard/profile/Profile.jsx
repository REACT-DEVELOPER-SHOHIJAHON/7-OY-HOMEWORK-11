import { FaBriefcase, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useGetProfileQuery } from "../../../redux/api/userApi";
import { Link } from "react-router-dom";
import { Card, Avatar } from "antd";

const { Meta } = Card;

const Profile = () => {
  const { data } = useGetProfileQuery();
  const user = data?.payload;

  return (
    <div className="max-w-4xl mx-auto mt-[100px] p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
      {user && (
        <Card className="w-full p-8 rounded-lg shadow-md bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <Avatar
                  size={128}
                  onError={(e) => (e.target.src = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")}
                  src={user.photo_url || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                  className="ring-4 ring-gray-700 shadow-lg"
                />
              </Link>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-blue-600">{user.first_name}</h2>
                <p className="text-gray-500">Sales Manager</p>
              </div>
            </div>

            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <FaBriefcase className="w-5 h-5 mr-2 text-purple-600" />
                <span>Sales Manager at Dooley, Kozey and Cronin</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-600" />
                <span>Phoenix, Mississippi, United States</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 mr-2 text-red-600" />
                <Link to={`mailto:${user.username}`} className="text-red-600 hover:underline">
                  {user.username}
                </Link>
              </div>
              <div className="flex items-center">
                <FaPhone className="w-5 h-5 mr-2 text-blue-600" />
                <Link to="tel:+998904471907" className="text-blue-600 hover:underline">
                  +998 (90) 447 19 07
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <h3 className="font-semibold mb-2 text-purple-600">Additional Information</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
              <li>Born on May 19, 2007 (17 years old)</li>
              <li>Blood Type: O-</li>
              <li>Height: 180.24 cm</li>
              <li>Weight: 65.16 kg</li>
              <li>Green eyes, Brown curly hair</li>
              <li>University: University of Wisconsin--Madison</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Profile;
