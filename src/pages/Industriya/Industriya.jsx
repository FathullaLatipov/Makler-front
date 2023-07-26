import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingPost, UserSingle } from "../../components";
import $host from "../../http";

const Industriya = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    $host
      .get(`/store2/api/v1/store/${id}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <section className="content">
      {loading && <LoadingPost />}
      <UserSingle data={data} id={id} />
    </section>
  );
};

export default Industriya;
