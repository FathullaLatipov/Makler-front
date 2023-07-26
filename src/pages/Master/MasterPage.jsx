import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingPost, UserSingle } from "../../components";
import $host from "../../http";

const MasterPage = () => {
  const [data, setData] = useState();
  const [loading, setLaoding] = useState(true);
  const { id } = useParams();

  const fetchData = () => {
    $host
        .get(`/master/api/v1/maklers/${id}`)
        .then((data) => setData(data.data))
        .catch((err) => console.log(err))
        .finally(() => setLaoding(false));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="content">
      {loading && <LoadingPost />}
      <UserSingle data={data} id={id} />
    </div>
  );
};

export default MasterPage;
