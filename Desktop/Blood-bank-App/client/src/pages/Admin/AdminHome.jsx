import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex id quia
            perferendis ullam illum distinctio! Amet consectetur non animi
            blanditiis aut temporibus aliquam voluptates ut sunt sapiente
            consequuntur perferendis, dolorum, nostrum cum autem nulla sit nam
            magni tenetur. Officiis ducimus, libero a quod ut aliquid voluptas
            quibusdam, labore doloribus voluptatibus ab, delectus rem quasi
            veritatis nesciunt ad magni. Illum ipsum accusantium ab ut
            asperiores quis, id veritatis, ipsa voluptatibus soluta impedit fuga
            molestias! Alias ipsum, voluptas nemo recusandae velit, magni
            accusantium voluptates non, excepturi quia libero ad esse nulla
            animi eius odio sit. Vitae, minus alias nobis adipisci facilis, unde
            in hic perspiciatis mollitia exercitationem quibusdam nisi placeat
            molestias! Nemo, molestiae. Aliquid aperiam doloremque neque officia
            consequuntur, vel magnam, autem alias omnis iure dolores delectus
            tenetur inventore temporibus a nostrum enim culpa possimus deleniti?
            Non amet sint perferendis at soluta nobis, dolores doloremque ipsa
            nihil alias repellendus inventore id, ratione laudantium animi optio
            sunt explicabo numquam! Aliquam itaque nobis dolorum fugiat? At
            deserunt enim distinctio non necessitatibus, atque voluptatibus ea
            amet adipisci quia libero iure accusamus numquam architecto minima
            expedita aut maiores excepturi doloribus, magnam molestiae quas
            aspernatur? Tempora, perspiciatis doloribus nostrum sint consectetur
            numquam doloremque eius molestias itaque harum!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
