import {
  FacebookOutlined,
  InstagramOutlined,
  LinkOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-3">
        <div className="flex justify-between items-center container mx-auto">
          <h1 className=" p-5 text-green-500">All Right Reserved </h1>

          <div className=" flex gap-3 items-center">
            <a
              href=" https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Findex.php%3Fnext%3Dhttps%253A%252F%252Fwww.facebook.com%252Ffriends%252F%253Fprofile_id%253D61555939672225%2526notif_id%253D1713260229917902%2526notif_t%253Dfriend_confirmed%2526ref%253Dnotif%26deoia%3D1%26no_universal_links%3D1"
              target="blank"
            >
              {" "}
              <FacebookOutlined
                className="text-gray-500  hover:text-blue-600"
                style={{ fontSize: 35 }}
              />{" "}
            </a>
            <a href="https://web.whatsapp.com/ " target="blank">
              {" "}
              <WhatsAppOutlined
                className="text-gray-500 hover:text-green-600"
                style={{ fontSize: 35 }}
              />{" "}
            </a>
            <a
              href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fmynetwork%2F"
              target="blank"
            >
              {" "}
              <LinkOutlined
                className="text-gray-500 hover:text-blue-900"
                style={{ fontSize: 35 }}
              />{" "}
            </a>
            <a href="https://www.instagram.com/" target="blank">
              {" "}
              <InstagramOutlined
                className="text-gray-500 hover:text-red-300"
                style={{ fontSize: 35 }}
              />{" "}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
